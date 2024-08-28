import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomAlert = ({ title, description }) => (
  <div
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
    role="alert"
  >
    <strong className="font-bold">{title}</strong>
    <span className="block sm:inline"> {description}</span>
  </div>
);

const NominationForm = () => {
  const [candidates, setCandidates] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          navigate("/login-with-password");
          return;
        }
        const usersDataResponse = await axios.get(
          "http://localhost:4000/api/get-by-token",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsersData(usersDataResponse);

        const allUsersByDistrictID = await axios.get(
          `http://localhost:4000/api/users-by-district/${usersDataResponse.data.user.district_id}`
        );
        const ctest = [];
        allUsersByDistrictID.data.users.forEach((user) => {
          ctest.push({
            id: user.national_id,
            name: user.full_name,
            email: user.email,
          });
        });
        setCandidates(ctest);
      } catch (error) {
        console.error("Error fetching users by district:", error);
      }
    })();
  }, []);

  const candidateTypes = [
    { value: "Muslim", label: "مسلم" },
    { value: "Christian", label: "مسيحي" },
    { value: "female_quota", label: "كوتا نسائي" },
    { value: "circassian_chechen", label: "شركس أو شيشان" },
  ];

  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [listName, setListName] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleCandidateSelection = (event) => {
    const candidateId = parseInt(event.target.value);
    console.log("candidateId: ", candidateId);

    const candidate = candidates.find((c) => c.id == candidateId);
    console.log("candidate in handle candidate selection: ", candidate);
    if (candidate && !selectedCandidates.some((c) => c.id == candidate.id)) {
      setSelectedCandidates((prev) => [...prev, { ...candidate, type: "" }]);
    }
  };

  const removeCandidateFromSelection = (candidateId) => {
    setSelectedCandidates((prev) => prev.filter((c) => c.id !== candidateId));
  };

  const handleCandidateTypeChange = (candidateId, type) => {
    setSelectedCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, type } : c))
    );
  };

  const validateSelection = () => {
    const counts = {
      Muslim: 0,
      Christian: 0,
      female_quota: 0,
      circassian_chechen: 0,
    };

    selectedCandidates.forEach((candidate) => {
      if (counts[candidate.type] !== undefined) {
        counts[candidate.type]++;
      }
    });

    return (
      counts.Muslim === 7 &&
      counts.Christian === 1 &&
      counts.female_quota === 1 &&
      counts.circassian_chechen === 1 &&
      selectedCandidates.length === 10
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      if (validateSelection() && listName) {
        setShowSuccessDialog(true);

        console.log("اسم القائمة:", listName);
        const createdLocalList = await axios.post(
          "http://localhost:4000/api/local-list/create",
          {
            name: listName,
            district_id: usersData.data.user.district_id,
            createdAt: "2024-08-17 14:42:55.913+03",
            updateAt: "2024-08-17 14:42:55.913+03",
          }
        );
        const localListId = createdLocalList.data.localList.list_id;
        console.log("createLocalList: ", localListId);
        console.log("المرشحون:");
        selectedCandidates.forEach((candidate) => {
          axios.post("http://localhost:4000/api/candidate/create", {
            national_id: candidate.id,
            list_id: localListId,
            religion: candidate.type,
            gender: candidate.type === "female_quota" ? "Female" : "Male",
            createdAt: "2024-08-17 14:42:55.913+03",
            updateAt: "2024-08-17 14:42:55.913+03",
          });
          console.log(
            `- الاسم: ${candidate.name}, ID: ${candidate.id}, البريد الإلكتروني: ${candidate.email}, النوع: ${candidate.type}`
          );
          console.log("work");
          axios.put(
            `http://localhost:4000/api/change-to-candidate/${candidate.id}`
          );
        });
      }
    })();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-12 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-center items-start gap-16 lg:gap-32">
      {/* Form Section */}
      <div className="max-w-md lg:max-w-lg w-full p-8 bg-white rounded-xl shadow-xl transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900">
          نموذج طلب ترشيح للقائمة المحلية
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Fields */}
          <div>
            <label
              htmlFor="listName"
              className="block text-lg font-semibold text-gray-800 mb-2"
            >
              اسم القائمة المحلية
            </label>
            <input
              id="listName"
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="أدخل اسم القائمة أو الحزب"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              اختر المرشحين
            </label>
            <select
              onChange={handleCandidateSelection}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <option value="">اختر مرشحًا</option>
              {candidates.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.name}
                </option>
              ))}
            </select>
          </div>
          {selectedCandidates.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-4">
                المرشحون المختارون:
              </h3>
              <ul className="space-y-4">
                {selectedCandidates.map((candidate) => (
                  <li
                    key={candidate.id}
                    className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-md"
                  >
                    <div className="flex justify-between items-center">
                      {candidate.name}
                      <button
                        type="button"
                        onClick={() =>
                          removeCandidateFromSelection(candidate.id)
                        }
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                      >
                        حذف
                      </button>
                    </div>
                    <select
                      value={candidate.type}
                      onChange={(e) =>
                        handleCandidateTypeChange(candidate.id, e.target.value)
                      }
                      className="mt-3 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      <option value="">اختر نوع المرشح</option>
                      {candidateTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <CustomAlert
            title="تنبيه:"
            description="يجب اختيار 10 مرشحين: 7 مسلمين، 1 مسيحي، 1 كوتا نسائي، و1 شركس أو شيشان."
          />
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!validateSelection() || !listName}
          >
            تقديم طلب الترشيح
          </button>
        </form>

        {showSuccessDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-xl shadow-xl">
              <h2 className="text-2xl font-bold mb-6">تم تقديم الطلب بنجاح</h2>
              <p className="mb-6">
                شكرًا لك على المشاركة في العملية الانتخابية.
              </p>
              <button
                onClick={() => setShowSuccessDialog(false)}
                className="bg-gray-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition duration-300"
              >
                حسنًا
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NominationForm;
