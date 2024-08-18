import React, { useState } from "react";
import "../LiveStreem/LiveStreem.css";
import { useNavigate } from "react-router-dom";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const LiveStreem = () => {
  const [roomId, setRoomId] = useState("");
  const [isPaid, setIsPaid] = useState(false); // State for payment status
  const navigate = useNavigate();

  const handleRoomIdGenerate = () => {
    const randomId = Math.random().toString(36).substring(2, 9);
    const timestamp = Date.now().toString().substring(-4);
    setRoomId(randomId + timestamp);
  };

  const handleOneAndOneCall = () => {
    if (!roomId) {
      alert("Please Generate Room Id First");
      return;
    }
    navigate(`room/${roomId}?type=one-on-one`);
  };

  const handleGroupCall = () => {
    if (!roomId) {
      alert("Please Generate Room Id First");
      return;
    }
    navigate(`room/${roomId}?type=group-call`);
  };

  const handlePaymentSuccess = (details) => {
    console.log("Transaction completed by " + details.payer.name.given_name);
    setIsPaid(true); // Set payment status to true
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-green-50 to-gray-100">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          Welcome to Your Video Call Hub
        </h1>
        <p className="text-center text-gray-500 mb-10">
          Easily start a video call with a randomly generated Room ID.
        </p>
        <div className="flex items-center mb-8">
          <input
            type="text"
            className="flex-grow py-3 px-5 border border-gray-300 rounded-r-full focus:outline-none focus:ring-4 focus:ring-green-400 text-gray-700 placeholder-gray-400"
            placeholder="Generated Room ID"
            value={roomId}
            readOnly
          />
          <button
            className={`py-3 px-6 bg-[#007a3d] text-white font-bold rounded-l-full hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-400 transition-colors duration-200 ease-in-out ${
              !isPaid ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleRoomIdGenerate}
            disabled={!isPaid}
          >
            Generate
          </button>
        </div>
        <div className="flex space-x-4 justify-around mb-6">
          <button
            className="py-3 px-10 bg-[#007a3d] text-white font-bold rounded-full hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-400 transition-colors duration-200 ease-in-out"
            onClick={handleOneAndOneCall}
            disabled={!roomId}
          >
            One-on-One Call
          </button>
          <button
            className="py-3 px-10 bg-[#007a3d] text-white font-bold rounded-full hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-400 transition-colors duration-200 ease-in-out"
            onClick={handleGroupCall}
            disabled={!roomId}
          >
            Group Call
          </button>
        </div>
        <PayPalScriptProvider
          options={{
            "client-id":
              "AZZnJo9B4ulFid8Kdc6--QozivoXGg7263KyHe5KFomW-t-qQQ4cWR7l2lFScv10s0N_iq-DQpewLwDJ",
          }}
        >
          <PayPalButtons
            style={{
              layout: "horizontal",
              color: "black",
              shape: "rect",
              label: "pay",
            }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: "30.00",
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                handlePaymentSuccess(details);
              });
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default LiveStreem;
