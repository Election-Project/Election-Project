import React, { useState } from "react";
import axios from "axios";
import TailwindCard from "../components/advertisment/TailwindCard";
import PayPalButton from "../components/advertisment/PayPalButton";
import AdForm from "../components/advertisment/AdForm";

const BillboardDesignPage = () => {
  const [candidateDetails, setCandidateDetails] = useState({
    name: "",
    slogan: "",
    district: "",
    photoURL: "",
  });

  const [customization, setCustomization] = useState({
    fontColor: "#134B70",
    cardColor: "#EEEEEE",
    borderColor: "#508C9B",
    backgroundImage: "",
  });

  const [isShowPaymentBtn, setIsShowPaymentBtn] = useState(false);
  const [isShowPaypal, setIsShowPaypal] = useState(false);

  const onSubmit = async () => {
    try {
      const designData = {
        national_id: "409757581080", // Replace with actual user input or session data
        content: JSON.stringify({
          candidateDetails,
          customization,
        }),
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        payment_amount: 100, // Calculate based on your business logic
      };

      const response = await axios.post(
        "http://localhost:3000/api/advertisements",
        designData
      );
      console.log("Design saved:", response.data);
      alert("تم حفظ التصميم بنجاح!");
      setIsShowPaymentBtn(true);
    } catch (error) {
      console.error("Error saving design:", error);
      alert("حدث خطأ أثناء حفظ التصميم. يرجى المحاولة مرة أخرى.");
    }
  };

  return (
    <div className=" flex  flex-col md:flex-row bg-gray-100 p-8 space-y-8 md:space-y-0 md:space-x-8">
      <AdForm
        onSubmit={onSubmit}
        setCustomization={setCustomization}
        setCandidateDetails={setCandidateDetails}
        candidateDetails={candidateDetails}
        customization={customization}
        isShowPaymentBtn={isShowPaymentBtn}
        setIsShowPaypal={setIsShowPaypal}
      />

      <div className="flex-1 flex flex-col">
        <div>
          <h2 className="text-2xl flex justify-center  font-bold text-[#134B70] mb-6">
            معاينة لوحتك الانتخابية
          </h2>
          <TailwindCard
            candidateDetails={candidateDetails}
            customization={customization}
          />
        </div>
        {isShowPaypal && (
          <div className="mt-24">
            <PayPalButton amount="10.00" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BillboardDesignPage;

// the org
// import React, { useState } from "react";
// import TailwindCard from "../componenets/TailwindCard";

// const BillboardDesignPage = () => {
//   const [candidateDetails, setCandidateDetails] = useState({
//     name: "",
//     slogan: "",
//     district: "",
//     photoURL: "",
//   });

//   const [customization, setCustomization] = useState({
//     fontColor: "#134B70",
//     cardColor: "#EEEEEE",
//     borderColor: "#508C9B",
//     backgroundImage: "",
//   });

//   const handleCandidateDetailsChange = (e) => {
//     const { name, value } = e.target;
//     setCandidateDetails({ ...candidateDetails, [name]: value });
//   };

//   const handleCustomizationChange = (type, value) => {
//     setCustomization({ ...customization, [type]: value });
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 p-8 space-y-8 md:space-y-0 md:space-x-8">
//       {/* القسم 1: لوحة التخصيص */}
//       <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-[#134B70] mb-6">
//           صمم لوحتك الانتخابية
//         </h2>

//         <div className="space-y-6">
//           {/* تفاصيل المرشح */}
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//               اسم المرشح
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={candidateDetails.name}
//               onChange={handleCandidateDetailsChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-[#134B70] focus:border-[#134B70] sm:text-sm rounded-md"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="slogan" className="block text-sm font-medium text-gray-700 mb-1">
//               الشعار الانتخابي
//             </label>
//             <input
//               type="text"
//               id="slogan"
//               name="slogan"
//               value={candidateDetails.slogan}
//               onChange={handleCandidateDetailsChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-[#134B70] focus:border-[#134B70] sm:text-sm rounded-md"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
//               الدائرة الانتخابية
//             </label>
//             <input
//               type="text"
//               id="district"
//               name="district"
//               value={candidateDetails.district}
//               onChange={handleCandidateDetailsChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-[#134B70] focus:border-[#134B70] sm:text-sm rounded-md"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700 mb-1">
//               رابط الصورة الشخصية
//             </label>
//             <input
//               type="text"
//               id="photoURL"
//               name="photoURL"
//               value={candidateDetails.photoURL}
//               onChange={handleCandidateDetailsChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-[#134B70] focus:border-[#134B70] sm:text-sm rounded-md"
//             />
//           </div>

//           {/* خيارات التخصيص */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 لون الخط
//               </label>
//               <input
//                 type="color"
//                 value={customization.fontColor}
//                 onChange={(e) => handleCustomizationChange("fontColor", e.target.value)}
//                 className="mt-1 w-full h-10 cursor-pointer"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 لون البطاقة
//               </label>
//               <input
//                 type="color"
//                 value={customization.cardColor}
//                 onChange={(e) => handleCustomizationChange("cardColor", e.target.value)}
//                 className="mt-1 w-full h-10 cursor-pointer"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 لون الإطار
//               </label>
//               <input
//                 type="color"
//                 value={customization.borderColor}
//                 onChange={(e) => handleCustomizationChange("borderColor", e.target.value)}
//                 className="mt-1 w-full h-10 cursor-pointer"
//               />
//             </div>
//           </div>

//           {/* اختيار الخلفية */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               اختر الخلفية
//             </label>
//             <div className="grid grid-cols-2 gap-4">
//               <button
//                 onClick={() => handleCustomizationChange("backgroundImage", "/jordan-flag.jpg")}
//                 className="h-24 w-full bg-cover bg-center rounded-lg"
//                 style={{ backgroundImage: "url('/jordan-flag.jpg')" }}
//               />
//               <button
//                 onClick={() => handleCustomizationChange("backgroundImage", "/amman-city.jpg")}
//                 className="h-24 w-full bg-cover bg-center rounded-lg"
//                 style={{ backgroundImage: "url('/amman-city.jpg')" }}
//               />
//               <button
//                 onClick={() => handleCustomizationChange("backgroundImage", "/petra.jpg")}
//                 className="h-24 w-full bg-cover bg-center rounded-lg"
//                 style={{ backgroundImage: "url('/petra.jpg')" }}
//               />
//               <button
//                 onClick={() => handleCustomizationChange("backgroundImage", "/wadi-rum.jpg")}
//                 className="h-24 w-full bg-cover bg-center rounded-lg"
//                 style={{ backgroundImage: "url('/wadi-rum.jpg')" }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* القسم 2: المعاينة */}
//       <div className="flex-1 flex flex-col items-center">
//         <h2 className="text-2xl font-bold text-[#134B70] mb-6">
//           معاينة لوحتك الانتخابية
//         </h2>
//         <TailwindCard
//           candidateDetails={candidateDetails}
//           customization={customization}
//         />
//       </div>

//       <div>

//       </div>
//     </div>
//   );
// };

// export default BillboardDesignPage;

// the unit compo
// import React, { useState } from "react";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { BrowserRouter as Router } from 'react-router-dom';

// const CombinedBillboardDesigner = () => {
//   const [candidateDetails, setCandidateDetails] = useState({
//     name: "",
//     slogan: "",
//     district: "",
//     photoURL: "",
//   });

//   const [customization, setCustomization] = useState({
//     fontColor: "#134B70",
//     cardColor: "#EEEEEE",
//     borderColor: "#508C9B",
//     backgroundImage: "",
//   });

//   const handleCandidateDetailsChange = (e) => {
//     const { name, value } = e.target;
//     setCandidateDetails({ ...candidateDetails, [name]: value });
//   };

//   const handleCustomizationChange = (type, value) => {
//     setCustomization({ ...customization, [type]: value });
//   };

//   const TailwindCard = ({ candidateDetails, customization }) => {
//     const { name, slogan, district, photoURL } = candidateDetails;
//     const { fontColor, cardColor, borderColor, backgroundImage } = customization;

//     return (
//       <div
//         className="flex flex-col items-center justify-center min-h-screen w-full p-8"
//         style={{
//           backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div
//           className="w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden"
//           style={{ borderColor: borderColor, borderWidth: '4px' }}
//         >
//           <h1
//             className="text-4xl font-bold text-center py-6"
//             style={{ color: fontColor, backgroundColor: cardColor }}
//           >
//             اللوحة الانتخابية
//           </h1>
//           <div
//             className="flex flex-col md:flex-row p-8"
//             style={{ backgroundColor: cardColor }}
//           >
//             {photoURL && (
//               <div className="md:w-1/2 mb-6 md:mb-0 md:ml-8">
//                 <img
//                   src={photoURL}
//                   alt={name}
//                   className="w-72 h-auto object-cover rounded-lg shadow-md"
//                 />
//               </div>
//             )}
//             <div className="md:w-1/2">
//               <h2 className="text-3xl font-semibold mb-4" style={{ color: fontColor }}>
//                 {name || "اسم المرشح"}
//               </h2>
//               <p className="text-xl leading-relaxed mb-4" style={{ color: fontColor }}>
//                 {slogan || "الشعار الانتخابي"}
//               </p>
//               <p className="text-lg" style={{ color: fontColor }}>
//                 الدائرة الانتخابية: {district || "غير محدد"}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <Router>
//       <PayPalScriptProvider options={{ "client-id": "AZZnJo9B4ulFid8Kdc6--QozivoXGg7263KyHe5KFomW-t-qQQ4cWR7l2lFScv10s0N_iq-DQpewLwDJ" }}>
//         <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 p-8 space-y-8 md:space-y-0 md:space-x-8">
//           {/* Customization Panel */}
//           <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
//             <h2 className="text-2xl font-bold text-[#134B70] mb-6">
//               صمم لوحتك الانتخابية
//             </h2>

//             <div className="space-y-6">
//               {/* Candidate Details */}
//               <div className="mb-4">
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                   اسم المرشح
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={candidateDetails.name}
//                   onChange={handleCandidateDetailsChange}
//                   className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-[#134B70] focus:border-[#134B70] sm:text-sm rounded-md"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="slogan" className="block text-sm font-medium text-gray-700 mb-1">
//                   الشعار الانتخابي
//                 </label>
//                 <input
//                   type="text"
//                   id="slogan"
//                   name="slogan"
//                   value={candidateDetails.slogan}
//                   onChange={handleCandidateDetailsChange}
//                   className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-[#134B70] focus:border-[#134B70] sm:text-sm rounded-md"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
//                   الدائرة الانتخابية
//                 </label>
//                 <input
//                   type="text"
//                   id="district"
//                   name="district"
//                   value={candidateDetails.district}
//                   onChange={handleCandidateDetailsChange}
//                   className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-[#134B70] focus:border-[#134B70] sm:text-sm rounded-md"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700 mb-1">
//                   رابط الصورة الشخصية
//                 </label>
//                 <input
//                   type="text"
//                   id="photoURL"
//                   name="photoURL"
//                   value={candidateDetails.photoURL}
//                   onChange={handleCandidateDetailsChange}
//                   className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-[#134B70] focus:border-[#134B70] sm:text-sm rounded-md"
//                 />
//               </div>

//               {/* Customization Options */}
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     لون الخط
//                   </label>
//                   <input
//                     type="color"
//                     value={customization.fontColor}
//                     onChange={(e) => handleCustomizationChange("fontColor", e.target.value)}
//                     className="mt-1 w-full h-10 cursor-pointer"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     لون البطاقة
//                   </label>
//                   <input
//                     type="color"
//                     value={customization.cardColor}
//                     onChange={(e) => handleCustomizationChange("cardColor", e.target.value)}
//                     className="mt-1 w-full h-10 cursor-pointer"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     لون الإطار
//                   </label>
//                   <input
//                     type="color"
//                     value={customization.borderColor}
//                     onChange={(e) => handleCustomizationChange("borderColor", e.target.value)}
//                     className="mt-1 w-full h-10 cursor-pointer"
//                   />
//                 </div>
//               </div>

//               {/* Background Selection */}
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   اختر الخلفية
//                 </label>
//                 <div className="grid grid-cols-2 gap-4">
//                   <button
//                     onClick={() => handleCustomizationChange("backgroundImage", "/jordan-flag.jpg")}
//                     className="h-24 w-full bg-cover bg-center rounded-lg"
//                     style={{ backgroundImage: "url('/jordan-flag.jpg')" }}
//                   />
//                   <button
//                     onClick={() => handleCustomizationChange("backgroundImage", "/amman-city.jpg")}
//                     className="h-24 w-full bg-cover bg-center rounded-lg"
//                     style={{ backgroundImage: "url('/amman-city.jpg')" }}
//                   />
//                   <button
//                     onClick={() => handleCustomizationChange("backgroundImage", "/petra.jpg")}
//                     className="h-24 w-full bg-cover bg-center rounded-lg"
//                     style={{ backgroundImage: "url('/petra.jpg')" }}
//                   />
//                   <button
//                     onClick={() => handleCustomizationChange("backgroundImage", "/wadi-rum.jpg")}
//                     className="h-24 w-full bg-cover bg-center rounded-lg"
//                     style={{ backgroundImage: "url('/wadi-rum.jpg')" }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Preview Section */}
//           <div className="flex-1 flex flex-col items-center">
//             <h2 className="text-2xl font-bold text-[#134B70] mb-6">
//               معاينة لوحتك الانتخابية
//             </h2>
//             <TailwindCard
//               candidateDetails={candidateDetails}
//               customization={customization}
//             />
//             <div className="mt-8 w-full max-w-md">
//               <PayPalButtons
//                 createOrder={(data, actions) => {
//                   return actions.order.create({
//                     purchase_units: [
//                       {
//                         amount: {
//                           value: "10.00",
//                         },
//                       },
//                     ],
//                   });
//                 }}
//                 onApprove={(data, actions) => {
//                   return actions.order.capture().then((details) => {
//                     const name = details.payer.name.given_name;
//                     alert(`Transaction completed by ${name}`);
//                   });
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </PayPalScriptProvider>
//     </Router>
//   );
// };

// export default CombinedBillboardDesigner;

// import React, { useState } from "react";
// // import TailwindCard from "../components/advertisment/TailwindCard";
// import TailwindCard from "../componenets/TailwindCard";

// const BillboardDesignPage = () => {
//   const [candidateDetails, setCandidateDetails] = useState({
//     name: "",
//     description: "",
//     photoURL: "",
//   });

//   const [customization, setCustomization] = useState({
//     fontColor: "#134B70",
//     cardColor: "#EEEEEE",
//     borderColor: "#508C9B",
//     backgroundImage: "", // State for background image
//   });

//   const handleCandidateDetailsChange = (e) => {
//     const { name, value } = e.target;
//     setCandidateDetails({ ...candidateDetails, [name]: value });
//   };

//   const handleCustomizationChange = (type, value) => {
//     setCustomization({ ...customization, [type]: value });
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 p-8 space-y-8 md:space-y-0 md:space-x-8">
//       {/* Section 1: Customization Panel */}
//       <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-[#134B70] mb-6">
//           Customize Your Billboard
//         </h2>

//         <div className="space-y-6">
//           {/* Candidate Details */}
//           <div className="mb-4">
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Candidate Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={candidateDetails.name}
//               onChange={handleCandidateDetailsChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-[#134B70] focus:border-[#134B70] sm:text-sm rounded-md"
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="description"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={candidateDetails.description}
//               onChange={handleCandidateDetailsChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-[#134B70] focus:border-[#134B70] sm:text-sm rounded-md"
//               rows="4"
//             ></textarea>
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="photoURL"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Photo URL
//             </label>
//             <input
//               type="text"
//               id="photoURL"
//               name="photoURL"
//               value={candidateDetails.photoURL}
//               onChange={handleCandidateDetailsChange}
//               className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-[#134B70] focus:border-[#134B70] sm:text-sm rounded-md"
//             />
//           </div>

//           {/* Customization Options */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Font Color
//               </label>
//               <input
//                 type="color"
//                 value={customization.fontColor}
//                 onChange={(e) =>
//                   handleCustomizationChange("fontColor", e.target.value)
//                 }
//                 className="mt-1 w-full h-10 cursor-pointer"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Card Color
//               </label>
//               <input
//                 type="color"
//                 value={customization.cardColor}
//                 onChange={(e) =>
//                   handleCustomizationChange("cardColor", e.target.value)
//                 }
//                 className="mt-1 w-full h-10 cursor-pointer"
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Border Color
//               </label>
//               <input
//                 type="color"
//                 value={customization.borderColor}
//                 onChange={(e) =>
//                   handleCustomizationChange("borderColor", e.target.value)
//                 }
//                 className="mt-1 w-full h-10 cursor-pointer"
//               />
//             </div>
//           </div>

//           {/* Background Selection */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Background
//             </label>
//             <div className="grid grid-cols-2 gap-4">
//               <button
//                 onClick={() =>
//                   handleCustomizationChange("backgroundImage", "/bg1.jpg")
//                 }
//                 className="h-24 w-full bg-cover bg-center rounded-lg"
//                 style={{
//                   backgroundImage:
//                     "url('https://i.pinimg.com/236x/59/4a/be/594abe6b07489555b970057bf0f0b69b.jpg')",
//                 }}
//               />
//               <button
//                 onClick={() =>
//                   handleCustomizationChange("backgroundImage", "/bg2.jpg")
//                 }
//                 className="h-24 w-full bg-cover bg-center rounded-lg"
//                 style={{ backgroundImage: "url('/bg2.jpg')" }}
//               />
//               <button
//                 onClick={() =>
//                   handleCustomizationChange("backgroundImage", "/bg3.jpg")
//                 }
//                 className="h-24 w-full bg-cover bg-center rounded-lg"
//                 style={{ backgroundImage: "url('/bg3.jpg')" }}
//               />
//               <button
//                 onClick={() =>
//                   handleCustomizationChange("backgroundImage", "/bg4.jpg")
//                 }
//                 className="h-24 w-full bg-cover bg-center rounded-lg"
//                 style={{ backgroundImage: "url('/bg4.jpg')" }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Section 2: Preview */}
//       <div className="flex-1 flex flex-col items-center">
//         <h2 className="text-2xl font-bold text-[#134B70] mb-6">
//           Preview Your Billboard
//         </h2>
//         <TailwindCard
//           candidateDetails={candidateDetails}
//           customization={customization}
//         />
//       </div>
//     </div>
//   );
// };

// export default BillboardDesignPage;
