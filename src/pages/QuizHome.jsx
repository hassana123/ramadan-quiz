import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import arrow from "../assets/backarrow.png";
import { useNavigate } from "react-router-dom";

const QuizHome = () => {
  const navigate = useNavigate();
  //const [questions, setQuestions] = useState([]);
  const [currentDay, setCurrentDay] = useState(1);
  // useEffect(() => {
  //   // Fetch the current day from the system's date
  //   const currentDate = new Date();
  //   const dayOfMonth = currentDate.getDate();
  //   setCurrentDay(dayOfMonth);
  // }, []);

  useEffect(() => {
    // Set the start date as March 11, 2024
    const startDate = new Date("2024-03-11");

    // Fetch the current date
    const currentDate = new Date();

    // Calculate the difference in days
    const differenceInDays = Math.floor(
      (currentDate - startDate) / (1000 * 60 * 60 * 24)
    );

    // Set the current day, limit it to the next thirty days
    setCurrentDay(
      Math.min(currentDate <= startDate || differenceInDays + 1, 30)
    );
  }, []);
  const buttonClick = (day) => {
    localStorage.setItem("thisDay", JSON.stringify(day));
    navigate("/quiz-page");
  };
  return (
    <>
      <Navbar />
      <main className="font-custom2 bg-mainbg w-full h-screen p-2">
        <img
          src={arrow}
          onClick={() => navigate("/")}
          className="w-[24px] cursor-pointer mt-5 mb-10 mx-3"
          alt="back"
        />
        <div className="text-whiteish mx-3 ">
          <p className="text-xl  font-semibold mb-2 font-custom">Salam </p>
          <p>
            Click on the buttons below to explore questions for each day of
            Ramadan. The current day's button is clickable and has a different
            background color. Navigate using the back arrow to revisit previous
            days.
          </p>
        </div>
        <div className="w-[98%] py-10 mx-auto shadow-md rounded-[16px] p-2 h-[50vh] grid grid-cols-7 gap-1 mt-[25px] bg-[#fff]">
          {/* Buttons for each day */}
          {[...Array(30).keys()].map((day) => (
            <button
              className={`${
                day + 1 <= currentDay
                  ? "bg-mainbg text-whiteish text-center h-[6vh] font-semibold  text-[20px] rounded-[8px] cursor-pointer hover:bg-secondary"
                  : "bg-[#D9D9D9] text-black text-center h-[6vh] font-semibold  text-[20px] rounded-[8px] cursor-not-allowed  hover:bg-secondary"
              }`}
              key={`day-${day + 1}`}
              onClick={() => buttonClick(day + 1)}
              disabled={day + 1 > currentDay}
            >
              <h1> {day + 1}</h1>
            </button>
          ))}
        </div>
      </main>
    </>
  );
};

export default QuizHome;
