import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext"; // Adjust the import based on your file structure

const PasswordReset = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from AuthContext
  const params = new URLSearchParams(search);
  const token = params.get("token");
  const national_id = params.get("id");

  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.post(`${baseURL}/auth/reset-password`, {
        national_id,
        token,
        newPassword,
      });
      // Extract and store the access token in local storage
      const accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      login(accessToken); // Update context with the new access token
      toast.success("تم إعادة تعيين كلمة المرور بنجاح");
      setTimeout(() => {
        navigate("/"); // Redirect to home page
      }, 2000);
    } catch (error) {
      toast.error("حدث خطأ أثناء إعادة تعيين كلمة المرور");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <div className="text-center mb-6">
          <img
            src="https://img.freepik.com/premium-vector/ballot-box-ballot-icon_928715-1379.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid"
            alt="Logo"
            className="w-24 h-auto mx-auto"
          />
        </div>
        <h2 className="text-2xl font-bold mb-4 text-center">
          إعادة تعيين كلمة المرور
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              كلمة المرور الجديدة:
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#0e7490] focus:border-[#0e7490] opacity-90 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#0e7490] text-white font-semibold rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0e7490]"
          >
            إعادة تعيين كلمة المرور
          </button>
        </form>
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

export default PasswordReset;
