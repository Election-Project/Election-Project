import React, { useState, useEffect } from "react";
import axios from "axios";
import HeroSection from "../components/home/HeroSection";
import ElectionInfoSection from "../components/home/ElectionInfoSection";

const Home = () => {
  const [voterInfo, setVoterInfo] = useState({
    voterName: "",
    district: "",
    electionDate: "",
  });
  console.log(voterInfo);

  useEffect(() => {
    const fetchVoterInfo = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${baseURL}/api/user/district-info`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // or any other method to retrieve the token
          },
        });

        // Assuming the API response contains the voter info in the format you need
        setVoterInfo({
          voterName: response.data.full_name,
          district: response.data.name,
          electionDate: "2024-11-05T00:00:00", // Use appropriate date if provided by API
        });
      } catch (error) {
        console.error("Error fetching voter info:", error);
      }
    };

    fetchVoterInfo();
  }, []);

  return (
    <div>
      <HeroSection
        voterName={voterInfo.voterName}
        district={voterInfo.district}
        electionDate={voterInfo.electionDate}
      />
      <ElectionInfoSection />
    </div>
  );
};

export default Home;
