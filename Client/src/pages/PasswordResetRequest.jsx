import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PasswordResetRequest = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      await axios.post(`${baseURL}/auth/send-password-reset-email`, { email });
      toast.success(
        "رابط إعادة تعيين كلمة المرور تم إرساله إلى بريدك الإلكتروني"
      );
    } catch (error) {
      toast.error("خطأ في إرسال رابط إعادة تعيين كلمة المرور");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <div className="w-full max-w-4xl bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl flex overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden lg:flex items-center justify-center bg-gradient-to-br from-gray-500 to-gray-700">
          <img
            src="https://media.tenor.com/q-zZSTX6jSIAAAAM/mail-download.gif"
            alt="Election Illustration"
            className="w-3/4 h-auto"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 relative p-8 flex items-center justify-center">
          {/* Floating shapes using Jordan flag colors */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-black opacity-10 rounded-full mix-blend-overlay filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 opacity-10 rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-32 h-32 bg-green-500 opacity-10 rounded-full mix-blend-overlay filter blur-xl animate-blob animation-delay-4000"></div>

          <div className="relative w-full">
            <div className="text-center mb-8">
              <img
                src="https://img.freepik.com/premium-vector/ballot-box-ballot-icon_928715-1379.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid"
                alt="Logo"
                className="w-24 h-auto mx-auto rounded-full border-4 border-white shadow-lg transform hover:rotate-6 transition-transform duration-300"
              />
            </div>

            <h2 className="text-3xl font-bold mb-6 text-center text-black">
              نسيت كلمة المرور
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black"
                >
                  البريد الإلكتروني:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 block w-full px-4 py-3 bg-white bg-opacity-50 border border-transparent rounded-lg shadow-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  required
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-lg shadow-md hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105"
              >
                إرسال رابط إعادة تعيين كلمة المرور
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
              className="mt-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetRequest;
