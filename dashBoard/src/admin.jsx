import React, { useState } from "react";
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

import axios from "axios";
import { useEffect } from "react";
const DashboardCard = ({ title, value, description }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-blue-500">
    <div className="flex flex-row items-center justify-between pb-2">
      <h3 className="text-lg font-medium text-gray-700">{title}</h3>
    </div>
    <div className="text-3xl font-bold text-blue-600">{value}</div>
    <p className="text-sm text-gray-500 mt-2">{description}</p>
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
            اسم الدائرة
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            الناخبون المسجلون
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            نسبة الإقبال
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {districts.map((district, index) => (
          <tr key={index}>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              {district.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              {district.registeredVoters.toLocaleString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {district.voterTurnout}%
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
const approveAd = async id => {
  try {
    await axios.put(`http://localhost:4000/api/advertisements/${id}/activate`);
  } catch (error) {
    console.error("Error approving ad:", error);
  }
};
const AdsList = ({ ads }) => (
  <div className="space-y-4">
    {ads.map((ad, index) => (
      <div
        key={index}
        className="bg-white shadow-md rounded-lg p-6 border-r-4 border-yellow-500"
      >
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{ad.title}</h3>
        <p className="mb-4 text-gray-600">{ad.description}</p>
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300"
          onClick={() => approveAd(ad.id)}
        >
          موافقة
        </button>
      </div>
    ))}
  </div>
);

const ListsTable = ({ lists, type }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            اسم القائمة
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            النوع
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            الحالة
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            الإجراء
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {lists
          .filter(list => list.type === type)
          .map((list, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                {list.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                {list.type === "local" ? "محلية" : "حزبية"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  {list.status === "Pending" ? "قيد الانتظار" : list.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <button className="text-green-600 hover:text-green-900">
                  موافقة
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);

const Dashboard = () => {
  const [voterCount, setVoterCount] = useState(null);
  const [districtCount, setDistrictCount] = useState(null);
  const [votedLocalPercentage, setVotedLocalPercentage] = useState(null);
  const [ads1, setAds] = useState([]);

  useEffect(() => {
    const getAllAdvertisementsInActive = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/advertisements-inactive"
        );
        console.log(response.data);
        setAds(response.data);
      } catch (error) {
        console.error("Error fetching inactive advertisements:", error);
      }
    };
    const fetchVoterCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/user-count"
        );
        setVoterCount(response.data.count);
      } catch (error) {
        console.error("Error fetching voter count:", error);
      }
    };

    const fetchDistrictCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/districts/count"
        );
        setDistrictCount(response.data.count);
      } catch (error) {
        console.error("Error fetching district count:", error);
      }
    };
    const fetchVoteCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/voted-local-percentage"
        );
        console.log(response.data.percentage);
        setVotedLocalPercentage(response.data.percentage);
      } catch (error) {
        console.error("Error fetching district count:", error);
      }
    };

    fetchVoterCount();
    fetchDistrictCount();
    fetchVoteCount();
    getAllAdvertisementsInActive();
  }, []);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeListTab, setActiveListTab] = useState("local");

  // Mock data (replace with real data in production)
  const overviewData = {
    registeredVoters: voterCount && voterCount,
    districts: districtCount && districtCount,
    localVoterTurnout: votedLocalPercentage && votedLocalPercentage.toFixed(2),
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

  const districts = [
    { name: "الدائرة أ", registeredVoters: 100000, voterTurnout: 75 },
    { name: "الدائرة ب", registeredVoters: 80000, voterTurnout: 70 },
    { name: "الدائرة ج", registeredVoters: 120000, voterTurnout: 80 },
  ];
  // const ads = [
  //   { title: "إعلان 1", description: "وصف الإعلان 1" },
  //   { title: "إعلان 2", description: "وصف الإعلان 2" },
  // ];
  const ads = [];
  ads1.map(ad => {
    ads.push({ id: ad.ad_id, title: ad.name, description: ad.description });
  });

  const lists = [
    { name: "القائمة المحلية 1", type: "local", status: "Pending" },
    { name: "القائمة الحزبية 1", type: "party", status: "Pending" },
    { name: "القائمة المحلية 2", type: "local", status: "Pending" },
  ];

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen" dir="rtl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        لوحة التحكم الانتخابية
      </h1>
      <div className="mb-6">
        <button
          className={`px-6 py-2 mr-2 rounded-full ${
            activeTab === "overview"
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          نظرة عامة
        </button>
        <button
          className={`px-6 py-2 mr-2 rounded-full ${
            activeTab === "districts"
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          }`}
          onClick={() => setActiveTab("districts")}
        >
          الدوائر
        </button>
        <button
          className={`px-6 py-2 mr-2 rounded-full ${
            activeTab === "ads"
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          }`}
          onClick={() => setActiveTab("ads")}
        >
          الإعلانات
        </button>
        <button
          className={`px-6 py-2 rounded-full ${
            activeTab === "lists"
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500"
          }`}
          onClick={() => setActiveTab("lists")}
        >
          القوائم
        </button>
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
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">
            الإعلانات التي تحتاج إلى موافقة
          </h2>
          <AdsList ads={ads} />
        </div>
      )}

      {activeTab === "lists" && (
        <div>
          <div className="mb-6">
            <button
              className={`px-6 py-2 mr-2 rounded-full ${
                activeListTab === "local"
                  ? "bg-green-500 text-white"
                  : "bg-white text-green-500"
              }`}
              onClick={() => setActiveListTab("local")}
            >
              قوائم محلية
            </button>
            <button
              className={`px-6 py-2 rounded-full ${
                activeListTab === "party"
                  ? "bg-green-500 text-white"
                  : "bg-white text-green-500"
              }`}
              onClick={() => setActiveListTab("party")}
            >
              قوائم حزبية
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">
              {activeListTab === "local"
                ? "القوائم المحلية"
                : "القوائم الحزبية"}
            </h2>
            <ListsTable lists={lists} type={activeListTab} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
