import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Hadiths from "../components/Hadiths";
import TopFive from "../components/TopFive";
import Extras from "../components/Extras";
import DeedOfTheDay from "../components/DeedOfTheDay";
// import Confetti from "react-dom-confetti";
// import ReactConfetti from "react-confetti";
const Landing = () => {
  //const [showEidAnimation, setShowEidAnimation] = useState(true);
  // const [dimension, setDimension] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // });
  // const showAnimation = () => {
  //   setDimension({
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //   });
  // };
  

  return (
    <main className="bg-whiteish font-custom2 relative">
     
      <Hero />
      <DeedOfTheDay/>
      <Features />
      <Hadiths />
      <TopFive />
      <Extras />
      
    </main>
  );
};

export default Landing;
