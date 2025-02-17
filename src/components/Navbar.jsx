import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import moon from "../assets/moon.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between px-10  font-600 py-1 shadow-md border-b border-b-[2px]  bg-mainbg">
      <NavLink to="/" className=" flex items-center gap-2 ">
        <img className="w-[30px] " src={moon} alt="logo" />
        <span className="text-[20px] font-400 font-custom  text-secondary">
          Hallaly
        </span>
      </NavLink>
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
      <div
        className="md:hidden  cursor-pointer z-10  mt-[15px]"
        onClick={toggleMenu}
      >
        <div className="w-8 h-[2px] bg-secondary mb-1"></div>
        <div className="w-7 h-[2px] bg-secondary mb-1"></div>
        <div className="w-6 h-[2px] bg-secondary"></div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-whiteish absolute top-[6%] w-[90%] right-[0%]  z-50 text-secondary text-center mt-2 ">
          <NavLink
            className="block py-2 hover:bg-secondary hover:text-[#fff] mt-20"
            to="/leaderboard"
            onClick={toggleMenu}
          >
            Leader Board
          </NavLink>
          <a
            className="block py-2 hover:bg-secondary hover:text-[#fff] my-5"
            href="/#hadith"
            onClick={toggleMenu}
          >
            Daily Hadith
          </a>
          <NavLink
            className="block py-2 hover:bg-secondary  hover:text-[#fff] my-5"
            to="/quiz-home"
            onClick={toggleMenu}
          >
            Play Quiz
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
