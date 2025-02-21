import React from "react";
import one from "../assets/one.png";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-mainbg px-5 font-custom2 text-center text-whiteish flex justify-center shadow-lg">
      <div className="text-whiteish flex flex-col md:flex-row items-center my-10">
        
        {/* Image Section */}
        <img className="md:w-[40%] lg:w-[60%] w-[25%] md:mr-10 mb-5 md:mb-0" src={one} alt="Ramadan Image" />
    
        {/* Text Content */}
        <div className="text-center">
          <p className="md:text-[36px] text-[22px] my-5 font-custom font-[700] text-secondary">
            🌙 Ramadan Reminder 🌙
          </p>
          <p className="md:text-[24px] text-[18px] font-light leading-relaxed">
            <strong>The Prophet (ﷺ) said:</strong>  
            <br />
            <em>"When Ramadan enters, the gates of Paradise are opened, the gates of Hellfire are closed, and the devils are chained."</em>
            <br />
            <strong>(Sahih Bukhari & Muslim)</strong>
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-5">
            <NavLink
              className="lg:w-[45%] mx-auto w-[70%] md:w-[40%] bg-secondary py-4 text-center shadow-md hover:bg-whiteish hover:text-secondary rounded-[24px] transition duration-300 ease-in-out"
              to="/quiz-home"
            >
              Play Quiz 
            </NavLink>

            <a
              className="lg:w-[45%] mx-auto w-[70%] md:w-[40%] bg-[#3E5C73] py-4 text-center shadow-md hover:bg-whiteish hover:text-[#3E5C73] rounded-[24px] transition duration-300 ease-in-out"
              href="https://hallaly-ramadan-planner.vercel.app/"
            >
              Ramadan Tracker
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
