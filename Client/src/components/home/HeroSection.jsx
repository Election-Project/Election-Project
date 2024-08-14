import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HeroSection = ({ voterName, district, electionDate }) => {
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

  return (
    <>
      <div className="container mx-auto lg:px-32 px-0  my-5">
        <div
          className="bg-cover bg-center text-white py-16 px-4 sm:py-24 sm:px-8 lg:py-32 lg:px-12 text-center rounded-lg shadow-lg"
          style={{
            backgroundImage: `url('https://img.freepik.com/premium-photo/jordan-flag-hand-dropping-ballot-card-into-box-voting-election-concept_764664-10085.jpg?uid=R157407297&ga=GA1.1.336651591.1720684343&semt=ais_hybrid')`,
          }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-black">
            مرحباً، {voterName} من {district}
          </h1>
          <p className="text-base sm:text-lg mb-6 text-black">
            صوتك مهم! تأكد من التصويت في الانتخابات القادمة.
          </p>

          <div className="mb-6 sm:mb-8">
            <span className="text-xl sm:text-2xl font-semibold text-black">
              العد التنازلي للانتخابات:
            </span>
            <div className="text-2xl sm:text-3xl font-bold mt-2 text-emerald-400 leading-relaxed">
              <span style={{ direction: "rtl", display: "inline-block" }}>
                {`${timeComponents.seconds} ثانية ${timeComponents.minutes} دقيقة ${timeComponents.hours} ساعة ${timeComponents.days} يوم`}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/view-election-lists"
              className="flex items-center bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 lg:ml-4 ml-0 rounded-lg shadow-lg"
            >
              <svg
                className="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 12l2 2 4-4" />
                <path d="M4 10h16v2H4zM5 4h14v2H5zM4 16h16v2H4z" />
              </svg>
              عرض القوائم الانتخابية
            </Link>
            <Link
              to="/vote-now"
              className="flex items-center bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
            >
              <svg
                className="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 10l7 7 7-7" />
                <path d="M12 5v14" />
                <path d="M12 5l-7 7 7 7" />
              </svg>
              صوت الآن
            </Link>
            <Link
              to="/check-results"
              className="flex items-center bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
            >
              <svg
                className="w-6 h-6 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 19l-7-7 7-7" />
                <path d="M5 12h14" />
              </svg>
              تحقق من النتائج
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
