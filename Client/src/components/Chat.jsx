import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserName, setCurrentUserName] = useState("");
  const socketRef = useRef(null);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found");
        return;
      }

      // Extract national_id from token
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setCurrentUserId(decodedToken.national_id);

      try {
        const response = await axios.get(
          "http://localhost:4000/api/get-by-token",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCurrentUserName(response.data.user.full_name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

      // Initialize socket connection
      socketRef.current = io("http://localhost:4000", { query: { token } });
      socketRef.current.on("chatMessage", (message) => {
        setMessages((prevMessages) => {
          // Check if the message already exists in the state to prevent duplicates
          if (!prevMessages.some((msg) => msg._id === message._id)) {
            return [...prevMessages, message];
          }
          return prevMessages;
        });
      });
    };

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://localhost:4000/chat/messages",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const initialize = async () => {
      await initializeUser();
      fetchMessages();
    };

    initialize();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const sendMessage = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token || !currentUserId) {
      console.error("User is not authenticated");
      return;
    }

    const messageData = {
      user_id: currentUserId, // Use the national_id as user_id
      message: newMessage,
    };

    try {
      if (socketRef.current) {
        socketRef.current.emit("chatMessage", messageData);
        setNewMessage(""); // Clear input field after sending
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="flex justify-center mt-5">
        <h1 className="text-5xl">تواصل برسائل مباشرة مع المسؤول</h1>
      </div>
      <div className="flex justify-around mt-20 mb-20 h-screen p-4 rtl">
        {/* Chat Container */}
        <div className="flex-1 max-w-md bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-col h-[calc(100vh-8rem)] overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <div
                key={msg._id || index} // Use a unique identifier like _id if available
                className={`flex mb-2 ${
                  msg.user_id === currentUserId
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start ${
                    msg.user_id === currentUserId ? "mr-2" : "ml-2"
                  }`}
                >
                  <div
                    className={`max-w-xs p-2 rounded-md ${
                      msg.user_id === currentUserId
                        ? "bg-blue-200 text-black"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    <div className="flex items-center mb-1 rtl">
                      <div className="text-sm font-semibold">
                        {msg.user_id === currentUserId
                          ? `${currentUserName} (أنت)`
                          : msg.user_name}
                      </div>
                      <div className="mr-2 text-xs text-gray-500">
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                    {msg.message}
                  </div>
                </div>
              </div>
            ))}
            <div ref={endOfMessagesRef} />
          </div>
          <div className="flex items-center mt-4 rtl">
            <input
              type="text"
              className="flex-grow border border-gray-300 rounded-r-lg p-2"
              placeholder="اكتب رسالة..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded-l-lg hover:bg-blue-600"
              onClick={sendMessage}
            >
              إرسال
            </button>
          </div>
        </div>

        {/* Image Container */}
        <div className="w-1/2 flex h- items-center justify-center p-4">
          <img
            src="https://img.freepik.com/premium-vector/online-chat-messages-text-notification-mobile-phone_441769-22.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid"
            alt="Description"
            className="w-[35rem] h-[39rem] rounded-lg shadow-md"
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
