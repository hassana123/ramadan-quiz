import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const IWDBanner = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const now = new Date();
    const isIWD = now.getMonth() === 2 && now.getDate() === 8; // March 8 only
    if (isIWD) setVisible(true);
  }, []);

  if (!visible || dismissed) return null;

  const women = [
    "Khadijah RA",
    "Aisha RA",
    "Fatimah RA",
    "Maryam AS",
    "Asiya RA",
    "Sumayyah RA",
    "Hajar AS",
    "Nusaybah RA",
  ];

  return (
    <div className="relative w-full font-custom2">
      {/* Top accent stripe */}
      <div
        style={{ background: "linear-gradient(to right, #b89130, #d4aa50, #b89130)" }}
        className="h-1 w-full"
      />

      <div
        style={{ backgroundColor: "#1a2e1a" }}
        className="relative overflow-hidden px-5 py-8"
      >
        {/* Soft glow blobs using theme green */}
        <div
          style={{ backgroundColor: "#618264", opacity: 0.15 }}
          className="absolute top-[-40px] left-[10%] w-72 h-72 rounded-full blur-3xl pointer-events-none"
        />
        <div
          style={{ backgroundColor: "#b89130", opacity: 0.10 }}
          className="absolute bottom-[-40px] right-[10%] w-72 h-72 rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div
            style={{ borderColor: "#b89130", color: "#b89130" }}
            className="inline-flex items-center gap-2 border text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
            
          >
            <span>🌸</span>
            <span>International Women's Day 2025</span>
            <span>🌸</span>
          </div>

          {/* Headline */}
          <h2
            style={{ color: "#b89130" }}
            className="text-2xl md:text-3xl font-bold font-custom leading-snug mb-2"
          >
            Honouring the Women of Islam
          </h2>

          {/* Sub-headline */}
          <p className="text-whiteish text-sm md:text-base mb-5 max-w-xl mx-auto leading-relaxed opacity-80">
            Today's quiz celebrates the remarkable women who shaped Islamic
            history — the first Muslim, the greatest scholars, warriors, and
            mothers.
          </p>

          {/* Quranic quote box */}
          <div
            style={{ backgroundColor: "rgba(97,130,100,0.15)", borderColor: "rgba(184,145,48,0.3)" }}
            className="inline-block border rounded-2xl px-5 py-4 mb-5 max-w-lg mx-auto"
          >
            <p className="text-whiteish text-sm md:text-base italic leading-relaxed opacity-90">
              "Indeed, I will never allow the deeds of any of you to be lost,
              whether male or female — you are of one another."
            </p>
            <p
              style={{ color: "#b89130" }}
              className="text-xs mt-2 font-semibold tracking-wide"
            >
              — Surah Al-Imran 3:195
            </p>
          </div>

          {/* Women name pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {women.map((name) => (
              <span
                key={name}
                style={{
                  backgroundColor: "rgba(97,130,100,0.25)",
                  borderColor: "rgba(184,145,48,0.35)",
                  color: "#e8d5a3",
                }}
                className="border text-xs px-3 py-1 rounded-full"
              >
                {name}
              </span>
            ))}
          </div>

          {/* Special note */}
          <p
            style={{ color: "#b89130" }}
            className="text-xs tracking-wide mb-5 opacity-80"
          >
            ✨ Today's quiz has 15 special questions in their honour ✨
          </p>

          {/* Play Quiz CTA */}
          <NavLink
            to="/quiz-home"
            style={{ backgroundColor: "#b89130" }}
            className="inline-block px-8 py-3 rounded-[24px] text-black font-semibold text-sm shadow-md hover:opacity-90 transition duration-300 ease-in-out"
          >
            Play Today's Special Quiz 🌸
          </NavLink>
        </div>

        {/* Dismiss */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-4 text-whiteish opacity-40 hover:opacity-80 transition-opacity text-2xl leading-none"
          aria-label="Dismiss banner"
        >
          ×
        </button>
      </div>

      {/* Bottom accent stripe */}
      <div
        style={{ background: "linear-gradient(to right, #b89130, #d4aa50, #b89130)" }}
        className="h-1 w-full"
      />
    </div>
  );
};

export default IWDBanner;