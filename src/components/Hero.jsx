import React from "react";
import one from "../assets/one.png";
import { NavLink } from "react-router-dom";
const Hero = () => {
  return (
    <section className="bg-mainbg px-5 font-custom2 text-center text-whiteish flex justify-center shadow-lg">
      <div className="text-whiteish flex items-center my-10 ">
        <img className="md:w-[60%] w-[35%]" src={one} alt="" />

        <div>
          <p className="md:text-[54px] my-10 font-custom font-[700]  text-secondary">
            EID MUBARK IN ADVANCE{" "}
          </p>
          <NavLink
            className="bg-secondary py-[15px] md:px-[60px] px-[40px] shadow-md hover:bg-whiteish hover:text-secondary rounded-[24px]"
            to="/quiz-home"
          >
            Play Quiz
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Hero;
