import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toastify

const LoginWithPass = () => {
  const [nationalId, setNationalId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nationalId") setNationalId(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${baseURL}/auth/login-with-password`, {
        national_id: nationalId,
        password,
      });

      // Handle successful login
      const { accessToken } = response.data;
      toast.success("تم تسجيل الدخول بنجاح!");

      // Optionally, save the token to localStorage and navigate to another page
      localStorage.setItem("accessToken", accessToken);

      // Delay navigation to allow the toast to be seen
      setTimeout(() => {
        navigate("/");
      }, 2000); // Adjust the delay as needed
    } catch (error) {
      toast.error(error.response?.data?.message || "فشل تسجيل الدخول");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <div className="text-center mb-6">
          <img
            src="https://img.freepik.com/premium-vector/ballot-box-ballot-icon_928715-1379.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid" // Replace with the path to your logo
            alt="Logo"
            className="w-24 h-auto mx-auto"
          />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">
          تسجيل الدخول باستخدام كلمة المرور
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="national_id"
              className="block text-sm font-medium text-gray-700"
            >
              الرقم الوطني:
            </label>
            <input
              type="text"
              id="national_id"
              name="nationalId"
              value={nationalId}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0e7490] focus:border-[#0e7490] opacity-90 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              كلمة المرور:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0e7490] focus:border-[#0e7490] opacity-90 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#0e7490] text-white font-semibold rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0e7490]"
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
      {/* Add ToastContainer to render toast notifications */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />{" "}
    </div>
  );
};

export default LoginWithPass;
