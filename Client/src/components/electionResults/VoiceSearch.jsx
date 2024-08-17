import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function VoiceSearch({ onSearch }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    let recognition = null;

    if ("webkitSpeechRecognition" in window) {
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.lang = "ar-JO";

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
        onSearch(transcript);
      };

      recognition.onerror = (event) => {
        console.error("خطأ في التعرف على الصوت:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognition) recognition.abort();
    };
  }, [onSearch]);

  const startListening = () => {
    setIsListening(true);
    setTranscript("");
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "ar-JO";
      recognition.start();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
          isListening ? "bg-red-500" : "bg-white"
        } text-red-700`}
        onClick={startListening}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </motion.button>
      <div className="mr-3">
        <p className="text-sm text-white opacity-80">
          {isListening ? "جارٍ الاستماع..." : "ابحث عن دائرة صوتياً"}
        </p>
        {transcript && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-semibold text-white"
          >
            "{transcript}"
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

export default VoiceSearch;
