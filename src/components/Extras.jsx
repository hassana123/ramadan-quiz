import React from "react";
import { NavLink } from "react-router-dom";
const Extras = () => {
  return (
    <section className="mb-10 text-center py-5 text-black">
      <h1 className="text-[24px] font-bold my-5">How To Make Your Mark</h1>
      <p className="font-semibold text-[14px] md:text-[18px] mb-10 md:w-[80%] w-[96%] mx-auto">
        Ready to ascend the ranks? Dive into our quizzes, challenge yourself,
        and watch your name climb the leaderboard. As every correct answer,
        every quiz mastered, propels you upward . The pursuit of knowledge has
        never been more thrilling – join the competition, earn your place among
        the elite, and revel in the camaraderie of a community united by a
        passion for learning.
      </p>
      <NavLink
        to="/quiz-home"
        className="text-whiteish bg-secondary py-3 px-10 rounded-[18px] hover:border hover:bg-whiteish hover:text-secondary"
      >
        Play Quiz
      </NavLink>
    </section>
  );
};

export default Extras;
