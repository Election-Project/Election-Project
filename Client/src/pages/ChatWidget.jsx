import { useState } from "react";
import axios from "axios";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        setResponses((prev) =>
          prev.map((chat, index) =>
            index === prev.length - 1
              ? { ...chat, response: res.data.response }
              : chat
          )
        );
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        className={`fixed bottom-10 right-12 z-50 cursor-pointer ${
          isOpen ? "hidden" : "block"
        }`}
        onClick={toggleChat}
      >
        <button className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-xl hover:from-indigo-500 hover:to-blue-500 transition duration-300">
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

      <div
        className={`fixed bottom-4 right-0 z-50 w-80 bg-white shadow-xl rounded-lg transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } duration-300`}
      >
        <div className="relative p-4">
          <button
            onClick={toggleChat}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition duration-300"
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
          <h2 className="text-lg font-semibold mb-4 text-indigo-600">
            Chatbot
          </h2>
          <div className="h-72 overflow-y-auto mb-4 p-2 border border-gray-200 rounded bg-gray-50">
            {responses.map((chat, index) => (
              <div key={index} className="mb-4">
                <div className="font-semibold text-blue-600">User:</div>
                <div className="bg-blue-100 p-2 rounded shadow-sm">
                  {chat.message}
                </div>
                <div className="font-semibold text-gray-800 mt-2">Bot:</div>
                <div className="bg-gray-100 p-2 rounded shadow-sm">
                  {chat.response ? (
                    chat.response
                  ) : (
                    <div className="animate-pulse flex space-x-2">
                      <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-center items-center mt-2">
                <div className="animate-pulse flex space-x-2">
                  <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            )}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={sendMessage}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-2 rounded shadow hover:from-indigo-500 hover:to-blue-500 transition duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
