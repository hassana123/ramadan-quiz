import React from "react";
import one from "../assets/one.png";
import { NavLink } from "react-router-dom";
const Hero = () => {
  return (
    <section className="bg-mainbg px-5 font-custom2 text-center text-whiteish flex justify-center shadow-lg">
    <div className="text-whiteish flex flex-col md:flex-row items-center my-10">
      
      {/* Image Section */}
      <img className="md:w-[60%] w-[35%] md:mr-10 mb-5 md:mb-0" src={one} alt="Ramadan Image" />
  
      {/* Text Content */}
      <div className="text-center ">
        <p className="md:text-[36px] text-[22px] my-5 font-custom font-[700] text-secondary">
          🌙 **Ramadan Reminder**🌙
        </p>
        <p className="md:text-[24px] text-[18px] font-light leading-relaxed">
          **The Prophet (ﷺ) said:**  
          *"When Ramadan enters, the gates of Paradise are opened, the gates of Hellfire are closed, and the devils are chained."*  
          **(Sahih Bukhari & Muslim)**
        </p>
  
        {/* Play Quiz Button */}
        <NavLink
          className=" block  lg:w-[30%] w-[70%] md:w-[90%] mx-auto bg-secondary py-5 text-center mt-5  shadow-md hover:bg-whiteish hover:text-secondary rounded-[24px] transition duration-300 ease-in-out"
          to="/quiz-home"
        >
          Play Quiz & Learn More
        </NavLink>
      </div>
    </div>
  </section>
  
  );
};

export default Hero;
