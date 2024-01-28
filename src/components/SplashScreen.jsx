import React from "react";
import moon from "../assets/moon.svg";
const SplashScreen = () => {
  return (
    <main className="w-full font-custom flex items-center bg-mainbg justify-center h-screen text-white">
      <div className="">
        <img src={moon} alt="moon" className="m-auto" />
        <h1 className="text-3xl my-5 leading-3 text-center">Hallaly</h1>
      </div>
    </main>
  );
};

export default SplashScreen;
