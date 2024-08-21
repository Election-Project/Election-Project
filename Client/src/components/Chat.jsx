import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const token = localStorage.getItem("accessToken");
const socket = io("http://localhost:4000", { query: { token } });

const Chat = ({ isAdmin }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
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

    // Decode token to get user ID
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    setUserId(decodedToken.national_id);

    fetchMessages();

    socket.on("chatMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, []);

  const sendMessage = async () => {
    const messageData = {
      user_id: userId,
      message: newMessage,
      is_admin: isAdmin,
    };

    try {
      socket.emit("chatMessage", messageData);

      // Optionally, you might want to post the message to the server to persist it
      /*
      await axios.post("http://localhost:4000/chat/messages", messageData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      */

      setNewMessage(""); // Clear input field after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <div className="flex-grow overflow-y-auto mb-4 bg-white p-4 rounded-lg shadow-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start mb-2 ${
              msg.is_admin || msg.user_id === userId
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-2 rounded-md ${
                msg.is_admin
                  ? "bg-green-500 text-white"
                  : msg.user_id === userId
                  ? "bg-blue-200 text-black"
                  : "bg-gray-200 text-black"
              }`}
            >
              <div className="flex items-center mb-1">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">
                  {msg.is_admin ? "A" : "U"}
                </div>
                <div className="ml-2 text-sm font-semibold">
                  {msg.is_admin ? "Admin" : `User (${msg.user_id})`}
                </div>
                <div className="ml-2 text-xs text-gray-500">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </div>
              </div>
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>
      <div className="flex items-center mt-4">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-r-lg p-2"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-l-lg hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
