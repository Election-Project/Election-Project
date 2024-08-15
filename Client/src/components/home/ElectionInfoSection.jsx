import React, { useEffect, useState } from "react";
import axios from "axios";
import Joyride from "react-joyride";

// Define CSS styles for watermark, overlay, and disabling text selection
const watermarkStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontSize: "24px",
  color: "rgba(0, 0, 0, 0.1)",
  zIndex: 1000,
  pointerEvents: "none",
  userSelect: "none",
  opacity: 0.5,
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(255, 255, 255, 0.1)", // Semi-transparent overlay
  zIndex: 1000,
  pointerEvents: "none", // Prevents interaction
  userSelect: "none", // Prevent text selection
};

// Disable text selection globally
const noSelectStyle = {
  userSelect: "none", // Standard syntax
  WebkitUserSelect: "none", // Safari
  MozUserSelect: "none", // Firefox
  msUserSelect: "none", // Internet Explorer/Edge
};

const ElectionInfoSection = ({ className }) => {
  const [districts, setDistricts] = useState([]);
  const [runTour, setRunTour] = useState(false);

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

    const timer = setTimeout(() => {
      setRunTour(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const preventScreenshot = (event) => {
      if (event.key === "PrintScreen") {
        alert("Screenshots are not allowed!");
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", preventScreenshot);

    return () => {
      document.removeEventListener("keydown", preventScreenshot);
    };
  }, []);

  useEffect(() => {
    const preventContextMenu = (event) => event.preventDefault();
    const preventTextSelection = (event) => event.preventDefault();

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("selectstart", preventTextSelection);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("selectstart", preventTextSelection);
    };
  }, []);

  const districtImages = {
    1: "https://img.freepik.com/free-vector/international-day-democracy-concept_23-2148610052.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
    2: "https://img.freepik.com/free-vector/international-day-democracy-concept_23-2148610052.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
    3: "https://img.freepik.com/free-vector/international-day-democracy-concept_23-2148610052.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid",
  };

  const steps = [
    {
      target: ".district-card-1",
      content:
        "This is the section where you can explore various electoral districts.",
    },
    {
      target: ".district-card-2",
      content:
        "Click on the available districts to get more information or select them.",
    },
    // Ensure the target class names match the actual classes in your component
  ];

  return (
    <div
      className={`px-8 lg:px-28 py-10 ${className}`}
      dir="rtl"
      style={noSelectStyle}
    >
      <div style={overlayStyle}></div>
      <div style={watermarkStyle}>Your Watermark Here</div>
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        scrollToFirstStep
        showSkipButton
        showProgress
        locale={{
          back: "Back",
          close: "Close",
          last: "Finish",
          next: "Next",
          skip: "Skip",
        }}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      <section className="mt-8">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-8">
          استكشاف الدوائر الانتخابية الخاصة بك
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {districts.map((district) => (
            <div
              key={district.id}
              className={`relative p-6 border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 district-card-${
                district.id
              } ${
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
                        d="M10 14h2v2h-2v-2zm0-4h2v2h-2v-2zm0-4h2v2h-2V6zm4 4h2v2h-2zm4 4h2v2h-2v-2zm-4-4h2v2h-2v-2z"
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
                        d="M3 7l8 8 8-8"
                      />
                    </svg>
                    مقعد شركاء: {district.municipal_seat ? "نعم" : "لا"}
                  </p>
                </div>
                <a
                  href={`/district/${district.id}`}
                  className={`absolute bottom-6 left-6 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg ${
                    district.isUserDistrict
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                >
                  {district.isUserDistrict ? "عرض التفاصيل" : "مغلق"}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ElectionInfoSection;
