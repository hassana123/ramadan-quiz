import React from "react";
import { NavLink } from "react-router-dom";
import moon from "../assets/moon.svg";

const Navbar = () => {
  return (
    <nav className="flex justify-around font-600 py-1 shadow-md border-b border-b-[2px]  bg-mainbg">
      <div className=" ">
        <img className="w-[20px] " src={moon} alt="logo" />
        <span className="text-[14px] font-400 font-custom  text-secondary">
          Hallaly
        </span>
      </div>
      <div className="hidden  my-3 md:block font-custom2 ">
        <NavLink className="mx-4 hover:text-secondary" to="/leaderboard">
          Leader Board
        </NavLink>

        <a className=" hover:text-secondary mx-4" href="/#hadith">
          Daily Hadith
        </a>

        <NavLink
          className="bg-secondary  hover:bg-whiteish hover:text-secondary py-2 my-1 px-7 mx-5 rounded-[24px] "
          to="/quiz-home"
        >
          Play Quiz
        </NavLink>
      </div>
      <div className="md:hidden cursor-pointer mt-2">
        <div className="w-8 h-[2px] bg-whiteish mb-1"></div>
        <div className="w-7 h-[2px] bg-whiteish mb-1"></div>
        <div className="w-6 h-[2px] bg-whiteish"></div>
      </div>
    </nav>
  );
};

export default Navbar;
