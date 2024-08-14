import React from "react";
import HeroSection from "../components/home/HeroSection";

const voterInfo = {
  voterName: "اسلام عمر ",
  district: "الدائرة الانتخابية الأولى - الزرقاء",
  electionDate: "2024-11-05T00:00:00", // Example date
};

const Home = () => {
  return (
    <div>
      <HeroSection
        voterName={voterInfo.voterName}
        district={voterInfo.district}
        electionDate={voterInfo.electionDate}
      />{" "}
    </div>
  );
};

export default Home;
