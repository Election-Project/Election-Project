import React from "react";
import { ArrowRight, UserCircle, Users } from "lucide-react";

const VotingPage = ({ listType }) => {
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

  const selectedLists = lists[listType];

  return (
    <div
      className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <ArrowRight className="mx-auto h-12 w-12 text-blue-500" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            {listType === "local" ? "القوائم المحلية" : "قوائم الأحزاب"}
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            يرجى اختيار القائمة التي ترغب في التصويت لها
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedLists.map(list => (
            <div
              key={list.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  {listType === "local" ? (
                    <UserCircle className="ml-2 h-6 w-6 text-blue-500" />
                  ) : (
                    <div className="ml-2 text-2xl">{list.logo}</div>
                  )}
                  {list.name}
                </h3>
              </div>
              <div className="px-5 pb-5">
                {listType === "local" && (
                  <ul className="text-gray-600 list-disc list-inside">
                    {list.candidates.map((candidate, index) => (
                      <li key={index}>{candidate}</li>
                    ))}
                  </ul>
                )}
                <button className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  التصويت لهذه القائمة
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VotingPage;
