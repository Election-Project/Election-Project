import React from "react";
import { useLocation, Link } from "react-router-dom";

const CheckEmail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const nationalId = queryParams.get("national_id");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          تحقق من بريدك الإلكتروني
        </h1>
        <p className="text-center text-sm text-gray-600 mb-4">
          لقد أرسلنا رمز التحقق إلى بريدك الإلكتروني. يرجى التحقق من بريدك
          الإلكتروني وإدخال الرمز لمواصلة.
        </p>
        <div className="text-center">
          <Link
            to={`/verify-otp?national_id=${nationalId}`}
            className="text-indigo-600 hover:underline"
          >
            الانتقال إلى التحقق من OTP
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
