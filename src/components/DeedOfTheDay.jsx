import React, { useState, useEffect } from "react";
import { CheckCircle, Check, PlusCircle, Sparkles } from "lucide-react"; // Lucide icons
import { deeds as defaultDeeds } from "../data/deeds";
import { motion } from "framer-motion"; // Animations

const DeedOfTheDay = () => {
  // 🔹 Get today's date and use it to select the deed
  const today = new Date();
  const todayDate = today.toISOString().split("T")[0]; // YYYY-MM-DD
  const dayOfMonth = today.getDate(); // March 1 → 1, March 2 → 2, etc.

  // 🔹 Retrieve user-suggested deeds from localStorage
  const storedDeeds = JSON.parse(localStorage.getItem("userDeeds")) || [];
  const allDeeds = [...defaultDeeds, ...storedDeeds]; // Combine default & user deeds
  const todayIndex = (dayOfMonth - 1) % allDeeds.length; // Rotate deeds
  const [deed, setDeed] = useState(allDeeds[todayIndex]);
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
    if (lastCompletedDate === todayDate) {
      setIsCompleted(true);
    }
  };

  const checkStreak = () => {
    const lastCompletedDate = localStorage.getItem("lastCompletedDate");
    const savedStreak = parseInt(localStorage.getItem("streak")) || 0;

    if (lastCompletedDate === todayDate) {
      setStreak(savedStreak); // Maintain streak if already completed
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
    if (currentStreak === 30) milestoneMessage = "🌟 30-Day Streak! You did it!";
    
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
            className="flex items-center cursor-pointer bg-[#618264]  text-whiteish px-5 py-2 rounded-xl shadow-md font-bold text-lg hover:bg-green-600 transition-all"
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

      {/* 🔥 Streak Display */}
      <div className="bg-secondary text-whiteish py-1 mt-4 rounded-[16px] font-600 text-center">
        <h1 className="text-[48px]">{streak} 🔥</h1>
        <span>Day Streak</span>
      </div>

      {/* 🎉 Milestone Message */}
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

      {/* 📥 Suggest a Deed Button */}
      <button
        onClick={() => setShowSuggestionBox(!showSuggestionBox)}
        className="flex items-center justify-center text-white px-4 py-2 mt-5 rounded-xl shadow-md font-bold text-lg hover:bg-blue-600 transition-all mx-auto"
      >
        <PlusCircle className="mr-2" />
        Suggest a Deed
      </button>

      {/* 📥 Suggest a Deed Form */}
      {showSuggestionBox && (
        <div className="mt-4 p-3 border rounded-lg bg-gray-100">
          <input
            type="text"
            value={newDeed}
            onChange={(e) => setNewDeed(e.target.value)}
            placeholder="Enter a good deed..."
            className="w-full p-2 px-3 bg-[#fff] border rounded-md"
          />
          <button
            onClick={handleSuggestDeed}
            className="mt-2 bg-secondary text-whiteish px-4 py-2 rounded-md w-full"
          >
            Submit
          </button>
        </div>
      )}
    </section>
  );
};

export default DeedOfTheDay;
