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
      gray: {
        100: "#f7fafc",
        200: "#edf2f7",
        300: "#e2e8f0",
        400: "#cbd5e0",
        500: "#a0aec0",
        600: "#718096",
        700: "#4a5568",
        800: "#2d3748",
        900: "#1a202c",
      },
      green: {
        100: "#d4edda",
        200: "#a8e6a3",
        300: "#77dd77",
        400: "#5cb85c",
        500: "#3d9970",
        600: "#2c662d",
      },
    },

  },
  plugins: [],
};
