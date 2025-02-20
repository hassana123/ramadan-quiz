import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, BookOpenCheck, Calculator,ChevronDown, ChevronUp } from "lucide-react";
import { surahs } from "../data/surahs";

const TOTAL_SURAHS = 114;
const TOTAL_HIZB = 60; // The Qur'an is divided into 60 Hizb

const QuranTracker = () => {
  const [completedSurahs, setCompletedSurahs] = useState([]);
  const [goalDays, setGoalDays] = useState("");
  const [surahsPerDay, setSurahsPerDay] = useState(0);
  const [hizbPerDay, setHizbPerDay] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    const storedProgress = JSON.parse(localStorage.getItem("quranProgress")) || [];
    setCompletedSurahs(storedProgress);

    const savedGoal = localStorage.getItem("goalDays");
    if (savedGoal) {
      setGoalDays(savedGoal);
      calculateReadingPlan(savedGoal);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("quranProgress", JSON.stringify(completedSurahs));
  }, [completedSurahs]);

  const handleToggleSurah = (surah) => {
    setCompletedSurahs((prev) =>
      prev.includes(surah) ? prev.filter((s) => s !== surah) : [...prev, surah]
    );
  };

  const handleGoalChange = (e) => {
    const days = e.target.value;
    setGoalDays(days);
    localStorage.setItem("goalDays", days);
    calculateReadingPlan(days);
  };

  const calculateReadingPlan = (days) => {
    if (days && days > 0) {
      setSurahsPerDay(Math.ceil(TOTAL_SURAHS / days));
      setHizbPerDay((TOTAL_HIZB / days).toFixed(2)); // Rounded to 2 decimal places
    } else {
      setSurahsPerDay(0);
      setHizbPerDay(0);
    }
  };

  const progressPercentage = Math.floor((completedSurahs.length / TOTAL_SURAHS) * 100);

  return (
    <section className="bg-white shadow-lg p-6 rounded-2xl text-black w-[95%] mx-auto my-5 relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-10 rounded-2xl pointer-events-none"></div>

      <h1 className="text-[28px] font-extrabold text-center text-secondary mb-4">
        📖 Qur'an Recitation Tracker
      </h1>

      {/* Progress Bar */}
      <div className="w-full bg-[#EEEEEE] rounded-lg h-6 mb-5">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1 }}
          className="bg-[#618264] h-6 rounded-lg text-whiteish text-center"
        >
          {progressPercentage}%
        </motion.div>
      </div>

      {/* Reading Plan Calculator */}
       
      <div className="p-5 rounded-xl md:w-[50%] w-full shadow-md mb-5 bg-gray-100">
      {/* Header with Expand/Collapse */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-lg font-bold flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-secondary" />
          Set Your Completion Goal
        </h2>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? <ChevronUp className="w-5 h-5 text-secondary" /> : <ChevronDown className="w-5 h-5 text-secondary" />}
        </motion.div>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.4 }}
          className="mt-3"
        >
          <div className="flex items-center space-x-3">
            <input
              type="number"
              placeholder="Enter days (e.g., 30)"
              value={goalDays}
              onChange={handleGoalChange}
              className="w-full bg-whiteish p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-lg"
            />
          </div>

          {goalDays && goalDays > 0 ? (
            <div className="mt-3 text-gray-700 text-lg">
              <p>📖 Read <b>{surahsPerDay}</b> Surahs per day</p>
              <p>📖 Read <b>{hizbPerDay}</b> Hizb per day</p>
            </div>
          ) : (
            <p className="text-sm mt-2 text-gray-500">Enter a number of days to generate a plan.</p>
          )}
        </motion.div>
      )}
    </div>  {/* Surah List with Custom Scrollbar */}
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
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f0f0f0;
          border-radius: 20px;
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
