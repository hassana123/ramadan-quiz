import React, { useState, useEffect } from "react";
import { CheckCircle, Check, PlusCircle } from "lucide-react";
import { deeds as defaultDeeds } from "../data/deeds";
import { motion } from "framer-motion";

const DeedOfTheDay = () => {
  // 🔹 Ramadan 2026: starts February 18, can last 29 or 30 days (ends March 19 at latest)
  const ramadanStartDate = new Date("2026-02-18");
  const ramadanEndDate = new Date("2026-03-19");
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0];

  const timeDiff = today - ramadanStartDate;
  let dayOfRamadan = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

  if (today < ramadanStartDate || today > ramadanEndDate) {
    dayOfRamadan = null;
  }

  const storedDeeds = JSON.parse(localStorage.getItem("userDeeds")) || [];
  const allDeeds = [...defaultDeeds, ...storedDeeds];

  const todayIndex = dayOfRamadan ? (dayOfRamadan - 1) % allDeeds.length : null;
  const [deed, setDeed] = useState(todayIndex !== null ? allDeeds[todayIndex] : "");
  const [isCompleted, setIsCompleted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [milestone, setMilestone] = useState("");
  const [newDeed, setNewDeed] = useState("");
  const [showSuggestionBox, setShowSuggestionBox] = useState(false);

  useEffect(() => {
    checkIfCompleted();
    checkStreak();
  }, []);

  const checkIfCompleted = () => {
    const lastCompletedDate = localStorage.getItem("lastCompletedDate");
    if (lastCompletedDate === todayDate) setIsCompleted(true);
  };

  const checkStreak = () => {
    const lastCompletedDate = localStorage.getItem("lastCompletedDate");
    const savedStreak = parseInt(localStorage.getItem("streak")) || 0;

    if (lastCompletedDate === todayDate) {
      setStreak(savedStreak);
      return;
    }

    if (lastCompletedDate) {
      const lastDate = new Date(lastCompletedDate);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastDate.toDateString() === yesterday.toDateString()) {
        localStorage.setItem("streak", savedStreak + 1);
        setStreak(savedStreak + 1);
      } else {
        localStorage.setItem("streak", 1);
        setStreak(1);
      }
    } else {
      localStorage.setItem("streak", 1);
      setStreak(1);
    }
    checkMilestone(streak);
  };

  const checkMilestone = (currentStreak) => {
    let milestoneMessage = "";
    if (currentStreak === 3) milestoneMessage = "🔥 3-Day Streak! Keep it up!";
    if (currentStreak === 7) milestoneMessage = "🏆 7-Day Streak! Great job!";
    if (currentStreak === 14) milestoneMessage = "🎉 14-Day Streak! Amazing!";
    if (currentStreak === 29 || currentStreak === 30) milestoneMessage = "🌟 Full Ramadan Streak! Masha'Allah!";
    setMilestone(milestoneMessage);
  };

  const handleCheckboxChange = () => {
    localStorage.setItem("lastCompletedDate", todayDate);
    setIsCompleted(true);
    checkStreak();
  };

  const handleSuggestDeed = () => {
    if (newDeed.trim().length === 0) return;
    const updatedDeeds = [...storedDeeds, newDeed];
    localStorage.setItem("userDeeds", JSON.stringify(updatedDeeds));
    setNewDeed("");
    setShowSuggestionBox(false);
    alert("✅ Your deed suggestion has been saved!");
  };

  return (
    <section className="bg-whiteish shadow-lg p-4 rounded-2xl text-black w-[90%] mx-auto my-5 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-10 rounded-2xl pointer-events-none"></div>

      <h1 className="text-[28px] font-extrabold text-center text-secondary mb-4">
        🌟 Deed of the Day
      </h1>

      {dayOfRamadan === null ? (
        <p className="text-center text-red-500 font-bold text-lg">
          Deeds will be available during Ramadan 2026 (Feb 18 – Mar 19).
        </p>
      ) : (
        <>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-[20px] font-semibold leading-relaxed text-gray-800"
          >
            {deed}
          </motion.p>

          <div className="flex justify-center items-center mt-6">
            {!isCompleted ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCheckboxChange}
                className="flex items-center cursor-pointer bg-[#618264] text-whiteish px-5 py-2 rounded-xl shadow-md font-bold text-lg hover:bg-green-600 transition-all"
              >
                <Check className="mr-2" />
                Mark as Done
              </motion.button>
            ) : (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="flex items-center justify-center text-green-600 font-bold text-lg"
              >
                <CheckCircle className="text-green-500 w-8 h-8 mr-2" />
                Completed!
              </motion.div>
            )}
          </div>

          <div className="bg-secondary text-whiteish py-1 mt-4 rounded-[16px] font-600 text-center">
            <h1 className="text-[48px]">{streak} 🔥</h1>
            <span>Day Streak</span>
          </div>

          {milestone && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center text-lg font-bold mt-3 text-highlight"
            >
              {milestone}
            </motion.p>
          )}

          <button
            onClick={() => setShowSuggestionBox(!showSuggestionBox)}
            className="flex items-center justify-center text-white px-4 py-2 mt-5 rounded-xl shadow-md font-bold text-lg hover:bg-blue-600 transition-all mx-auto"
          >
            <PlusCircle className="mr-2" />
            Suggest a Deed
          </button>

          {showSuggestionBox && (
            <div className="mt-4 flex flex-col items-center gap-3">
              <input
                type="text"
                value={newDeed}
                onChange={(e) => setNewDeed(e.target.value)}
                placeholder="Type your deed suggestion..."
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button
                onClick={handleSuggestDeed}
                className="bg-secondary text-white px-6 py-2 rounded-xl font-bold hover:bg-green-700 transition-all"
              >
                Submit
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default DeedOfTheDay;