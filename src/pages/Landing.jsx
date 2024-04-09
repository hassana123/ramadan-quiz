import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Navbar from "../components/Navbar";
import Hadiths from "../components/Hadiths";
import TopFive from "../components/TopFive";
import Extras from "../components/Extras";
import Footer from "../components/Footer";
import Confetti from "react-dom-confetti";
import ReactConfetti from "react-confetti";
const Landing = () => {
  //const [showEidAnimation, setShowEidAnimation] = useState(true);
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const showAnimation = () => {
    setDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    // Hide the Eid animation after 5 seconds
    window.addEventListener("resize", showAnimation());

    return () => {
      window.removeEventListener("resize", showAnimation);
    };
  }, [dimension]);

  return (
    <main className="bg-whiteish font-custom2 relative">
      <Navbar />
      <div className=" ">
        <ReactConfetti
          width={dimension.width}
          height={dimension.height}
        ></ReactConfetti>
      </div>
      <Hero />
      <Features />
      <Hadiths />
      <TopFive />
      <Extras />
      <Footer />
      {/* End of Eid Mubarak animation */}
    </main>
  );
};

export default Landing;
