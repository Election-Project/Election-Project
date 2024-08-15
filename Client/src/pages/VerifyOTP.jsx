import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext"; // Adjust the import based on your file structure

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
  const location = useLocation();
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const { login } = useAuth(); // Get login function from AuthContext

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

      // Show success toast
      toast.success("تم التحقق بنجاح! تم تخزين رمز الوصول.");

      // Delay navigation to allow the toast to be visible
      setTimeout(() => {
        login(accessToken, () => {
          navigate(`/set-new-password`);
        });
      }, 2000); // 2 seconds delay
    } catch (error) {
      // Show error toast
      toast.error(error.response?.data?.message || "حدث خطأ");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        {/* Logo Section */}
        <div className="text-center mb-6">
          <img
            src="https://img.freepik.com/premium-vector/ballot-box-ballot-icon_928715-1379.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid" // Replace with the path to your logo
            alt="Logo"
            className="w-24 h-auto mx-auto"
          />
        </div>

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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0e7490] focus:border-[#0e7490] sm:text-sm"
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
            className="w-full py-2 px-4 bg-[#0e7490] text-white font-semibold rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0e7490]"
          >
            تحقق من OTP
          </button>
        </form>

        {/* Toast Container */}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </div>
    </div>
  );
};

export default VerifyOTP;
