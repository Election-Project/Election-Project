import React, { useEffect, useState } from "react";
import axios from "axios";

const ElectionInfoSection = () => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const yourAuthToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/election-info`,
          {
            headers: {
              Authorization: `Bearer ${yourAuthToken}`,
            },
          }
        );

        setDistricts(response.data);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchDistricts();
  }, []);

  const districtImages = {
    1: "https://img.freepik.com/free-vector/international-day-democracy-concept_23-2148610052.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
    2: "https://img.freepik.com/free-vector/international-day-democracy-concept_23-2148610052.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
    3: "https://img.freepik.com/free-vector/international-day-democracy-concept_23-2148610052.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
  };

  return (
    <div className="px-8 lg:px-28 py-10" dir="rtl">
      <section className="mt-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">
          استكشاف الدوائر الانتخابية الخاصة بك
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {districts.map((district) => (
            <div
              key={district.id}
              className={`relative p-6 border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 ${
                district.isUserDistrict
                  ? "bg-gradient-to-r from-green-300 to-green-500"
                  : "bg-gradient-to-r from-gray-200 to-gray-400 cursor-not-allowed opacity-60"
              }`}
            >
              <img
                src={districtImages[district.id]}
                alt={district.name}
                className="absolute inset-0 object-cover w-full h-full opacity-40"
              />
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  {/* <svg
                    className="w-8 h-8 text-gray-900 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4.8l3.2 1.6M12 4a7 7 0 00-7 7v6a7 7 0 007 7 7 7 0 007-7V11a7 7 0 00-7-7z"
                    />
                  </svg> */}
                  <h3 className="text-3xl font-bold gray-900 leading-tight">
                    {district.name}
                  </h3>
                </div>
                <div className="space-y-3 mb-6">
                  <p className="gray-900 flex items-center text-lg font-medium">
                    <svg
                      className="w-6 h-6 gray-900 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14h2v2h-2v-2zm0-4h2v2h-2v-2zm0-4h2v2h-2V6zm4 4h2v2h-2v-2zm4 4h2v2h-2v-2zm-4-4h2v2h-2v-2z"
                      />
                    </svg>
                    {district.city}
                  </p>
                  <p className="text-gray-900 flex items-center text-lg font-medium">
                    <svg
                      className="w-6 h-6 text-gray-900 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7l1.293-1.293a1 1 0 011.414 0L12 8.586l6.293-6.293a1 1 0 011.414 1.414L13 9l7 7a1 1 0 01-1.414 1.414L12 12.586l-7.293 7.293a1 1 0 01-1.414-1.414L11 10 4.707 3.707A1 1 0 013 7z"
                      />
                    </svg>
                    عدد المقاعد: {district.number_of_seats}
                  </p>
                  <p className="text-gray-900 flex items-center text-lg font-medium">
                    <svg
                      className="w-6 h-6 text-gray-900 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 7l8 8 8-8"
                      />
                    </svg>
                    مقعد نسائي: {district.female_seat ? "نعم" : "لا"}
                  </p>
                  <p className="text-gray-900 flex items-center text-lg font-medium">
                    <svg
                      className="w-6 h-6 text-gray-900 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 12l6 6L18 6"
                      />
                    </svg>
                    مقعد شركسي/شيشاني:{" "}
                    {district.circassian_or_chechen_seat ? "نعم" : "لا"}
                  </p>
                  <p className="text-gray-900 flex items-center text-lg font-medium">
                    <svg
                      className="w-6 h-6 text-gray-900 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7l8 8 8-8"
                      />
                    </svg>
                    مقعد مسيحي: {district.christian_seat ? "نعم" : "لا"}
                  </p>
                </div>

                <div className="mt-6">
                  {district.isUserDistrict ? (
                    <button className="px-6 py-3 bg-blue-600 text-gray-900 text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors">
                      اختر الدائرة
                    </button>
                  ) : (
                    <button
                      className="px-6 py-3 bg-gray-600 text-gray-900 text-lg font-semibold rounded-lg shadow-lg"
                      disabled
                    >
                      غير متاح
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ElectionInfoSection;
