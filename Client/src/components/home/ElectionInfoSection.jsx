import React, { useEffect, useState } from "react";
import axios from "axios";
import Joyride from "react-joyride";
import { useAuth } from "../../context/AuthContext"; // Import your AuthContext
import { FaMapMarkerAlt, FaChair, FaFemale, FaMale } from "react-icons/fa";

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
  const { isAuthenticated } = useAuth(); // Access the authentication state
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
    1: "./src/assets/img/12.jpg",
    2: "./src/assets/img/12.jpg",
    3: "./src/assets/img/12.jpg",
    4: "./src/assets/img/12.jpg",
    5: "./src/assets/img/12.jpg",
    6: "./src/assets/img/12.jpg",
    7: "./src/assets/img/12.jpg",
    8: "./src/assets/img/12.jpg",
    9: "./src/assets/img/12.jpg",
    10: "./src/assets/img/12.jpg",
    11: "./src/assets/img/12.jpg",
    12: "./src/assets/img/12.jpg",
    13: "./src/assets/img/12.jpg",
    14: "./src/assets/img/12.jpg",
    15: "./src/assets/img/12.jpg",
    16: "./src/assets/img/12.jpg",
    17: "./src/assets/img/12.jpg",
    18: "./src/assets/img/12.jpg",
  };

  const steps = [
    {
      target: ".district-card-1",
      content:
        "هذا هو القسم الذي يمكنك من خلاله استكشاف الدوائر الانتخابية المختلفة.",
    },
    {
      target: ".district-card-6",
      content:
        "اضغط على الدوائر المتاحة للحصول على مزيد من المعلومات أو لاختيارها.",
    },
  ];

  return (
    <>
      {isAuthenticated ? (
        <div
          className={`px-8 lg:px-28 py-10 ${className}`}
          dir="rtl"
          style={noSelectStyle}
        >
          <div style={overlayStyle}></div>
          <div style={watermarkStyle}></div>
          <Joyride
            steps={steps}
            run={runTour}
            continuous
            scrollToFirstStep
            showSkipButton
            showProgress
            locale={{
              back: "رجوع",
              close: "إغلاق",
              last: "إنهاء",
              next: "التالي",
              skip: "تخطي",
            }}
            styles={{
              options: {},
              buttonBack: {
                color: "#00000",
              },
              buttonClose: {
                color: "#00000",
              },
              buttonLast: {
                color: "#00000",
              },
              buttonNext: {
                color: "#00000",
              },
              buttonSkip: {
                color: "#00000",
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
                      ? "bg-gradient-to-r from-white to-white"
                      : "bg-gradient-to-r from-gray-300 to-gray-500 cursor-not-allowed"
                  }`}
                >
                  <img
                    src={districtImages[district.id]}
                    alt={district.name}
                    className={`absolute inset-0 object-cover w-full h-full ${
                      district.isUserDistrict ? "opacity-40" : "opacity-20"
                    }`}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <h3
                        className={`text-3xl font-bold leading-tight ${
                          district.isUserDistrict
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        {district.name}
                      </h3>
                    </div>
                    <div className="space-y-3 mb-6">
                      <p
                        className={`flex items-center text-lg font-medium ${
                          district.isUserDistrict
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        <FaMapMarkerAlt className="w-6 h-6 mr-2" />
                        {district.city}
                      </p>
                      <p
                        className={`flex items-center text-lg font-medium ${
                          district.isUserDistrict
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        <FaChair className="w-6 h-6 mr-2" />
                        عدد المقاعد: {district.number_of_seats}
                      </p>
                      <p
                        className={`flex items-center text-lg font-medium ${
                          district.isUserDistrict
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        <FaFemale className="w-6 h-6 mr-2" />
                        مقعد نسائي: {district.female_seat ? "نعم" : "لا"}
                      </p>
                      <p
                        className={`flex items-center text-lg font-medium ${
                          district.isUserDistrict
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        <FaMale className="w-6 h-6 mr-2" />
                        مقعد شركاء: {district.municipal_seat ? "نعم" : "لا"}
                      </p>
                    </div>
                    <a
                      href=""
                      className={`absolute bottom-6 left-6 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg ${
                        district.isUserDistrict
                          ? "cursor-pointer"
                          : "cursor-not-allowed opacity-60"
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
      ) : (
        <p></p>
      )}
    </>
  );
};

export default ElectionInfoSection;
