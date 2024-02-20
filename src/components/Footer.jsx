import React from "react";
import moon from "../assets//moon.svg";
import linkedln from "../assets/link.svg";
import twitter from "../assets/twitter.svg";
import ig from "../assets/instagram.svg";
import mail from "../assets/mail.svg";
import mssn from "../../public/mssn.jpg";

import phone from "../assets/phone.svg";
import facebook from "../assets/facebook.svg";
const Footer = () => {
  return (
    <footer className="bg-mainbg py-10 text-center">
      <section className="bg-whiteish text-black md:w-[90%] w-[95%] py-1 rounded-lg   mx-auto">
        <div className="flex justify-between px-5 my-3 border-[#D9D9D9] border-b-[2px]  ">
          <div className="my-3 flex">
            <div>
              <img className="w-[30%] mx-auto" src={moon} alt="moon" />
              <h1 className="text-center font-custom text-secondary my-1">
                Hallaly
              </h1>
            </div>
            <div>
              <img className="w-[10%]" src={mssn} alt="MSSN" />
            </div>
          </div>
          <div>
            <p className="text-secondary my-1">contact</p>
            <div className="flex gap-2">
              <img src={mail} alt="mail" />
              <span>hassanaabdll1@gmail.com</span>
            </div>
            <div className="flex gap-2">
              <img src={phone} alt="phone" />
              <span>+91-8600011431</span>
            </div>
          </div>
        </div>
        {/* <hr className="text-[#D9D9D9]  py-[3px]" /> */}
        <div className="md:flex justify-between text-left mx-10">
          <p className="md:w-[40%]">
            Enlighten Your Ramadan Journey “Elevate Your Knowledge with our
            inspiring Ramadan Quiz”
          </p>
          <div className="flex gap-2 my-5 justify-center">
            <a href="">
              {" "}
              <img src={linkedln} alt="" />
            </a>

            <a href="">
              {" "}
              <img src={twitter} alt="" />
            </a>
            <a href="https://www.instagram.com/mssnfoc.buk?igsh=MWk1aHpmbTk2ZTBOeA">
              <img src={ig} alt="" />
            </a>
          </div>
        </div>
        <span className="font-custom text-center">
          © Copyright 2024, Hallaly
        </span>
      </section>
    </footer>
  );
};

export default Footer;
