import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Hero from "./Hero";

/* ─── CSS Animations ────────────────────────────────────────────────── */
const STYLES = `
  @keyframes iwd-fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes iwd-shimmer {
    0%,100% { opacity: 0.65; }
    50%      { opacity: 1;    }
  }
  @keyframes iwd-float {
    0%,100% { transform: translateY(0px);  }
    50%      { transform: translateY(-9px); }
  }
  @keyframes iwd-twinkle {
    0%,100% { opacity: 0.15; transform: scale(1);   }
    50%      { opacity: 0.9;  transform: scale(1.5); }
  }
  @keyframes iwd-glow-pulse {
    0%,100% { box-shadow: 0 0 20px rgba(184,145,48,0.25), inset 0 0 20px rgba(184,145,48,0.05); }
    50%      { box-shadow: 0 0 40px rgba(184,145,48,0.50), inset 0 0 30px rgba(184,145,48,0.10); }
  }
  @keyframes iwd-card-in {
    from { opacity: 0; transform: scale(0.85) translateY(12px); }
    to   { opacity: 1; transform: scale(1)    translateY(0);    }
  }
  @keyframes iwd-rotate-ring {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
  }
  @keyframes iwd-counter-ring {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(-360deg); }
  }
  .iwd-fadeUp       { animation: iwd-fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards; opacity:0; }
  .iwd-float        { animation: iwd-float 5s ease-in-out infinite; }
  .iwd-shimmer      { animation: iwd-shimmer 2.8s ease-in-out infinite; }
  .iwd-glow         { animation: iwd-glow-pulse 3s ease-in-out infinite; }
  .iwd-rotate-ring  { animation: iwd-rotate-ring 35s linear infinite; transform-origin: center; }
  .iwd-counter-ring { animation: iwd-counter-ring 25s linear infinite; transform-origin: center; }
`;

/* ─── Star Field ────────────────────────────────────────────────────── */
const Stars = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    style={{ zIndex: 0 }}
    aria-hidden="true"
  >
    {Array.from({ length: 65 }).map((_, i) => {
      const x = `${(i * 1.55 + Math.sin(i) * 4) % 100}%`;
      const y = `${(i * 1.73 + Math.cos(i) * 3) % 100}%`;
      const r = i % 4 === 0 ? 1.6 : i % 6 === 0 ? 1.1 : 0.7;
      return (
        <circle
          key={i} cx={x} cy={y} r={r} fill="#b89130"
          style={{
            animation: `iwd-twinkle ${1.8 + (i % 4) * 0.5}s ease-in-out infinite`,
            animationDelay: `${(i * 0.13) % 3.5}s`,
          }}
        />
      );
    })}
  </svg>
);

/* ─── Islamic Crescent + Mandala ────────────────────────────────────── */
const CrescentMandala = () => (
  <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Outer rotating ring of dots */}
    <g className="iwd-rotate-ring">
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * 15) * Math.PI / 180;
        return (
          <circle key={i}
            cx={150 + 138 * Math.cos(a)} cy={150 + 138 * Math.sin(a)}
            r={i % 3 === 0 ? 2.8 : 1.4}
            fill="#b89130" opacity={i % 3 === 0 ? 0.6 : 0.25}
          />
        );
      })}
    </g>

    {/* Middle counter-rotating ring */}
    <g className="iwd-counter-ring">
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i * 22.5) * Math.PI / 180;
        return (
          <circle key={i}
            cx={150 + 112 * Math.cos(a)} cy={150 + 112 * Math.sin(a)}
            r="1.8" fill="#b89130" opacity="0.3"
          />
        );
      })}
      {Array.from({ length: 16 }).map((_, i) => {
        const a1 = (i * 22.5) * Math.PI / 180;
        const a2 = ((i + 1) * 22.5) * Math.PI / 180;
        return (
          <line key={i}
            x1={150 + 112 * Math.cos(a1)} y1={150 + 112 * Math.sin(a1)}
            x2={150 + 112 * Math.cos(a2)} y2={150 + 112 * Math.sin(a2)}
            stroke="#b89130" strokeWidth="0.5" opacity="0.18"
          />
        );
      })}
    </g>

    {/* Static inner mandala spokes */}
    {Array.from({ length: 8 }).map((_, i) => {
      const a = (i * 45) * Math.PI / 180;
      return (
        <line key={i} x1="150" y1="150"
          x2={150 + 82 * Math.cos(a)} y2={150 + 82 * Math.sin(a)}
          stroke="#b89130" strokeWidth="0.7" opacity="0.2"
        />
      );
    })}
    {Array.from({ length: 8 }).map((_, i) => {
      const a = ((i * 45) + 22.5) * Math.PI / 180;
      return (
        <line key={i} x1="150" y1="150"
          x2={150 + 82 * Math.cos(a)} y2={150 + 82 * Math.sin(a)}
          stroke="#b89130" strokeWidth="0.4" opacity="0.12"
        />
      );
    })}

    {/* Soft glow behind moon */}
    <circle cx="150" cy="138" r="72" fill="#b89130" opacity="0.06" />
    <circle cx="150" cy="138" r="58" fill="#b89130" opacity="0.05" />

    {/* Main crescent */}
    <circle cx="150" cy="138" r="56" fill="#b89130" opacity="0.28" />
    <circle cx="172" cy="130" r="47" fill="#0d1f0d" />

    {/* Crescent bright edge */}
    <path
      d="M 150 82 A 56 56 0 1 1 106 176 A 47 47 0 1 0 150 82 Z"
      fill="#b89130" opacity="0.7"
    />

    {/* Star inside crescent */}
    <path
      d="M 127 138 L 130 128 L 133 138 L 143 138 L 135 144 L 138 154 L 130 148 L 122 154 L 125 144 L 117 138 Z"
      fill="#b89130" opacity="0.9"
    />

    {/* Orbiting stars */}
    {[
      { cx: 105, cy: 88,  r: 3.5, d: "0s"   },
      { cx: 210, cy: 95,  r: 2.2, d: "0.4s" },
      { cx: 228, cy: 140, r: 1.8, d: "0.8s" },
      { cx: 195, cy: 72,  r: 2,   d: "0.2s" },
      { cx: 140, cy: 72,  r: 1.5, d: "1.2s" },
      { cx: 90,  cy: 152, r: 1.8, d: "0.6s" },
      { cx: 88,  cy: 115, r: 1.4, d: "1s"   },
      { cx: 222, cy: 178, r: 1.4, d: "1.4s" },
    ].map((s, i) => (
      <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#f0d080"
        style={{ animation: `iwd-twinkle ${2 + i * 0.3}s ease-in-out infinite`, animationDelay: s.d }}
      />
    ))}

    {/* Decorative corner diamonds */}
    {[[10, 10], [290, 10], [10, 290], [290, 290]].map(([cx, cy], i) => (
      <path key={i}
        d={`M${cx} ${cy-5} L${cx+4} ${cy} L${cx} ${cy+5} L${cx-4} ${cy} Z`}
        fill="#b89130" opacity="0.3"
      />
    ))}
  </svg>
);

/* ─── Women data ────────────────────────────────────────────────────── */
const WOMEN = [
  { name: "Khadijah RA",  title: "First Muslim & Believer",          emoji: "💛" },
  { name: "Aisha RA",     title: "Greatest Female Scholar",          emoji: "📖" },
  { name: "Fatimah RA",   title: "Leader of Women of Paradise",      emoji: "🌹" },
  { name: "Maryam AS",    title: "Chosen Above All Women",           emoji: "✨" },
  { name: "Asiya RA",     title: "Chose Allah Over a Kingdom",       emoji: "👑" },
  { name: "Sumayyah RA",  title: "First Martyr in Islam",            emoji: "🕊️" },
  { name: "Hajar AS",     title: "Her Steps Became a Rite of Hajj",  emoji: "🌊" },
  { name: "Nusaybah RA",  title: "Shielded the Prophet ﷺ in Battle", emoji: "⚔️" },
];

/* ─── Main Component ────────────────────────────────────────────────── */
const IWDHero = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const now = new Date();
    setShow(now.getMonth() === 2 && now.getDate() === 8);
  }, []);

  if (!show) return <Hero />;

  return (
    <>
      <style>{STYLES}</style>
      <section
        style={{
          background: "linear-gradient(150deg, #071407 0%, #0d1f0d 35%, #152515 65%, #0a180a 100%)",
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "clamp(48px, 8vh, 80px)",
          paddingBottom: "clamp(48px, 8vh, 80px)",
          paddingLeft: "clamp(16px, 4vw, 48px)",
          paddingRight: "clamp(16px, 4vw, 48px)",
        }}
      >
        {/* Background radial glow */}
        <div style={{
          position: "absolute", top: "40%", left: "55%",
          transform: "translate(-50%, -50%)",
          width: "min(800px, 130vw)", height: "min(800px, 130vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(97,130,100,0.14) 0%, rgba(184,145,48,0.04) 45%, transparent 70%)",
          zIndex: 0, pointerEvents: "none",
        }} />

        <Stars />

        {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "1120px" }}>

          {/* IWD Badge */}
          <div className="iwd-fadeUp" style={{ animationDelay: "0s", textAlign: "center", marginBottom: "clamp(20px, 4vh, 36px)" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              border: "1px solid rgba(184,145,48,0.45)",
              color: "#c9a840",
              fontSize: "10.5px",
              fontFamily: "Montserrat, sans-serif",
              letterSpacing: "0.22em",
              padding: "7px 20px",
              borderRadius: "999px",
              backgroundColor: "rgba(184,145,48,0.08)",
              fontWeight: 700,
              textTransform: "uppercase",
            }}>
              🌸 International Women's Day &nbsp;·&nbsp; 8 March 2025 &nbsp;·&nbsp; Ramadan Night 19 🌸
            </span>
          </div>

          {/* Two-column layout */}
          <div style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "clamp(24px, 5vw, 64px)",
            justifyContent: "center",
          }}>

            {/* ── LEFT ── */}
            <div style={{ flex: "1 1 320px", maxWidth: "500px" }}>

              {/* Title */}
              <h1
                className="iwd-fadeUp font-custom"
                style={{
                  animationDelay: "0.15s",
                  fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
                  lineHeight: 1.12,
                  color: "#b89130",
                  textShadow: "0 0 50px rgba(184,145,48,0.45)",
                  marginBottom: "0.75rem",
                }}
              >
                Honouring the<br />
                <span style={{ color: "#f0e0a0", textShadow: "0 0 30px rgba(240,224,160,0.35)" }}>
                  Women of Islam
                </span>
              </h1>

              {/* Sub */}
              <p
                className="iwd-fadeUp"
                style={{
                  animationDelay: "0.28s",
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "clamp(0.82rem, 1.8vw, 0.98rem)",
                  fontFamily: "Montserrat, sans-serif",
                  lineHeight: 1.75,
                  marginBottom: "1.75rem",
                  maxWidth: "440px",
                }}
              >
                From the first Muslim to the first martyr — Islam honoured women
                1,400 years before the world caught up. Today's 15 special questions
                are dedicated entirely to their extraordinary legacy.
              </p>

              {/* Verse card */}
              <div
                className="iwd-fadeUp iwd-glow"
                style={{
                  animationDelay: "0.42s",
                  backgroundColor: "rgba(97,130,100,0.12)",
                  border: "1px solid rgba(184,145,48,0.3)",
                  borderRadius: "18px",
                  padding: "20px 24px",
                  marginBottom: "1.75rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Subtle inner glow stripe */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: "linear-gradient(to right, transparent, rgba(184,145,48,0.6), transparent)",
                }} />
                <p style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "clamp(0.8rem, 1.6vw, 0.93rem)",
                  fontStyle: "italic",
                  fontFamily: "Montserrat, sans-serif",
                  lineHeight: 1.8,
                  marginBottom: "10px",
                }}>
                  "Indeed, I will never allow the deeds of any of you to be lost,
                  whether male or female — you are of one another."
                </p>
                <p style={{
                  color: "#b89130",
                  fontSize: "11px",
                  fontWeight: 700,
                  fontFamily: "Montserrat, sans-serif",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}>
                  — Surah Al-Imran · 3:195
                </p>
              </div>

              {/* Shimmer label */}
              <p
                className="iwd-fadeUp iwd-shimmer"
                style={{
                  animationDelay: "0.55s",
                  color: "rgba(184,145,48,0.75)",
                  fontSize: "11.5px",
                  fontFamily: "Montserrat, sans-serif",
                  letterSpacing: "0.1em",
                  marginBottom: "1.75rem",
                  textAlign: "center",
                }}
              >
                ✦ 15 Special Questions · Quran · Hadith · Seerah ✦
              </p>

              {/* Buttons */}
              <div
                className="iwd-fadeUp"
                style={{
                  animationDelay: "0.65s",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  justifyContent: "center",
                }}
              >
                <NavLink
                  to="/quiz-home"
                  style={{
                    background: "linear-gradient(135deg, #c9a840 0%, #b89130 50%, #9a7a28 100%)",
                    color: "#0d1f0d",
                    padding: "14px 32px",
                    borderRadius: "999px",
                    fontWeight: 700,
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    display: "inline-block",
                    letterSpacing: "0.04em",
                    boxShadow: "0 6px 28px rgba(184,145,48,0.45)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 10px 36px rgba(184,145,48,0.6)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 6px 28px rgba(184,145,48,0.45)";
                  }}
                >
                  🌸 Play Today's Special Quiz
                </NavLink>

                <a
                  href="https://hallaly-ramadan-planner.vercel.app/"
                  style={{
                    backgroundColor: "rgba(62,92,115,0.5)",
                    border: "1px solid rgba(62,92,115,0.9)",
                    color: "rgba(255,255,255,0.85)",
                    padding: "14px 28px",
                    borderRadius: "999px",
                    fontWeight: 600,
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.88rem",
                    textDecoration: "none",
                    display: "inline-block",
                    letterSpacing: "0.03em",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(62,92,115,0.85)"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "rgba(62,92,115,0.5)"}
                >
                  Ramadan Tracker
                </a>
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div style={{
              flex: "1 1 280px",
              maxWidth: "420px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
            }}>
              {/* Mandala */}
              <div
                className="iwd-fadeUp iwd-float"
                style={{
                  animationDelay: "0.2s",
                  width: "clamp(180px, 32vw, 250px)",
                  height: "clamp(180px, 32vw, 250px)",
                  flexShrink: 0,
                }}
              >
                <CrescentMandala />
              </div>

              {/* Women cards */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "9px",
                width: "100%",
              }}>
                {WOMEN.map((w, i) => (
                  <div
                    key={w.name}
                    style={{
                      backgroundColor: "rgba(97,130,100,0.13)",
                      border: "1px solid rgba(184,145,48,0.22)",
                      borderRadius: "12px",
                      padding: "10px 11px",
                      animation: `iwd-card-in 0.55s cubic-bezier(0.16,1,0.3,1) forwards`,
                      animationDelay: `${0.55 + i * 0.07}s`,
                      opacity: 0,
                      transition: "background-color 0.2s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(97,130,100,0.25)"}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = "rgba(97,130,100,0.13)"}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
                      <span style={{ fontSize: "13px", lineHeight: 1 }}>{w.emoji}</span>
                      <span style={{
                        color: "#e8d5a3",
                        fontSize: "11.5px",
                        fontWeight: 700,
                        fontFamily: "Montserrat, sans-serif",
                        lineHeight: 1.2,
                      }}>
                        {w.name}
                      </span>
                    </div>
                    <p style={{
                      color: "rgba(255,255,255,0.42)",
                      fontSize: "9.5px",
                      fontFamily: "Montserrat, sans-serif",
                      lineHeight: 1.45,
                      margin: 0,
                    }}>
                      {w.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "90px",
          background: "linear-gradient(to bottom, transparent, rgba(7,20,7,0.7))",
          pointerEvents: "none", zIndex: 1,
        }} />
      </section>
    </>
  );
};

export default IWDHero;