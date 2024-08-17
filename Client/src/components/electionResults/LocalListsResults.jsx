import React, { useState, useEffect } from "react";
import axios from "axios";

function useFetchLocalListResults(selectedDistrict) {
  const [localListResults, setLocalListResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocalListResults = async () => {
      if (!selectedDistrict) {
        setLocalListResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Fetch the district ID based on the selected district name
        const { data: districtData } = await axios.get(
          "http://localhost:4000/api/districts",
          { params: { name: selectedDistrict } }
        );
        const districtId = districtData[0]?.district_id;

        if (districtId) {
          // Fetch the local list results based on the district ID
          const { data: resultsData } = await axios.get(
            `http://localhost:4000/api/candidates/details/${districtId}`
          );
          setLocalListResults(resultsData.electedCandidates || []);
        } else {
          setLocalListResults([]);
        }
      } catch (error) {
        setError("فشل في جلب نتائج القوائم المحلية. حاول مرة أخرى.");
        console.error("Failed to fetch local list results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocalListResults();
  }, [selectedDistrict]);

  return { localListResults, loading, error };
}

function LocalListsResults({ selectedDistrict }) {
  const { localListResults, loading, error } =
    useFetchLocalListResults(selectedDistrict);

  if (loading) {
    return <div>جاري جلب النتائج...</div>;
  }

  if (error) {
    return (
      <div>
        {error}{" "}
        <button onClick={() => window.location.reload()}>إعادة المحاولة</button>
      </div>
    );
  }

  if (!localListResults.length) {
    return <div>لا توجد نتائج للدائرة المحددة.</div>;
  }

  return (
    <div
      style={{
        marginBottom: "16px",
        border: "1px solid #ddd",
        padding: "16px",
      }}
    >
      <h2 style={{ marginBottom: "8px" }}>نتائج القوائم المحلية</h2>
      <table
        style={{ width: "100%", borderCollapse: "collapse" }}
        aria-label="Local List Results"
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              اسم المرشح
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              الأصوات
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>الدين</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>الجنس</th>
          </tr>
        </thead>
        <tbody>
          {localListResults.map((candidate) => (
            <tr key={candidate.national_id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {candidate.User?.full_name || "اسم غير متوفر"}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {candidate.votes}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {candidate.religion}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {candidate.gender}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LocalListsResults;
