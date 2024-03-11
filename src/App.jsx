import QuizHome from "./pages/QuizHome";
import QuizPage from "./pages/QuizPage";
import Landing from "./pages/Landing";
import CompleteQuiz from "./pages/CompleteQuiz";
import LeaderBoard from "./pages/LeaderBoard";
//import SplashScreen from "./components/SplashScreen";
import logo from "../public/moon.svg";
import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const showNotification = (title, options) => {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification(title, options);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification(title, options);
          }
        });
      }
    }
  };

  // Function to schedule reminders
  const scheduleReminders = () => {
    // Set the start and end dates for reminders
    const startDate = new Date("2024-03-01T08:00:00");
    const endDate = new Date("2024-04-10T20:30:00");

    // Set the interval for reminders (every day)
    const interval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    // Schedule reminders
    const reminderInterval = setInterval(() => {
      const now = new Date();

      if (now >= startDate && now <= endDate) {
        // Morning reminder at 8:00 AM
        const morningOptions = {
          body: "Don't forget to play the quiz of the day!",
          icon: logo,
        };
        showNotification("Hallaly", morningOptions);

        // Evening reminder at 8:30 PM
        const eveningOptions = {
          body: "Don't forget to play the quiz of the day!",
          icon: logo,
        };
        showNotification("Hallaly", eveningOptions);
      } else if (now > endDate) {
        // Stop reminders after April 10
        clearInterval(reminderInterval);
      }
    }, interval);
  };

  useEffect(() => {
    scheduleReminders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval]); // Run only once on component mount

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quiz-home" element={<QuizHome />} />
        <Route path="/quiz-page" element={<QuizPage />} />
        <Route path="/quiz-complete" element={<CompleteQuiz />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
      </Routes>
    </>
  );
}

export default App;
// import { useState, useEffect } from "react";
// import { firestore } from "../firebase";
// import { doc, setDoc } from "firebase/firestore";
// import "./App.css";

// // Array of your day question files
// const dayQuestionFiles = [
//   "dayone",
//   "daytwo",
//   "daythree",
//   "dayfour",
//   "dayfive",
//   "daysix",
//   "dayseven",
//   "dayeight",
//   "daynine",
//   "dayten",
//   "dayeleven",
//   "daytwelve",
//   "daythirteen",
//   "dayfourteen",
//   "dayfifteen",
//   "daysixteen",
//   "dayseventeen",
//   "dayeighteen",
//   "daynineteen",
//   "daytwenty",
//   "daytwentyone",
//   "daytwentytwo",
//   "daytwentythree",
//   "daytwentyfour",
//   "daytwentyfive",
//   "daytwentysix",
//   "daytwentyseven",
//   "daytwentyeight",
//   "daytwentynine",
//   "daythirty",
// ];

// function App() {
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     const addQuestionsToFirestore = async (day, questionData) => {
//       try {
//         await setDoc(doc(firestore, "quizQuestions", `day${day}`), {
//           questions: questionData,
//         });
//         console.log(`Questions for day ${day} added to Firestore!`);
//       } catch (error) {
//         console.error(
//           `Error adding questions for day ${day} to Firestore: `,
//           error
//         );
//       }
//     };

//     const addQuestionsForDay = async (day, questionFile) => {
//       const { default: dayQuestions } = await import(
//         `./questions/${questionFile}.js`
//       );
//       setQuestions(dayQuestions); // Set the questions state for the current day
//       addQuestionsToFirestore(day, dayQuestions);
//     };

//     // Loop through each day file and add its questions to Firestore
//     dayQuestionFiles.forEach((questionFile, index) => {
//       const day = index + 1;
//       addQuestionsForDay(day, questionFile);
//     });
//   }, []);

//   return <h1>hello</h1>;
// }

// export default App;
