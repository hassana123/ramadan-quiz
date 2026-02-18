import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import timer from "../assets/timer.svg";
import SplashScreen from "../components/SplashScreen";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [showJustification, setShowJustification] = useState(false);
  const [loading, setLoading] = useState(true);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [incorrectAnswersCount, setIncorrectAnswersCount] = useState(0);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(300);

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the questions from local storage
    const getDay = localStorage.getItem("thisDay");
    const fetchQuestionsForDay = async () => {
      try {
        const docRef = doc(firestore, "quizQuestions", `day${getDay}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          let newQ = docSnap.data().questions;
          setQuestions(newQ);
          setLoading(false);
        } else {
          console.log("No questions found for this day");
        }
      } catch (error) {
        console.error("Error fetching questions: ", error);
      }
    };
    fetchQuestionsForDay();
  }, []);

  useEffect(() => {
    // Timer logic
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalId);
          navigate("/quiz-complete");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeRemaining]);

  const handleAnswerClick = (index) => {
    if (selectedAnswer !== null) return;

    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswerIndex = currentQuestion.correctOption;
    const isCorrect = index === correctAnswerIndex;

    setSelectedAnswer(index);
    setIsCorrectAnswer(isCorrect);
    setShowJustification(true);

    if (isCorrect) {
      setCorrectAnswersCount((count) => count + 1);
      setScore((count) => count + 50);
    } else {
      setIncorrectAnswersCount((count) => count + 1);
    }

    // Increased to 6 seconds so users have time to read the justification
    setTimeout(() => {
      setShowJustification(false);
      setSelectedAnswer(null);
      setIsCorrectAnswer(null);

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        navigate("/quiz-complete");
      }
    }, 6000);
  };

  // Save progress
  localStorage.setItem("correctAnswersCount", correctAnswersCount);
  localStorage.setItem("incorrectAnswersCount", incorrectAnswersCount);
  localStorage.setItem("score", score);
  localStorage.setItem("totalQ", questions.length);

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <main className="font-custom2 bg-opaquebg w-full h-full">
          {/* Header */}
           {/* Category Badge — only shown if the question has a category */}
            

          <header className="bg-mainbg p-1">
            {questions[currentQuestionIndex].category && (
              <p className="text-center text-[15px] font-bold text-white ">
                {questions[currentQuestionIndex].category}
              </p>
            )}
            <div className="flex justify-between mx-3 my-6">
              <p className="text-[20px] font-600">{`Question ${
                currentQuestionIndex + 1
              }`}</p>

              {/* Timer */}
              <div className="flex justify-center pr-1 space-x-1 border-[2px] rounded-[4px]">
                <img src={timer} alt="timer" />
                <span>{`${Math.floor(timeRemaining / 60)}:${(
                  "0" +
                  (timeRemaining % 60)
                ).slice(-2)}`}</span>
              </div>
            </div>
            <h1 className="text-center mb-2 text-xl font-bold">{score}</h1>

            {/* Question Progress Indicators */}
            <div className="mb-20 flex w-[95%] mx-auto py-2">
              {Array.from({ length: questions.length }, (_, index) => (
                <div
                  key={index}
                  className={`h-[8px] w-[16px] mx-auto ${
                    index < correctAnswersCount
                      ? "bg-highlight"
                      : index < correctAnswersCount + incorrectAnswersCount
                      ? "bg-redish"
                      : "bg-whiteish"
                  }`}
                ></div>
              ))}
            </div>
          </header>

          {/* Quiz Section */}
          <section className="bg-whiteish shadow-md mt-[-50px] p-1 rounded-[16px] text-black w-[98%] mx-auto">

            <h1 className="text-[24px] font-600 text-center my-8">
              {questions[currentQuestionIndex].question}
            </h1>

            <div className="grid gap-4 mb-10">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  className={`w-[90%] mx-auto text-left border-[2px] rounded-[8px] p-[8px] ${
                    selectedAnswer !== null &&
                    (index === selectedAnswer
                      ? isCorrectAnswer
                        ? "border-highlight"
                        : "border-redish"
                      : index === questions[currentQuestionIndex].correctOption
                      ? "border-highlight"
                      : "")
                  } border-[#646161] shadow-md`}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>
          </section>

          {/* Exit Button */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="text-[24px] rounded-[8px] font-500 bg-mainbg py-[8px] px-[100px] my-5 text-center"
            >
              Exit
            </button>
          </div>

          {/* Justification — fixed overlay at the bottom, always visible without scrolling */}
          {showJustification && (
            <div className="fixed text-white font-bold  bottom-10 left-0 right-0 z-50 px-4 py-2 ">
              <div
                className={`w-full rounded-2xl shadow-2xl p-5 text-center border-t-4 ${
                  isCorrectAnswer
                    ? "bg-mainbg border-highlight"
                    : "bg-mainbg border-redish"
                }`}
              >
                <p className="text-xl font-bold mb-2">
                  {isCorrectAnswer ? "✅ Correct Answer!" : "❌ Incorrect Answer"}
                </p>
                <p className="text-[15px] italic text-white leading-relaxed">
                  {questions[currentQuestionIndex].justification}
                </p>
              </div>
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default QuizPage;