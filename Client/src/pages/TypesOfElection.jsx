import React, { useState } from "react";
import { UserCircle, ListChecks, Users } from "lucide-react";

const VoterListSelection = () => {
  const [selectedList, setSelectedList] = useState(null);

  const handleSelection = listType => {
    setSelectedList(listType);
  };

  return (
    <div
      className="min-h-screen bg-gray-100 flex items-center justify-center"
      dir="rtl"
    >
      <div className="max-w-4xl w-full p-6">
        <div className="text-center mb-8">
          <UserCircle className="mx-auto h-12 w-12 text-blue-500" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            مرحبًا بك، أيها الناخب!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            يرجى اختيار نوع القائمة التي ترغب في التصويت لها:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all ${
              selectedList === "local" ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => handleSelection("local")}
          >
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <ListChecks className="ml-2 h-6 w-6 text-blue-500" />
                القائمة المحلية
              </h3>
            </div>
            <div className="px-5 pb-5">
              <p className="text-gray-600">
                صوّت للمرشحين في دائرتك الانتخابية المحلية.
              </p>
            </div>
          </div>

          <div
            className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all ${
              selectedList === "party" ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => handleSelection("party")}
          >
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Users className="ml-2 h-6 w-6 text-green-500" />
                قائمة الأحزاب
              </h3>
            </div>
            <div className="px-5 pb-5">
              <p className="text-gray-600">
                صوّت للأحزاب السياسية على المستوى الوطني.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            disabled={!selectedList}
            className={`px-6 py-2 bg-blue-500 text-white rounded-md transition-colors ${
              selectedList
                ? "hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                : "opacity-50 cursor-not-allowed"
            }`}
          >
            المتابعة إلى التصويت
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoterListSelection;
