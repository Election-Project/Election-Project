import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import your AuthContext
import NotloggedHero from "./NotloggedHero";
import img1 from "../../assets/img/1.png";
import img2 from "../../assets/img/2.png";
import img3 from "../../assets/img/3.png";
import axios from "axios";

const HeroSection = ({ voterName, district, electionDate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  const images = [img1, img2, img3];
  const [voterCount, setVoterCount] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }));
  }, [controls]);

  const { isAuthenticated } = useAuth();
  const [timeLeft, setTimeLeft] = useState("");
  const [timeComponents, setTimeComponents] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const electionTime = new Date(electionDate).getTime();

    if (isNaN(electionTime)) {
      return {
        timeLeft: "تاريخ غير صالح",
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const distance = electionTime - now;

    if (distance < 0) {
      return {
        timeLeft: "يوم الانتخابات!",
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return {
      timeLeft: `${days} يوم ${hours} ساعة ${minutes} دقيقة ${seconds} ثانية`,
      days,
      hours,
      minutes,
      seconds,
    };
  };

  useEffect(() => {
    const updateTimer = () => {
      const { timeLeft, days, hours, minutes, seconds } = calculateTimeLeft();
      setTimeLeft(timeLeft);
      setTimeComponents({ days, hours, minutes, seconds });
    };

    updateTimer(); // Call once immediately

    const countdown = setInterval(updateTimer, 1000);

    return () => clearInterval(countdown);
  }, [electionDate]);

  useEffect(() => {
    const fetchVoterCount = async () => {
      try {
        const response = await axios.get("/api/stats/registered-voters-count");
        setVoterCount(response.data.count);
      } catch (error) {
        console.error("Error fetching voter count:", error);
      }
    };

    fetchVoterCount();
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <div className="relative flex flex-col md:flex-row justify-between items-center p-8 bg-gradient-to-r -mt-16 rounded-3xl shadow-2xl  overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-700 -z-10 to-green-500 opacity-75"></div>

          <motion.div
            className="md:w-1/2 mb-8 md:mb-0 "
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeInOut" }}
          >
            <motion.h1
              className="text-4xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ce1126] via-[#ce1126] to-black"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            >
              مرحبا, {voterName}
            </motion.h1>{" "}
            <motion.h1
              className="text-5xl font-extrabold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ce1126] via-[#000000] to-black"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              طريقة جديدة للمشاركة في الانتخابات
            </motion.h1>
            <motion.p
              className="mb-8 text-gray-900 text-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            >
              نحن هنا لتقديم كافة المعلومات والدعم اللازم لضمان انتخابات نزيهة
              وشفافة في الأردن.
            </motion.p>{" "}
            <motion.p
              className="mb-8 text-gray-900 text-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            >
              الدائرة الانتخابية: {district}
            </motion.p>{" "}
            <motion.div
              className="flex justify-center items-center mb-8 p-4 ml-5  rounded-lg shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            >
              <div className="text-red-600 text-5xl font-extrabold tracking-wider animate-pulse">
                {timeLeft}
              </div>
            </motion.div>
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            >
              <motion.button
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(206, 17, 38, 0.7)", // Red shadow
                  border: "2px solid rgba(206, 17, 38, 0.7)", // Red border
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#ce1126] via-[#007a3d] to-black text-white px-8 py-3 ml-3 rounded-full transition-all duration-300"
              >
                سجل للمشاركة
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#007a3d", // Green background on hover
                  color: "#ffffff",
                }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-[#007a3d] text-[#007a3d] px-8 py-3 rounded-full transition-all duration-300"
              >
                المزيد من التفاصيل
              </motion.button>
            </motion.div>
            <div className="flex mt-12">
              {[
                {
                  value: `${voterCount !== null ? voterCount : "Loading..."}`,
                  label: "عدد الناخبين المسجلين",
                },
                { value: "300+", label: "المرشحين" },
                { value: "25", label: "مناطق الانتخابات" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  custom={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={controls}
                  transition={{
                    duration: 0.7,
                    delay: 0.3 * (index + 1),
                    ease: "easeOut",
                  }}
                  className={index > 0 ? "mr-10" : ""} // Add margin-left to all except the first item
                >
                  <motion.div
                    className="text-4xl font-bold text-[#ce1126]" // Red text color
                    whileHover={{ scale: 1.15, color: "#007a3d" }} // Green on hover
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-900">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
            transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
          >
            <div className="grid grid-cols-2 gap-6">
              {[
                { bg: "bg-[#ce1126]", mt: "mt-12" },
                { bg: "bg-[#007a3d]", mt: "mt-12" },
                { bg: "bg-black", span: "col-span-2" },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  className={`${card.bg} ${card.mt} ${card.span} rounded-2xl p-6 shadow-lg`}
                  whileHover={{
                    scale: 1.05,
                    rotate: 0,
                    boxShadow: "0 15px 20px rgba(0, 0, 0, 0.3)",
                    borderRadius: "1rem",
                    backgroundColor: "#f3f4f6",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={images[index]}
                    alt={`صورة ${index + 1}`}
                    className="rounded-full w-full h-auto"
                  />
                </motion.div>
              ))}
            </div>
            <motion.div
              className="absolute top-0 left-0 -z-10 w-full h-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.2 }}
            >
              <motion.div
                className="absolute top-1/4 left-1/4 w-16 h-16 bg-yellow-300 rounded-full opacity-70 animate-pulse"
                animate={{ scale: [1, 1.5, 1], rotate: 360 }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              ></motion.div>
              <motion.div
                className="absolute bottom-1/3 right-1/4 w-10 h-10 bg-purple-300 rounded-full opacity-70 animate-bounce"
                animate={{ y: [0, -30, 0], scale: [1, 1.2, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              ></motion.div>
              <motion.div
                className="absolute top-1/2 right-1/3 w-20 h-20 border-4 border-blue-300 rounded-full opacity-50"
                animate={{ rotate: 360, scale: [1, 1.3, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              ></motion.div>
            </motion.div>
          </motion.div>
        </div>
      ) : (
        <NotloggedHero />
      )}
    </>
  );
};

export default HeroSection;
