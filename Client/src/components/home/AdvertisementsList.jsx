import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  // Slick slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="p-4 mb-10" style={{ direction: "rtl" }}>
      {isAuthenticated ? (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">الإعلانات</h2>
          {advertisements.length > 0 ? (
            <Slider {...settings} className="mySlider">
              {advertisements.map((ad) => (
                <div
                  key={ad.ad_id}
                  className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center"
                  dir="rtl"
                >
                  {ad.image && (
                    <img
                      src={ad.image}
                      alt="إعلان"
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-lg font-semibold mb-2 text-center">
                    {ad.content}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">
                    تاريخ البدء:{" "}
                    {new Date(ad.start_date).toLocaleDateString("ar-SA")}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    تاريخ الانتهاء:{" "}
                    {new Date(ad.end_date).toLocaleDateString("ar-SA")}
                  </p>
                  <p className="text-gray-600 text-sm">
                    مبلغ الدفع: {ad.payment_amount}
                  </p>
                  <Link
                    to={`/advertisementsView/${ad.ad_id}`}
                    className="text-blue-500 underline mt-2"
                  >
                    عرض التفاصيل
                  </Link>
                </div>
              ))}
            </Slider>
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
