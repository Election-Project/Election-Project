import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [voterInfo, setVoterInfo] = useState({
    voterName: "",
    district: "",
    electionDate: "",
  });
  console.log(voterInfo.voterName);

  useEffect(() => {
    const fetchVoterInfo = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${baseURL}/api/user/district-info`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        // Extract the first name from the full name
        const fullName = response.data.full_name;
        const firstName = fullName.split(" ")[0]; // Assumes the first part is the first name

        setVoterInfo({
          voterName: firstName,
          district: response.data.name,
          electionDate: "2024-11-05T00:00:00",
        });
      } catch (error) {
        console.error("Error fetching voter info:", error);
      }
    };

    fetchVoterInfo();
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    setResponses([...responses, { message, response: null }]);
    setMessage("");
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:4000/api/chat", {
        message,
      });
      setTimeout(() => {
        setResponses(prev =>
          prev.map((chat, index) =>
            index === prev.length - 1
              ? { ...chat, response: res.data.response }
              : chat
          )
        );
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("خطأ في إرسال الرسالة:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* زر تشغيل وإيقاف الدردشة */}
      <div
        className={`fixed bottom-36 right-12 z-50 cursor-pointer ${
          isOpen ? "hidden" : "block"
        }`}
        onClick={toggleChat}
      >
        <button className="p-4 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-full shadow-lg hover:from-green-700 hover:to-green-500 transition duration-300">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 11.5V5a2 2 0 00-2-2H5a2 2 0 00-2 2v6.5m16 0L21 17M21 11.5L17 17"
            ></path>
          </svg>
        </button>
      </div>

      {/* صندوق الدردشة */}
      <div
        className={`fixed bottom-4 right-0 z-50 w-80 bg-white shadow-2xl rounded-lg transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } duration-300`}
      >
        <div className="relative p-4 bg-gradient-to-r from-green-700 to-green-500 text-white rounded-t-lg">
          {/* زر إغلاق */}
          <button
            onClick={toggleChat}
            className="absolute top-2 right-2 text-white hover:text-gray-300 transition duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <h2 className="text-lg font-semibold">روبوت الدردشة</h2>
        </div>
        <div className="h-72 overflow-y-auto mb-4 p-4 border-t border-gray-200 bg-gray-50">
          {responses.map((chat, index) => (
            <div key={index} className="mb-4">
              <div className="font-semibold text-red-700">
                {voterInfo.voterName ? `${voterInfo.voterName}:` : "Loading..."}
              </div>
              <div className="bg-red-200 p-2 rounded shadow-sm">
                {chat.message}
              </div>
              <div className="font-semibold text-gray-800 mt-2">الروبوت:</div>
              <div className="bg-green-200 p-2 rounded shadow-sm">
                {chat.response ? (
                  chat.response
                ) : (
                  <div className="animate-pulse flex space-x-2">
                    <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                    <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                    <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center items-center mt-2">
              <div className="animate-pulse flex space-x-2">
                <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                <div className="h-2 w-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
          )}
        </div>
        <div className="px-4 pb-4">
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="اكتب رسالتك..."
            className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button
            onClick={sendMessage}
            className="w-full bg-gradient-to-r from-green-700 to-green-500 text-white p-2 rounded shadow-lg hover:from-green-500 hover:to-green-700 transition duration-300"
          >
            إرسال
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
