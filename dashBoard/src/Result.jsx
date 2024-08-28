import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { motion } from "framer-motion";

function Result() {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [localListResults, setLocalListResults] = useState([]);
  const [partyLists, setPartyLists] = useState([]);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [loadingParty, setLoadingParty] = useState(true);
  const [errorLocal, setErrorLocal] = useState(null);
  const [errorParty, setErrorParty] = useState(null);

  // Fetch districts for the district selector
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/districts`);
        setDistricts(response.data);
      } catch (error) {
        console.error("Failed to fetch districts:", error);
      }
    };

    fetchDistricts();
  }, []);

  // Fetch local list results
  useEffect(() => {
    const fetchLocalListResults = async () => {
      if (!selectedDistrict) {
        setLocalListResults([]);
        return;
      }

      setLoadingLocal(true);
      setErrorLocal(null);

      try {
        const { data: districtData } = await axios.get(
          "http://localhost:4000/api/districts",
          { params: { name: selectedDistrict } }
        );
        const districtId = districtData[0]?.district_id;

        if (districtId) {
          const { data: resultsData } = await axios.get(
            `http://localhost:4000/api/candidates/details/${districtId}`
          );
          setLocalListResults(resultsData.electedCandidates || []);
        } else {
          setLocalListResults([]);
        }
      } catch (error) {
        setErrorLocal("فشل في جلب نتائج القوائم المحلية. حاول مرة أخرى.");
        console.error("Failed to fetch local list results:", error);
      } finally {
        setLoadingLocal(false);
      }
    };

    fetchLocalListResults();
  }, [selectedDistrict]);

  // Fetch party list results
  useEffect(() => {
    const fetchPartyLists = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/election/district/1/results"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPartyLists(data);
      } catch (error) {
        setErrorParty(error);
      } finally {
        setLoadingParty(false);
      }
    };

    fetchPartyLists();
  }, []);

  // Export local list results to Excel
  const handleExport = () => {
    const dataToExport = localListResults.map((candidate) => ({
      User: candidate.User?.full_name || "اسم غير متوفر",
      Votes: candidate.votes || "غير متوفر",
      Religion: candidate.religion || "غير متوفر",
      Gender: candidate.gender || "غير متوفر",
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport, {
      header: ["User", "Votes", "Religion", "Gender"],
    });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Local List Results");
    XLSX.writeFile(wb, "local_list_results.xlsx");
  };

  return (
    <div className="p-6">
      {/* District Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <label
          htmlFor="district-select"
          className="block text-xl font-medium text-red-800 mb-2"
        >
          اختر الدائرة:
        </label>
        <select
          id="district-select"
          value={selectedDistrict || ""}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="w-full py-3 px-4 border-2 border-red-700 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg transition-all duration-300 ease-in-out"
        >
          <option value="">جميع الدوائر</option>
          {districts.map((district) => (
            <option key={district.district_id} value={district.name}>
              {district.name}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Local Lists Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-md rounded-lg p-6 mb-8 border border-gray-200"
      >
        {loadingLocal ? (
          <div>جاري جلب النتائج...</div>
        ) : errorLocal ? (
          <div>
            {errorLocal}{" "}
            <button
              onClick={() => window.location.reload()}
              className="text-blue-500 underline"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : !localListResults.length ? (
          <div>لا توجد نتائج للدائرة المحددة.</div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              نتائج القوائم المحلية
            </h2>
            <button
              onClick={handleExport}
              className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              تصدير إلى Excel
            </button>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">اسم المرشح</th>
                  <th className="border px-4 py-2">الأصوات</th>
                  <th className="border px-4 py-2">الدين</th>
                  <th className="border px-4 py-2">الجنس</th>
                </tr>
              </thead>
              <tbody>
                {localListResults.map((candidate) => (
                  <tr key={candidate.national_id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">
                      {candidate.User?.full_name || "اسم غير متوفر"}
                    </td>
                    <td className="border px-4 py-2">
                      {candidate.votes || "غير متوفر"}
                    </td>
                    <td className="border px-4 py-2">
                      {candidate.religion || "غير متوفر"}
                    </td>
                    <td className="border px-4 py-2">
                      {candidate.gender || "غير متوفر"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </motion.div>

      {/* Party Lists Results */}
      <motion.section
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <h2 className="text-3xl font-bold mb-6 text-red-800 col-span-full">
          نتائج القوائم الحزبية
        </h2>
        {loadingParty ? (
          <p>جاري جلب النتائج...</p>
        ) : errorParty ? (
          <p>Error: {errorParty.message}</p>
        ) : (
          partyLists.map((list, index) => (
            <motion.div
              key={list.list_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 hover:shadow-xl transition-shadow duration-300 border-2 border-green-700"
            >
              <div className="px-6 py-4 bg-gradient-to-r from-green-700 to-black">
                <h3 className="text-2xl font-bold text-white">{list.name}</h3>
                <p className="text-white mt-1 text-lg">
                  عدد المقاعد: {list.seatsWon}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </motion.section>
    </div>
  );
}

export default Result;
