import React, { useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";
import like from "../assets/like.png";
import arrow from "../assets/backarrow.png";
import Share from "../components/Share";
import { firestore } from "../../firebase"; // Adjust the path to your Firebase configuration
import {
  collection,
  addDoc,
  updateDoc,
  serverTimestamp,
  query,
  where,
  limit,
  getDocs,
} from "firebase/firestore";

const CompleteQuiz = () => {
  const navigate = useNavigate();
  const [save, setSave] = useState(false);
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(localStorage.getItem("score"));
  const [saving, setSaving] = useState(false);
  const [showSocials, setShowSocials] = useState(false);

  const leaderB = () => {
    setSave(true);
  };
  const handleShare = () => {
    setShowSocials(!showSocials);
  };
  
  const onSave = async () => {
    // Validate user input
    if (!userName.trim()) {
      alert("Please enter your name");
      return;
    }

    setSaving(true);

    try {
      // Reference to the LeaderBoard collection
      const leaderboardCollection = collection(firestore, "LeaderBoard");

      // Query to check if the user already exists in the LeaderBoard
      const userQuery = query(
        leaderboardCollection,
        where("name", "==", userName),
        limit(1)
      );

      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.size > 0) {
        // User already exists, check the score and update if necessary
        const existingUser = userSnapshot.docs[0].data();
        const existingScore = existingUser.score;

        if (
          parseInt(score) > existingScore ||
          parseInt(score) < existingScore
        ) {
          // Update the existing entry with the new score
          await updateDoc(userSnapshot.docs[0].ref, {
            score: parseInt(score),
            timestamp: serverTimestamp(),
          });
          alert("Score updated successfully!");
        } else {
          await updateDoc(userSnapshot.docs[0].ref, {
            score: parseInt(score),
            timestamp: serverTimestamp(),
          });
          alert("Updated!!! Same Score as Last Time !");
        }
      } else {
        // User doesn't exist, create a new entry
        await addDoc(leaderboardCollection, {
          name: userName,
          score: parseInt(score),
          timestamp: serverTimestamp(),
        });
        alert("Score saved successfully!");
      }

      setSave(false);
    } catch (error) {
      console.error("Error saving score:", error);
      alert("Failed to save score. Please try again.");
    } finally {
      setSaving(false);
    }
  };
  const [streak, setStreak] = useState(0);
  const [milestone, setMilestone] = useState("");

  useEffect(() => {
    trackStreak();
  }, []);

  const trackStreak = () => {
    const today = new Date().toDateString();
    const lastQuizDate = localStorage.getItem("lastQuizDate");
    let currentStreak = parseInt(localStorage.getItem("streak")) || 0;

    if (lastQuizDate === today) {
      return; // Avoid increasing streak multiple times in a day
    }

    if (lastQuizDate) {
      const lastDate = new Date(lastQuizDate);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastDate.toDateString() === yesterday.toDateString()) {
        currentStreak += 1;
      } else {
        currentStreak = 1; // Reset if missed a day
      }
    } else {
      currentStreak = 1; // First time playing
    }

    localStorage.setItem("streak", currentStreak);
    localStorage.setItem("lastQuizDate", today);
    setStreak(currentStreak);

    checkMilestone(currentStreak);
  };

  const checkMilestone = (streak) => {
    if (streak === 3) {
      setMilestone("🔥 3-Day Streak! You're on fire!");
    } else if (streak === 7) {
      setMilestone("🏆 7-Day Streak! You're a Ramadan Quiz Champion!");
    } else if (streak === 14) {
      setMilestone("🌟 14-Day Streak! Amazing Dedication!");
    } else if (streak === 30) {
      setMilestone("🎉 30-Day Streak! You completed the whole month!");
    } else {
      setMilestone("");
    }
  };

  return (
    <>
      <main className="font-custom2 bg-mainbg fit-content p-2 w-full ">
        <img
          onClick={() => navigate("/quiz-home")}
          className="cursor-pointer"
          src={arrow}
          alt="back"
        />
        <section className="text-center p-1 bg-whiteish rounded-[16px] shadow-md w-[98%] mt-[100px] mx-auto text-black">
          <img className="mx-auto mt-[-90px]" src={like} alt="like" />
          <h1 className="mb-3 mt-[-15px] text-[36px] font-700">Masha Allah</h1>
          <div className="flex items-center justify-center gap-2">
          <div className="bg-mainbg text-whiteish py-2 px-5 mb-5 rounded-[16px] font-600 inline-block">
            <h1 className="text-[48px]">{localStorage.getItem("score")}</h1>
            <span>Your Score</span>
          </div>
           {/* 🔥 Streak Display */}
           <div className="bg-secondary text-whiteish py-2 px-5 mb-5 rounded-[16px] font-600 inline-block">
            <h1 className="text-[48px]">{streak} 🔥</h1>
            <span>Day Streak</span>
          </div>
          </div>

          {/* 🎉 Milestone Message */}
          {milestone && <p className="text-[20px] font-bold text-highlight">{milestone}</p>}

          <div className="flex justify-center space-x-2 mb-8">
            <div className="bg-secondary font-600 p-4 rounded-[8px] text-whiteish">
              <h1 className="text-[24px]">{localStorage.getItem("totalQ")}</h1>
              <span>Questions</span>
            </div>
            <div className="bg-primary font-600 p-4 rounded-[8px] text-whiteish">
              <h1 className="text-[24px]">
                {localStorage.getItem("correctAnswersCount")}
              </h1>
              <span>Correct</span>
            </div>
            <div className="bg-redish  font-600 p-4 rounded-[8px] text-whiteish">
              <h1 className="text-[24px]">
                {localStorage.getItem("incorrectAnswersCount")}
              </h1>
              <span>Incorrect</span>
            </div>
          </div>
          <button
            onClick={leaderB}
            className="block hover:scale-[3px] hover:bg-mainbg hover:text-whiteish text-[24px] mx-auto border-[#646161] border-[2px] shadow-md px-[24px] py-[8px] rounded-[8px] mb-5"
          >
            Leader board
          </button>
          <button
            onClick={handleShare}
            className="block hover:bg-mainbg hover:text-whiteish text-[24px] mx-auto border-[#646161] border-[2px] shadow-md px-[24px] py-[8px] rounded-[8px] mb-5"
          >
            {showSocials ? "Close" : "  Share with Friend"}
          </button>
          {showSocials ? <Share /> : ""}
        </section>
        <button
          onClick={() => navigate("/")}
          className="block mx-auto bg-whiteish hover:bg-secondary hover:text-whiteish text-secondary hover:border-secondary text-black px-[130px] my-10 py-[8px] text-[24px] rounded-[8px]"
        >
          Exit
        </button>
      </main>
      {save ? (
        <div className="absolute w-full h-screen top-0 opacity-95 filter saturate-80 bg-mainbg ">
          <div className="flex justify-center mt-[150px]">
            <div className="bg-whiteish text-black w-[90%] rounded-[8px] shadow-lg  py-10 px-5 ">
              <h1 className="font-bold text-[18px] my-5">
                Enter Your Name to Save Score To LeaderBoard
              </h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSave();
                }}
              >
                <label className="block font-bold text-[20px] my-2" htmlFor="">
                  Name
                </label>
                <input
                  id="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-whiteish text-black border w-[95%] rounded-[5px] px-5 py-2 text-black"
                  type="text"
                />
                <button
                  disabled={saving}
                  type="submit"
                  className="hover:bg-whiteish hover:text-secondary hover:border bg-secondary text-[18px] font-bold mx-10 my-5 w-[60%] text-whiteish py-3 rounded-[10px]"
                >
                  {saving ? "saving" : "save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CompleteQuiz;
