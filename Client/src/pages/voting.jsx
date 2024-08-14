import React, { useState, useEffect } from "react";
import { ArrowRight, UserCircle, CheckCircle } from "lucide-react";
import Popup from "../components/popup";
import { useParams } from "react-router-dom";
import axios from "axios";

const VotingPage = () => {
  const [users, setUsers] = useState(null);
  const [localLists, setLocalLists] = useState(null);
  const [partyLists, setPartyLists] = useState(null);
  const [isLocalVoted, setIsLocalVoted] = useState(false);
  const [isPartyVoted, setIsPartyVoted] = useState(false);
  const { listtype } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [selectedCandidates, setSelectedCandidates] = useState({});
  const [isBlankVote, setIsBlankVote] = useState(false);

  useEffect(() => {
    (async () => {
      const usersData = await axios.get(
        "http://localhost:4000/api/users/get/744819755628"
      );
      setUsers(usersData.data);

      const localListData = await axios.get(
        "http://localhost:4000/api/local-list/get"
      );
      setLocalLists(
        Object.values(localListData.data)[0].filter(list => {
          return list.district_id === usersData.data.user.district_id;
        })
      );

      // const partyListData = await axios.get(
      //   "http://localhost:4000/api/party-list/get"
      // );
      // setPartyLists(partyListData.data);
      setPartyLists([
        { id: 1, name: "حزب العدالة", logo: "🌟" },
        { id: 2, name: "حزب التقدم", logo: "🌿" },
        { id: 3, name: "حزب الوحدة", logo: "😁" },
      ]);

      setIsLocalVoted(usersData.data.user.is_voted_local);
      setIsPartyVoted(usersData.data.user.is_voted_party);
    })();
  }, []);

  const lists = {
    local:
      localLists &&
      localLists.map((list, index) => ({
        id: index + 1,
        name: list.name,
        candidates: [`test${index}`, `test${index + 1}`, `test${index + 2}`],
      })),
    party:
      partyLists &&
      partyLists.map((party, index) => ({
        id: index + 1,
        name: party.name,
        logo: party.logo,
      })),
  };

  const selectedLists = lists[listtype];

  const handleListClick = list => {
    if (
      (listtype === "local" && isLocalVoted) ||
      (listtype === "party" && isPartyVoted)
    ) {
      return;
    }
    setSelectedList(prevList =>
      prevList && prevList.id === list.id ? null : list
    );
    if (list.id !== selectedList?.id) {
      setSelectedCandidates(prev => ({
        [list.id]: prev[list.id] || {},
      }));
    }
  };

  const handleCandidateClick = (e, listId, candidate) => {
    e.stopPropagation();
    if (
      selectedList &&
      selectedList.id === listId &&
      !(
        (listtype === "local" && isLocalVoted) ||
        (listtype === "party" && isPartyVoted)
      )
    ) {
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
    if (
      selectedList &&
      !(
        (listtype === "local" && isLocalVoted) ||
        (listtype === "party" && isPartyVoted)
      )
    ) {
      setIsBlankVote(false);
      setShowPopup(true);
    } else if (!selectedList) {
      setIsBlankVote(true);
      setShowPopup(true);
    }
  };

  const handleConfirmVote = () => {
    if (isBlankVote) {
      console.log(`Blank vote cast for ${listtype} list`);
    } else {
      const votedCandidates = selectedCandidates[selectedList.id] || {};
      console.log(`Voted for: ${selectedList.name}`);
      console.log(
        "Selected candidates:",
        Object.keys(votedCandidates).filter(c => votedCandidates[c])
      );
    }
    setShowPopup(false);
    setSelectedList(null);
    setSelectedCandidates({});
    if (listtype === "local") {
      setIsLocalVoted(true);
    } else if (listtype === "party") {
      setIsPartyVoted(true);
    }
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
        isBlankVote={isBlankVote}
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
          {((listtype === "local" && isLocalVoted) ||
            (listtype === "party" && isPartyVoted)) && (
            <p className="mt-2 text-lg text-red-600 font-bold">
              لقد قمت بالتصويت بالفعل لهذه القائمة. لا يمكنك التصويت مرة أخرى.
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedLists &&
            selectedLists.map(list => {
              const isSelected = selectedList && selectedList.id === list.id;
              const isDisabled =
                (selectedList && selectedList.id !== list.id) ||
                (listtype === "local" && isLocalVoted) ||
                (listtype === "party" && isPartyVoted);

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
                                selectedCandidates[list.id]?.[candidate] ||
                                false
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
              !(
                (listtype === "local" && isLocalVoted) ||
                (listtype === "party" && isPartyVoted)
              )
                ? "bg-blue-500 hover:bg-blue-600 transform hover:-translate-y-1"
                : "bg-gray-400 cursor-not-allowed"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
            onClick={handleVote}
            disabled={
              (listtype === "local" && isLocalVoted) ||
              (listtype === "party" && isPartyVoted)
            }
          >
            {selectedList ? "التصويت للقائمة المختارة" : "التصويت"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotingPage;
