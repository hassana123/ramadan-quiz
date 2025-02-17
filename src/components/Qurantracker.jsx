import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, BookOpenCheck } from "lucide-react";
import { surahs } from "../data/surahs";


const QuranTracker = () => {
    const [completedSurahs, setCompletedSurahs] = useState([]);
    
    useEffect(() => {
      const storedProgress = JSON.parse(localStorage.getItem("quranProgress")) || [];
      setCompletedSurahs(storedProgress);
    }, []);
  
    useEffect(() => {
      localStorage.setItem("quranProgress", JSON.stringify(completedSurahs));
    }, [completedSurahs]);
  
    const handleToggleSurah = (surah) => {
      setCompletedSurahs((prev) =>
        prev.includes(surah) ? prev.filter((s) => s !== surah) : [...prev, surah]
      );
    };
  
    const progressPercentage = Math.floor((completedSurahs.length / surahs.length) * 100);
  
    return (
      <section className="bg-white shadow-lg p-6 rounded-2xl text-black w-[90%] mx-auto my-5 relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-10 rounded-2xl pointer-events-none"></div>
  
        <h1 className="text-[28px] font-extrabold text-center text-secondary mb-4">
          📖 Qur'an Recitation Tracker
        </h1>
  
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-5">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1 }}
            className="bg-green-500 h-4 rounded-full text-white text-center"
          >
            {progressPercentage}%
          </motion.div>
        </div>
  
        {/* Surah List with Custom Scrollbar */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 overflow-y-scroll h-[50vh] p-2 pr-4"
          style={{
            scrollbarWidth: "thin", // For Firefox
            scrollbarColor: "#618264 #f0f0f0",
          }}
        >
          {surahs.map((surah, index) => (
            <motion.div
              key={index}
              whileTap={{ scale: 0.9 }}
              className="flex items-center p-3 bg-gray-100 rounded-lg shadow-sm cursor-pointer hover:bg-green-100 transition-all"
              onClick={() => handleToggleSurah(surah)}
            >
              {completedSurahs.includes(surah) ? (
                <CheckCircle className="text-green-500 w-6 h-6 mr-2" />
              ) : (
                <BookOpenCheck className="text-gray-500 w-6 h-6 mr-2" />
              )}
              <span className="text-lg font-semibold">{surah}</span>
            </motion.div>
          ))}
        </div>
  
        {/* Custom Scrollbar Styling */}
        <style jsx>{`
          /* WebKit (Chrome, Safari) */
          ::-webkit-scrollbar {
            width: 10px;
          }
          ::-webkit-scrollbar-track {
            background: #f0f0f0;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb {
            background: #618264;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #618264;
          }
        `}</style>
      </section>
    );
  };
  
  export default QuranTracker;
  