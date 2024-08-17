import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const BillAds = () => {
  const [candidateName, setCandidateName] = useState("الاسم الكامل");
  const [electionSlogan, setElectionSlogan] = useState("الشعار الانتخابي");
  const [candidateDescription, setCandidateDescription] = useState("الوصف");
  const [candidatePhoto, setCandidatePhoto] = useState("");
  const [fontColor, setFontColor] = useState("#000000");
  const [cardColor, setCardColor] = useState("#FFFFFF");
  const [borderColor, setBorderColor] = useState("#FF0000");
  const [borderType, setBorderType] = useState("solid");
  const [cardShape, setCardShape] = useState("circle");
  const [advertisementId, setAdvertisementId] = useState(null);
  const [showPayPal, setShowPayPal] = useState(false);
  const totalAmount = 100;

  useEffect(() => {
    if (advertisementId) {
      setShowPayPal(true);
    }
  }, [advertisementId]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/advertisements",
        {
          name: candidateName,
          election_slogan: electionSlogan,
          design_type: cardShape,
          description: candidateDescription,
          personal_image: candidatePhoto,
          color_font: fontColor,
          color_card: cardColor,
          color_border: borderColor,
          border_type: borderType,
          status: "inactive",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      const adId = response.data.ad_id;
      setAdvertisementId(adId);
      console.log("Advertisement created:", response.data);
    } catch (error) {
      console.error("Error creating advertisement:", error);
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      await axios.put(
        `http://localhost:4000/api/advertisements/${advertisementId}`,
        {
          total_amount: totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("Advertisement updated with payment details.");
    } catch (error) {
      console.error(
        "Error updating advertisement with payment details:",
        error
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <h1 className="text-4xl font-extrabold mb-12 text-indigo-600">
        مخصص اللوحة الإعلانية
      </h1>

      <div className="w-full max-w-[80rem] flex flex-row gap-8">
        <div className="w-full max-w-md h-[35rem] bg-white p-8 shadow-2xl rounded-xl overflow-y-auto">
          <h2 className="text-3xl font-semibold mb-6 text-gray-700">
            تخصيص اللوحة الإعلانية الخاصة بك
          </h2>

          {/* Form Fields */}
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-600">
              اسم المرشح
            </label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-600">
              شعار الانتخابات
            </label>
            <input
              type="text"
              value={electionSlogan}
              onChange={(e) => setElectionSlogan(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-900">
              الوصف
            </label>
            <textarea
              value={candidateDescription}
              onChange={(e) => setCandidateDescription(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-600">
              الصورة
            </label>
            <input
              type="text"
              placeholder="رابط الصورة"
              value={candidatePhoto}
              onChange={(e) => setCandidatePhoto(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-600">
              لون الخط
            </label>
            <input
              type="color"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
              className="w-full p-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-600">
              لون البطاقة
            </label>
            <input
              type="color"
              value={cardColor}
              onChange={(e) => setCardColor(e.target.value)}
              className="w-full p-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-600">
              لون الإطار
            </label>
            <input
              type="color"
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
              className="w-full p-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-600">
              نوع الإطار
            </label>
            <select
              value={borderType}
              onChange={(e) => setBorderType(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="none">بدون</option>
              <option value="solid">خط متصل</option>
              <option value="dashed">خط متقطع</option>
              <option value="dotted">نقاط</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-600">
              شكل البطاقة
            </label>
            <select
              value={cardShape}
              onChange={(e) => setCardShape(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="square">مربع</option>
              <option value="circle">دائرة</option>
            </select>
          </div>

          {!showPayPal && (
            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              إرسال الإعلان
            </button>
          )}
        </div>

        {/* Preview Section */}
        <div className="w-full bg-gray-50 p-10 shadow-lg rounded-lg flex items-center justify-center hover:shadow-2xl">
          <div
            className={`p-8 text-center w-full ${
              cardShape === "circle" ? "rounded-full" : "rounded-lg"
            } border-4`}
            style={{
              backgroundColor: cardColor,
              color: fontColor,
              borderColor: borderColor,
              borderWidth: borderType !== "none" ? "3px" : "0",
              borderStyle: borderType,
            }}
          >
            {candidatePhoto && (
              <img
                src={candidatePhoto}
                alt="المرشح"
                className={`w-full h-60 object-cover mb-5 mx-auto ${
                  cardShape === "circle" ? "rounded-full" : "rounded-lg"
                } shadow-md`}
              />
            )}
            <h3 className="text-2xl font-bold mb-2">{candidateName}</h3>
            <p className="text-lg font-semibold mb-4">{electionSlogan}</p>
            <p className="text-base">{candidateDescription}</p>
          </div>
        </div>
      </div>

      {showPayPal && (
        <div className="w-full max-w-4xl mt-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold mb-6 text-center text-indigo-700">
            ادفع الإعلان
          </h2>
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <p className="text-lg font-medium text-gray-600">
                يرجى إكمال الدفع لإتمام عملية تقديم الإعلان.
              </p>
              <p className="text-lg font-semibold text-gray-800 mt-2">
                المبلغ الإجمالي:{" "}
                <span className="text-indigo-600">
                  {totalAmount.toFixed(2)} USD
                </span>
              </p>
            </div>
            <div className="w-full max-w-lg">
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AZZnJo9B4ulFid8Kdc6--QozivoXGg7263KyHe5KFomW-t-qQQ4cWR7l2lFScv10s0N_iq-DQpewLwDJ",
                }}
              >
                <PayPalButtons
                  style={{
                    layout: "horizontal",
                    color: "blue",
                    shape: "rect",
                    label: "pay",
                  }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: totalAmount.toFixed(2),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      console.log(
                        "Transaction completed by " +
                          details.payer.name.given_name
                      );
                      handlePaymentSuccess(details);
                    });
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillAds;
