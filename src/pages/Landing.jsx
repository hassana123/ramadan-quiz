import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Navbar from "../components/Navbar";
import Hadiths from "../components/Hadiths";
import TopFive from "../components/TopFive";
import Extras from "../components/Extras";
import Footer from "../components/Footer";
//import SplashScreen from "../components/SplashScreen";
const Landing = () => {
  return (
    <main className="bg-whiteish font-custom2">
      <Navbar />
      <Hero />
      <Features />
      <Hadiths />
      <TopFive />
      <Extras />
      <Footer />
    </main>
  );
};

export default Landing;
