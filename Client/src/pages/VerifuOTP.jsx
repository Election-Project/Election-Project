import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const OTPBox = ({ index, value, onChange, inputRef }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    if (/^\d$/.test(value) || value === "") {
      onChange(index, value);
      if (value && index < 5) {
        // Move focus to the next box on the right after a delay
        setTimeout(() => {
          inputRef.current[index + 1]?.focus();
        }, 0);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" && value === "") {
      // Move focus to the previous box on the left after a delay
      setTimeout(() => {
        if (index > 0) inputRef.current[index - 1]?.focus();
      }, 0);
    }
  };

  return (
    <input
      type="text"
      maxLength="1"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      ref={(el) => (inputRef.current[index] = el)}
      className="w-12 h-12 border border-gray-300 rounded-md text-center text-2xl mx-1"
    />
  );
};

const VerifyOTP = () => {
  const [nationalId, setNationalId] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("national_id");
    if (id) {
      setNationalId(id);
    }
  }, [location.search]);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${baseURL}/auth/verify-otp`, {
        national_id: nationalId,
        otp: otpCode,
      });
      const { accessToken } = response.data;

      // Store the token in localStorage
      localStorage.setItem("accessToken", accessToken);
      navigate(`/set-new-password`);

      setMessage("تم التحقق بنجاح! تم تخزين رمز الوصول.");
    } catch (error) {
      setMessage(error.response?.data?.message || "حدث خطأ");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">تحقق من OTP</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="national_id"
              className="block text-sm font-medium text-gray-700"
            >
              رقم الهوية الوطنية:
            </label>
            <input
              type="text"
              id="national_id"
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-center mt-4">
            {otp.map((value, index) => (
              <OTPBox
                key={index}
                index={index}
                value={value}
                onChange={handleOtpChange}
                inputRef={inputRefs}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            تحقق من OTP
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyOTP;
