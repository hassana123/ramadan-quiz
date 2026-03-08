import React from "react";
import IWDHero from "../components/IWDHero";
import Features from "../components/Features";
import Hadiths from "../components/Hadiths";
import TopFive from "../components/TopFive";
import Extras from "../components/Extras";
import DeedOfTheDay from "../components/DeedOfTheDay";
import QuranTracker from "../components/Qurantracker";

// IWDHero handles its own date check and falls back to <Hero /> automatically
const Landing = () => {
  return (
    <main className="bg-whiteish font-custom2 relative">
      <IWDHero />
      <QuranTracker />
      <DeedOfTheDay />
      <Features />
      <Hadiths />
      <TopFive />
      <Extras />
    </main>
  );
};

export default Landing;