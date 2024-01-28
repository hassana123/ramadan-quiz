import React from "react";
import five from "../assets/five.png";
import three from "../assets/three.png";
import four from "../assets/four.png";
const Features = () => {
  return (
    <>
      <h1 className="md:hidden py-5 bg-whiteish text-center text-secondary text-[24px]">
        Key features - Just for you!
      </h1>
      <section className="bg-[#F5F4F4] py-1 text-secondary text-center font-custom2 shadow-lg">
        <div className="md:flex items-center justify-between  w-[90%] mx-auto">
          <div className=" md:block hiddden  w-[65%] nx-auto">
            <h1 className="font-bold text-[24px] my-10 md:block hidden my-5">
              <b>Key features - Just for you!</b>
            </h1>
            <p className="text-[20px] my-5 hidden md:block">
              Interactive Insights
            </p>
            <p className="text-black hidden md:block">
              Dive into a world of knowledge with our interactive quizzes that
              cover a wide spectrum of topics related to Ramadan. From the
              history and significance of this holy month to its cultural and
              spiritual aspects, our quizzes are crafted to provide both
              informative and entertaining experiences.
            </p>
          </div>
          <div>
            <img className="w-[70%] my-10 mx-auto" src={five} alt="" />
            <p className="text-[24px] my-5  md:hidden text-black font-800 font-bold ">
              Interactive Insights
            </p>
            <p className="text-black md:hidden">
              Dive into a world of knowledge with our interactive quizzes that
              cover a wide spectrum of topics related to Ramadan. From the
              history and significance of this holy month to its cultural and
              spiritual aspects, our quizzes are crafted to provide both
              informative and entertaining experiences.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[#F5F4F4] py-10 my-10 text-black text-center font-custom2 shadow-lg">
        <div className="w-[90%] mx-auto md:flex md:justify-between md:items-center">
          <img className="md:w-[30%]  rounded-xl" src={three} alt="" />
          <div className="md:w-[55%] ">
            <h1 className="md:text-secondary text-[24px] my-5">
              Real time leaderboard
            </h1>
            <p>
              Embark on friendly competition! Our real-time leaderboard allows
              you to track your progress, compete with friends, and challenge
              yourself to rise through the ranks. Strive for the top spot and
              celebrate your achievements as you climb the global leaderboard.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[#F5F4F4] py-10 my-10 text-black text-center font-custom2 shadow-lg">
        <div className="w-[90%] mx-auto md:flex md:justify-between md:items-center">
          <img className="md:hidden" src={four} alt="" />
          <div className="md:w-[55%] ">
            <h1 className="md:text-secondary text-[24px] my-5">
              Rich Educational Content
            </h1>
            <p>
              Immerse yourself in a wealth of knowledge with expertly crafted
              questions and detailed explanations. Our app ensures that you not
              only answer questions but also deepen your understanding of the
              rich and diverse aspects of Ramadan.
            </p>
          </div>
          <img
            className="hidden md:block md:w-[30%]  rounded-xl"
            src={four}
            alt=""
          />
        </div>
      </section>
    </>
  );
};

export default Features;
