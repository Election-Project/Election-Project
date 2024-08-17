import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const AdvertisementsList = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/advertisements"
        );
        setAdvertisements(response.data);
      } catch (error) {
        console.error("خطأ في جلب الإعلانات:", error);
      }
    };

    fetchAdvertisements();
  }, []);

  // Function to determine the card style based on design_type
  const getCardStyle = (design_type) => {
    return design_type === "circle" ? "rounded-full" : "rounded-lg";
  };

  return (
    <div className="p-4 mb-10" style={{ direction: "rtl" }}>
      {isAuthenticated ? (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">الإعلانات</h2>
          {advertisements.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {advertisements.map((ad) => (
                <div
                  key={ad.ad_id}
                  className={`p-4 shadow-lg flex flex-col items-center ${getCardStyle(
                    ad.design_type
                  )}`}
                  style={{
                    backgroundColor: ad.color_card,
                    border: `2px ${ad.border_type} ${ad.color_border}`,
                    color: ad.color_font,
                    textAlign: "center",
                    borderRadius: ad.design_type === "circle" ? "50%" : "8px",
                  }}
                >
                  {ad.personal_image && (
                    <img
                      src={ad.personal_image}
                      alt="إعلان"
                      className={`w-full ${
                        ad.design_type === "circle"
                          ? "h-40 rounded-full"
                          : "h-40 object-cover rounded-lg"
                      } mb-4`}
                    />
                  )}
                  <h3 className="text-lg font-semibold mb-2">{ad.name}</h3>
                  <p className="text-gray-600 text-sm mb-1">
                    الشعار الانتخابي: {ad.election_slogan}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    الوصف: {ad.description}
                  </p>
                  <p className="text-gray-600 text-sm">
                    مبلغ الدفع: {ad.total_amount}
                  </p>
                  <Link
                    to={`/advertisementsView/${ad.ad_id}`}
                    className="text-blue-500 underline mt-2"
                  >
                    عرض التفاصيل
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">لا توجد إعلانات متاحة.</p>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          يرجى تسجيل الدخول لعرض الإعلانات.
        </p>
      )}
    </div>
  );
};

export default AdvertisementsList;
