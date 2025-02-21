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
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import useFcmToken from "./hooks/useFcmToken";
import InstallButton from "./components/InstallButton";
//import { requestPermission } from "../firebase";
function App() {
  const { token, notificationPermissionStatus } = useFcmToken();

  useEffect(() => {
    if (token) {
      console.log("FCM Token:", token);
    }
  }, [token]);
//  localStorage.clear()

  // useEffect(() => {
  //   requestPermission();
  // }, []);
  return (
    <main className="min-h-screen flex flex-col">
    <Navbar/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quiz-home" element={<QuizHome />} />
        <Route path="/quiz-page" element={<QuizPage />} />
        <Route path="/quiz-complete" element={<CompleteQuiz />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
      </Routes>
      <InstallButton/>
      <Footer/>
    </main> 
  );
}

export default App;
// import { useState, useEffect } from "react";
// import { firestore } from "../firebase";
// import { doc, setDoc } from "firebase/firestore";
// import "./App.css";

// Array of your day question files
// import { useState,useEffect } from "react";
// import { setDoc, doc } from "firebase/firestore";
// import { firestore } from "../firebase";
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
