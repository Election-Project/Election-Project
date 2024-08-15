// src/components/ChatWidget.jsx

import { useState } from "react";
import axios from "axios";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/chat", {
        message,
      });
      setResponses([...responses, { message, response: res.data.response }]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <div
        className={`fixed bottom-4 right-4 z-50 cursor-pointer ${
          isOpen ? "hidden" : "block"
        }`}
        onClick={toggleChat}
      >
        <button className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600">
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
        className={`fixed bottom-4 right-4 z-50 w-80 bg-white shadow-lg rounded-lg transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } duration-300`}
      >
        <div className="p-4">
          <button
            onClick={toggleChat}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
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
          <h2 className="text-lg font-semibold mb-4">Chatbot</h2>
          <div className="h-72 overflow-y-auto mb-4 p-2 border border-gray-300 rounded">
            {responses.map((chat, index) => (
              <div key={index} className="mb-2">
                <div className="font-semibold text-blue-600">User:</div>
                <div className="bg-blue-100 p-2 rounded">{chat.message}</div>
                <div className="font-semibold text-gray-800 mt-2">Bot:</div>
                <div className="bg-gray-100 p-2 rounded">{chat.response}</div>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <button
            onClick={sendMessage}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
