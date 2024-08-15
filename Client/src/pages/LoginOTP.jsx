import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginOTP = () => {
  const [nationalId, setNationalId] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNationalId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${baseURL}/auth/login`, {
        national_id: nationalId,
      });

      // Show success toast
      toast.success(response.data.message || "تم إرسال OTP بنجاح!");

      // Delay the navigation to allow the toast to be visible
      setTimeout(() => {
        navigate(`/check-email?national_id=${nationalId}`);
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

        <h1 className="text-2xl font-bold mb-4 text-center">
          تسجيل الدخول باستخدام الرقم الوطني
        </h1>

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
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0e7490] focus:border-[#0e7490] opacity-90 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#0e7490] text-white font-semibold rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0e7490]"
          >
            إرسال OTP
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

export default LoginOTP;
