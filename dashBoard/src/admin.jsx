import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import Chat from "./Chat";
import UserList from "./UserList";
import Result from "./Result";

const CustomAlert = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{message}</h2>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            إلغاء
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={onConfirm}
          >
            نعم، موافق
          </button>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, description }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-gray-500">
    <div className="flex flex-row items-center justify-between pb-2">
      <h3 className="text-lg font-medium text-gray-700">{title}</h3>
    </div>
    <div className="text-3xl font-bold text-gray-600">{value}</div>
    <p className="text-sm text-white- mt-2">{description}</p>
  </div>
);

const ElectionChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#3b82f6" />
    </BarChart>
  </ResponsiveContainer>
);

const VoterTurnoutChart = ({ data }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

const DistrictTable = ({ districts }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            رقم
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            اسم الدائرة
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            عدد المقاعد
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            المدينة
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            المقاعد للإناث
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            مقاعد الشركس
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            المقاعد المسيحية
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            الأصوات الفارغة
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {districts.map((district, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              {index + 1}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              {district.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              {district.registeredVoters.toLocaleString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              {district.city}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              {district.female ? "نعم" : "لا"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              {district.Circassian ? "نعم" : "لا"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              {district.Christian ? "نعم" : "لا"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              {district.blankVotes.toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const AdsList = ({ ads, onAdApproved, refetchAds }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [currentAd, setCurrentAd] = useState(null);

  const handleApproveClick = (ad) => {
    setCurrentAd(ad);
    setAlertOpen(true);
  };

  const handleConfirm = async () => {
    if (currentAd) {
      try {
        await axios.put(
          `http://localhost:4000/api/advertisements/${currentAd.id}/activate`
        );
        onAdApproved(currentAd.id);
        refetchAds(); // Call the function to refetch ads
      } catch (error) {
        console.error("Error approving ad:", error);
      }
    }
    setAlertOpen(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {ads.map((ad, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg p-6 border-t-4 border-gray-500 transition-transform transform hover:scale-105"
        >
          {ad.personal_image && (
            <img
              src={ad.personal_image}
              alt={`${ad.title} Image`}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          <h3 className="text-2xl font-bold mb-2 text-gray-900">
            {ad.title || "No Title"}
          </h3>
          <p className="mb-4 text-gray-700">
            {ad.description || "No Description"}
          </p>
          <div className="space-y-1 mb-4">
            <p className="text-gray-600">
              الشعار الانتخابي: {ad.election_slogan || "No Slogan"}
            </p>
            <p className="text-gray-600">
              نوع التصميم: {ad.design_type || "No Design Type"}
            </p>
            <p className="text-gray-600">
              المبلغ الإجمالي: {ad.total_amount || "No Amount"} JD
            </p>
            <p className="text-gray-600">
              نوع الحدود: {ad.border_type || "No Border Type"}
            </p>
            <p className="text-gray-600">
              تاريخ الإنشاء:{" "}
              {new Date(ad.createdAt).toLocaleDateString() || "Invalid Date"}
            </p>
            <p className="text-gray-600">
              آخر تحديث:{" "}
              {new Date(ad.updatedAt).toLocaleDateString() || "Invalid Date"}
            </p>
          </div>

          <div className="mt-4 border-t border-gray-200 pt-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              تفاصيل المستخدم
            </h4>
            {ad.user ? (
              <>
                <p className="text-gray-700">
                  الاسم الكامل: {ad.user.full_name || "No Name"}
                </p>
                <p className="text-gray-700">
                  البريد الإلكتروني: {ad.user.email || "No Email"}
                </p>
                <p className="text-gray-700">
                  الرقم الوطني: {ad.user.national_id || "No National ID"}
                </p>
              </>
            ) : (
              <p className="text-gray-700">No user details available</p>
            )}
          </div>

          <button
            className={`bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300 mt-4 ${
              ad.status === "active" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => ad.status !== "active" && handleApproveClick(ad)}
            disabled={ad.status === "active"}
          >
            موافقة
          </button>
        </div>
      ))}
      <CustomAlert
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={handleConfirm}
        message="هل أنت متأكد من الموافقة على هذا الإعلان؟"
      />
    </div>
  );
};

const ListsTable = ({ lists, type }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [currentList, setCurrentList] = useState(null);
  const [currentListType, setCurrentListType] = useState(null);
  const [approvedLists, setApprovedLists] = useState(new Set());

  const handleApproveClick = (id, type) => {
    setCurrentList(id);
    setAlertOpen(true);
    setCurrentListType(type);
  };

  const handleConfirm = async () => {
    if (currentList) {
      try {
        await axios.put(
          `http://localhost:4000/api/${currentListType}-list/${currentList}/approve`
        );
        setApprovedLists((prev) => new Set(prev).add(currentList)); // Mark as approved
        setCurrentList(null);
      } catch (error) {
        console.error("Error approving list:", error);
      }
    }
    setAlertOpen(false);
  };

  // Function to determine if a candidate is duplicated
  const isDuplicate = (candidate, candidates) => {
    return (
      candidates.filter((c) => c.full_name === candidate.full_name).length > 1
    );
  };

  return (
    <div className="overflow-x-auto">
      {/* Approved Lists */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-2xl font-semibold mb-4">القوائم الموافق عليها</h3>
        {lists
          .filter((list) => list.type === type && approvedLists.has(list.id))
          .map((list) => (
            <div key={list.id} className="mb-4">
              {/* List Header */}
              <div className="bg-white shadow-md rounded-lg mb-4 border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {list.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    نوع: {list.type === "local" ? "محلية" : "حزبية"}
                  </p>
                  <p className="text-sm text-gray-600">
                    حالة:{" "}
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      موافق عليها
                    </span>
                  </p>
                </div>
              </div>

              {/* Candidates */}
              {list.Candidates && (
                <table className="min-w-full divide-y divide-gray-200 mt-4">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الاسم
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الجنس
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الدين
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الأصوات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {list.Candidates.map((candidate) => (
                      <tr
                        key={candidate.candidate_id}
                        className={
                          isDuplicate(candidate, list.Candidates)
                            ? "bg-yellow-100"
                            : ""
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {candidate.full_name
                            ? candidate.full_name
                            : "معلومات غير متاحة"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {candidate.gender
                            ? candidate.gender === "Male"
                              ? "ذكر"
                              : candidate.gender === "Female"
                              ? "أنثى"
                              : "غير متاح"
                            : "غير متاح"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {candidate.religion
                            ? candidate.religion === "Muslim"
                              ? "مسلم"
                              : candidate.religion === "Christian"
                              ? "مسيحي"
                              : candidate.religion === "female_quota"
                              ? "حصة الإناث"
                              : candidate.religion === "circassian_chechen"
                              ? "شركسي/شيشاني"
                              : "غير متاح"
                            : "غير متاح"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            {candidate.votes} صوت
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
      </div>

      {/* Pending Lists */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-semibold mb-4">القوائم قيد الانتظار</h3>
        {lists
          .filter((list) => list.type === type && !approvedLists.has(list.id))
          .map((list) => (
            <div key={list.id} className="mb-4">
              {/* List Header */}
              <div className="bg-white shadow-md rounded-lg mb-4 border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {list.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    نوع: {list.type === "local" ? "محلية" : "حزبية"}
                  </p>
                  <p className="text-sm text-gray-600">
                    حالة:{" "}
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        list.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {list.status === "Approved"
                        ? "موافق عليها"
                        : "قيد الانتظار"}
                    </span>
                  </p>
                </div>
                <div className="px-6 py-4">
                  <button
                    className={`bg-green-500 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 ${
                      approvedLists.has(list.id)
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                    onClick={() => handleApproveClick(list.id, list.type)}
                    disabled={approvedLists.has(list.id)}
                  >
                    موافقة
                  </button>
                </div>
              </div>

              {/* Candidates */}
              {list.Candidates && (
                <table className="min-w-full divide-y divide-gray-200 mt-4">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الاسم
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الجنس
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الدين
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        الأصوات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {list.Candidates.map((candidate) => (
                      <tr
                        key={candidate.candidate_id}
                        className={
                          isDuplicate(candidate, list.Candidates)
                            ? "bg-yellow-100"
                            : ""
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {candidate.full_name
                            ? candidate.full_name
                            : "معلومات غير متاحة"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {candidate.gender
                            ? candidate.gender === "Male"
                              ? "ذكر"
                              : candidate.gender === "Female"
                              ? "أنثى"
                              : "غير متاح"
                            : "غير متاح"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          {candidate.religion
                            ? candidate.religion === "Muslim"
                              ? "مسلم"
                              : candidate.religion === "Christian"
                              ? "مسيحي"
                              : candidate.religion === "female_quota"
                              ? "حصة الإناث"
                              : candidate.religion === "circassian_chechen"
                              ? "شركسي/شيشاني"
                              : "غير متاح"
                            : "غير متاح"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            {candidate.votes} صوت
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
      </div>

      <CustomAlert
        isOpen={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={handleConfirm}
        message="هل أنت متأكد من الموافقة على هذه القائمة؟"
      />
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeListTab, setActiveListTab] = useState("local");
  const [voterCount, setVoterCount] = useState(null);
  const [districtCount, setDistrictCount] = useState(null);
  const [votedLocalPercentage, setVotedLocalPercentage] = useState(null);
  const [inactiveAds, setInactiveAds] = useState([]);
  const [activeAds, setActiveAds] = useState([]);
  const [lists, setLists] = useState([]);
  const [districts, setDistricts] = useState([]);

  const fetchData = async () => {
    try {
      const [
        voterCountResponse,
        districtCountResponse,
        voteCountResponse,
        adsResponse,
        localListsResponse,
        partyListsResponse,
        districtsResponse,
      ] = await Promise.all([
        axios.get("http://localhost:4000/api/user-count"),
        axios.get("http://localhost:4000/api/districts/count"),
        axios.get("http://localhost:4000/api/voted-local-percentage"),
        axios.get("http://localhost:4000/api/advertisements"),
        axios.get("http://localhost:4000/api/local-list/get-not-approved"),
        axios.get("http://localhost:4000/api/party-list/get-not-approved"),
        axios.get("http://localhost:4000/api/districts/all"),
      ]);

      setVoterCount(voterCountResponse.data.count);
      setDistrictCount(districtCountResponse.data.count);
      setVotedLocalPercentage(voteCountResponse.data.percentage);
      setDistricts(
        districtsResponse.data.map((district) => ({
          name: district.name,
          registeredVoters: district.number_of_seats,
          city: district.city,
          female: district.Female_seat,
          Circassian: district.Circassian_or_Chechen_seat,
          Christian: district.Christian_seat,
          blankVotes: district.blankVotes,
        }))
      );

      setLists([
        ...localListsResponse.data.localLists.map((list) => ({
          id: list.list_id,
          name: list.name,
          type: "local",
          status: "Pending",
          Candidates: list.Candidates.map((candidate) => ({
            candidate_id: candidate.candidate_id,
            full_name: candidate.User.full_name,
            gender: candidate.gender, // Ensure this property exists in your candidate data
            national_id: candidate.national_id,
            religion: candidate.religion, // Ensure this property exists in your candidate data
            votes: candidate.votes, // Ensure this property exists in your candidate data
          })),
        })),
        ...partyListsResponse.data.partyLists.map((list) => ({
          id: list.list_id,
          name: list.name,
          type: "party",
          status: list.is_approved ? "Approved" : "Pending", // Adjusting based on approval status
          Candidates: list.PartyListCandidates.map((candidate) => ({
            candidate_id: candidate.candidate_id,
            full_name: candidate.User.full_name,
            national_id: candidate.national_id,
            rank: candidate.rank,
            // Add any additional properties you need here
          })),
        })),
      ]);

      // Separate ads into active and inactive
      const filteredInactiveAds = adsResponse.data.filter(
        (ad) => ad.status === "inactive"
      );
      const filteredActiveAds = adsResponse.data.filter(
        (ad) => ad.status === "active"
      );

      setInactiveAds(
        filteredInactiveAds.map((ad) => ({
          id: ad.ad_id,
          title: ad.name,
          description: ad.description,
          election_slogan: ad.election_slogan,
          design_type: ad.design_type,
          total_amount: ad.total_amount,
          border_type: ad.border_type,
          color_border: ad.color_border,
          color_card: ad.color_card,
          color_font: ad.color_font,
          createdAt: ad.createdAt,
          updatedAt: ad.updatedAt,
          personal_image: ad.personal_image,
          status: ad.status,
          user: ad.user
            ? {
                email: ad.user.email,
                full_name: ad.user.full_name,
                national_id: ad.user.national_id,
              }
            : null,
        }))
      );

      setActiveAds(
        filteredActiveAds.map((ad) => ({
          id: ad.ad_id,
          title: ad.name,
          description: ad.description,
          election_slogan: ad.election_slogan,
          design_type: ad.design_type,
          total_amount: ad.total_amount,
          border_type: ad.border_type,
          color_border: ad.color_border,
          color_card: ad.color_card,
          color_font: ad.color_font,
          createdAt: ad.createdAt,
          updatedAt: ad.updatedAt,
          personal_image: ad.personal_image,
          status: ad.status,
          user: ad.user
            ? {
                email: ad.user.email,
                full_name: ad.user.full_name,
                national_id: ad.user.national_id,
              }
            : null,
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdApproved = (adId) => {
    setInactiveAds((prevAds) => prevAds.filter((ad) => ad.id !== adId));
    const approvedAd = inactiveAds.find((ad) => ad.id === adId);
    if (approvedAd) {
      setActiveAds((prevAds) => [...prevAds, approvedAd]);
    }
  };

  const overviewData = {
    registeredVoters: voterCount,
    districts: districtCount,
    localVoterTurnout: votedLocalPercentage
      ? votedLocalPercentage.toFixed(2)
      : null,
  };

  const chartData = [
    { name: "الدائرة أ", value: 400 },
    { name: "الدائرة ب", value: 300 },
    { name: "الدائرة ج", value: 500 },
    { name: "الدائرة د", value: 200 },
  ];

  const voterTurnoutData = [
    { name: "صوتوا", value: 75 },
    { name: "لم يصوتوا", value: 25 },
  ];

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen" dir="rtl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        لوحة التحكم الانتخابية
      </h1>
      <div className="mb-6">
        {[
          "overview",
          "user's",
          "districts",
          "ads",
          "lists",
          "results",
          "chat",
        ].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 mr-2 rounded-full ${
              activeTab === tab
                ? "bg-gray-500 text-white"
                : "bg-white text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === "overview" && "نظرة عامة"}
            {tab === "user's" && "المستخدمون"}
            {tab === "districts" && "الدوائر"}
            {tab === "ads" && "الإعلانات"}
            {tab === "lists" && "القوائم"}
            {tab === "results" && "النتائج"}
            {tab === "chat" && "الدردشة"}
          </button>
        ))}
      </div>
      {activeTab === "overview" && (
        <div>
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <DashboardCard
              title="الناخبون المسجلون"
              value={overviewData.registeredVoters}
              description="إجمالي عدد الناخبين المسجلين"
            />
            <DashboardCard
              title="الدوائر الانتخابية"
              value={overviewData.districts}
              description="عدد الدوائر الانتخابية"
            />
            <DashboardCard
              title="نسبة الإقبال المحلية"
              value={`${overviewData.localVoterTurnout}%`}
              description="نسبة الناخبين الذين أدلوا بأصواتهم محليًا"
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                إحصائيات التصويت حسب الدائرة
              </h2>
              <ElectionChart data={chartData} />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                نسبة الإقبال على التصويت
              </h2>
              <VoterTurnoutChart data={voterTurnoutData} />
            </div>
          </div>
        </div>
      )}
      {activeTab === "districts" && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">الدوائر الانتخابية</h2>
          <DistrictTable districts={districts} />
        </div>
      )}
      {activeTab === "ads" && (
        <div
          className="container mx-auto p-6 bg-gray-100 min-h-screen"
          dir="rtl"
        >
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-6">
              الإعلانات التي تحتاج إلى موافقة
            </h2>
            <AdsList ads={inactiveAds} onAdApproved={handleAdApproved} />
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">الإعلانات المعتمدة</h2>
            <AdsList ads={activeAds} />
          </div>
        </div>
      )}
      {activeTab === "lists" && (
        <div>
          <div className="mb-6">
            {["local", "party"].map((listTab) => (
              <button
                key={listTab}
                className={`px-6 py-2 mr-2 rounded-full ${
                  activeListTab === listTab
                    ? "bg-green-500 text-white"
                    : "bg-white text-green-500"
                }`}
                onClick={() => setActiveListTab(listTab)}
              >
                {listTab === "local" ? "قوائم محلية" : "قوائم حزبية"}
              </button>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">
              {activeListTab === "local"
                ? "القوائم المحلية"
                : "القوائم الحزبية"}
            </h2>
            <ListsTable
              lists={lists.filter((list) => list.type === activeListTab)}
              type={activeListTab}
            />
          </div>
        </div>
      )}
      {activeTab === "results" && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <Result />
        </div>
      )}
      {activeTab === "chat" && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <Chat />
        </div>
      )}{" "}
      {activeTab === "user's" && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <UserList />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
