import React, { useState } from "react";
import TailwindCard from "../components/advertisment/TailwindCard";

const BillboardDesignPage = () => {
  const [candidateDetails, setCandidateDetails] = useState({
    name: "",
    description: "",
    photoURL: "",
  });

  const [customization, setCustomization] = useState({
    fontColor: "#134B70",
    cardColor: "#EEEEEE",
    borderColor: "#508C9B",
    backgroundImage: "", // State for background image
  });

  const handleCandidateDetailsChange = (e) => {
    const { name, value } = e.target;
    setCandidateDetails({ ...candidateDetails, [name]: value });
  };

  const handleCustomizationChange = (type, value) => {
    setCustomization({ ...customization, [type]: value });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 p-8 space-y-8 md:space-y-0 md:space-x-8">
      {/* Section 1: Customization Panel */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-[#134B70] mb-6">
          Customize Your Billboard
        </h2>

        <div className="space-y-6">
          {/* Candidate Details */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Candidate Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={candidateDetails.name}
              onChange={handleCandidateDetailsChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-[#134B70] focus:border-[#134B70] sm:text-sm rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={candidateDetails.description}
              onChange={handleCandidateDetailsChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-[#134B70] focus:border-[#134B70] sm:text-sm rounded-md"
              rows="4"
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              htmlFor="photoURL"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Photo URL
            </label>
            <input
              type="text"
              id="photoURL"
              name="photoURL"
              value={candidateDetails.photoURL}
              onChange={handleCandidateDetailsChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 shadow-sm focus:ring-[#134B70] focus:border-[#134B70] sm:text-sm rounded-md"
            />
          </div>

          {/* Customization Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font Color
              </label>
              <input
                type="color"
                value={customization.fontColor}
                onChange={(e) =>
                  handleCustomizationChange("fontColor", e.target.value)
                }
                className="mt-1 w-full h-10 cursor-pointer"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Color
              </label>
              <input
                type="color"
                value={customization.cardColor}
                onChange={(e) =>
                  handleCustomizationChange("cardColor", e.target.value)
                }
                className="mt-1 w-full h-10 cursor-pointer"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Border Color
              </label>
              <input
                type="color"
                value={customization.borderColor}
                onChange={(e) =>
                  handleCustomizationChange("borderColor", e.target.value)
                }
                className="mt-1 w-full h-10 cursor-pointer"
              />
            </div>
          </div>

          {/* Background Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Background
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() =>
                  handleCustomizationChange("backgroundImage", "/bg1.jpg")
                }
                className="h-24 w-full bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage:
                    "url('https://i.pinimg.com/236x/59/4a/be/594abe6b07489555b970057bf0f0b69b.jpg')",
                }}
              />
              <button
                onClick={() =>
                  handleCustomizationChange("backgroundImage", "/bg2.jpg")
                }
                className="h-24 w-full bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/bg2.jpg')" }}
              />
              <button
                onClick={() =>
                  handleCustomizationChange("backgroundImage", "/bg3.jpg")
                }
                className="h-24 w-full bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/bg3.jpg')" }}
              />
              <button
                onClick={() =>
                  handleCustomizationChange("backgroundImage", "/bg4.jpg")
                }
                className="h-24 w-full bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/bg4.jpg')" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Preview */}
      <div className="flex-1 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-[#134B70] mb-6">
          Preview Your Billboard
        </h2>
        <TailwindCard
          candidateDetails={candidateDetails}
          customization={customization}
        />
      </div>
    </div>
  );
};

export default BillboardDesignPage;
