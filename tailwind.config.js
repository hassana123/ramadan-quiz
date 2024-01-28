/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Irish Grover", "system-ui"],
        custom2: ["Montserrat", "sans-serif"],
        custom3: ["Inter", "sans-serif"],
      },
    },
    colors: {
      mainbg: "var(--background-color)",
      secondary: "var(--secondary-color)",
      primary: "var(--primary-color)",
      highlight: "var( --highlight-color)",
      redish: "var( --redish)",
      black: "var( --black)",
      whiteish: "var(--white)",
      opaquebg: "var(--opaque-bg)",
    },
  },
  plugins: [],
};
