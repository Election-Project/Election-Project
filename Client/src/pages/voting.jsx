import React, { useState } from "react";
import { ArrowRight, UserCircle, CheckCircle } from "lucide-react";
import Popup from "../components/popup";
import { useParams } from "react-router-dom";

const VotingPage = () => {
  const { listtype } = useParams();

  const lists = {
    local: [
      {
        id: 1,
        name: "قائمة المدينة",
        candidates: ["أحمد محمد", "سارة علي", "محمود حسن"],
      },
      {
        id: 2,
        name: "قائمة التنمية",
        candidates: ["فاطمة أحمد", "عمر خالد", "ليلى سعيد"],
      },
      {
        id: 3,
        name: "قائمة المستقبل",
        candidates: ["خالد عبدالله", "نورا حسين", "ياسر محمود"],
      },
    ],
    party: [
      { id: 1, name: "حزب العدالة", logo: "🌟" },
      { id: 2, name: "حزب التقدم", logo: "🌿" },
      { id: 3, name: "حزب الوحدة", logo: "😁" },
    ],
  };

  const selectedLists = lists[listtype];
  const [showPopup, setShowPopup] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [selectedCandidates, setSelectedCandidates] = useState({});

  const handleListClick = list => {
    setSelectedList(prevList =>
      prevList && prevList.id === list.id ? null : list
    );
    // Clear selected candidates for other lists when a new list is selected
    if (list.id !== selectedList?.id) {
      setSelectedCandidates(prev => ({
        [list.id]: prev[list.id] || {},
      }));
    }
  };

  const handleCandidateClick = (e, listId, candidate) => {
    e.stopPropagation();
    if (selectedList && selectedList.id === listId) {
      setSelectedCandidates(prev => ({
        ...prev,
        [listId]: {
          ...prev[listId],
          [candidate]: !prev[listId]?.[candidate],
        },
      }));
    }
  };

  const handleVote = () => {
    if (selectedList) {
      setShowPopup(true);
    }
  };

  const handleConfirmVote = () => {
    const votedCandidates = selectedCandidates[selectedList.id] || {};
    console.log(`Voted for: ${selectedList.name}`);
    console.log(
      "Selected candidates:",
      Object.keys(votedCandidates).filter(c => votedCandidates[c])
    );
    setShowPopup(false);
    setSelectedList(null);
    setSelectedCandidates({});
  };

  return (
    <div
      className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <Popup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        onConfirm={handleConfirmVote}
      />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <ArrowRight className="mx-auto h-12 w-12 text-blue-500" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            {listtype === "local" ? "القوائم المحلية" : "قوائم الأحزاب"}
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            يرجى اختيار القائمة التي ترغب في التصويت لها
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedLists.map(list => {
            const isSelected = selectedList && selectedList.id === list.id;
            const isDisabled = selectedList && selectedList.id !== list.id;

            return (
              <div
                key={list.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
                  isDisabled
                    ? "opacity-50 scale-95"
                    : "hover:shadow-lg transform hover:-translate-y-1"
                }`}
              >
                <div
                  className="p-5 bg-gray-50 border-b cursor-pointer"
                  onClick={() => handleListClick(list)}
                >
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-between">
                    <span className="flex items-center">
                      {listtype === "local" ? (
                        <UserCircle className="ml-2 h-6 w-6 text-blue-500" />
                      ) : (
                        <div className="ml-2 text-2xl">{list.logo}</div>
                      )}
                      {list.name}
                    </span>
                    {isSelected && (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    )}
                  </h3>
                </div>
                <div className="px-5 py-3">
                  {listtype === "local" && (
                    <ul className="text-gray-600 list-none">
                      {list.candidates.map((candidate, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 py-1"
                        >
                          <input
                            type="checkbox"
                            className={`form-checkbox h-5 w-5 transition duration-150 ease-in-out ${
                              isDisabled
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-blue-600"
                            }`}
                            checked={
                              selectedCandidates[list.id]?.[candidate] || false
                            }
                            onChange={e =>
                              handleCandidateClick(e, list.id, candidate)
                            }
                            disabled={isDisabled}
                          />
                          <span className={isDisabled ? "text-gray-400" : ""}>
                            {candidate}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <button
            className={`px-6 py-3 text-white rounded-md transition-all duration-300 ${
              selectedList
                ? "bg-blue-500 hover:bg-blue-600 transform hover:-translate-y-1"
                : "bg-gray-400 cursor-not-allowed"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            onClick={handleVote}
            disabled={!selectedList}
          >
            التصويت للقائمة المختارة
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotingPage;
