import React from "react";

const TailwindCard = ({ candidateDetails, customization }) => {
  const { name, description, photoURL } = candidateDetails;
  const { fontColor, cardColor, borderColor, backgroundImage } = customization;

  return (
    <div
      className="border-4 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
      style={{
        backgroundColor: cardColor,
        borderColor: borderColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mb-4">
        {photoURL && (
          <img
            src={photoURL}
            alt={name}
            className="w-full h-full object-cover rounded-lg mb-4"
          />
        )}
        <h3 className="text-2xl font-bold" style={{ color: fontColor }}>
          {name || "Candidate Name"}
        </h3>
        <p className="mt-2" style={{ color: fontColor }}>
          {description ||
            "Candidate description goes here. Add some details about the candidate."}
        </p>
      </div>
    </div>
  );
};

export default TailwindCard;
