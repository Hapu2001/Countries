/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-dark": "hsl(209, 23%, 22%)",
        "blue-dark-bg": "hsl(207, 26%, 17%)",
        "blue-dark-text": "hsl(200, 15%, 8%)",
        "gray-dark-input": "hsl(0, 0%, 52%)",
        "gray-light-bg": "hsl(0, 0%, 98%)",
      },
      fontFamily: {
        nunitoSans: ["nunino", "sans-serif"],
      },
      boxShadow: {
        primary: "0 0px 10px 4px rgba(0, 0, 0, 0.08)",
        secondary: "0 0px 10px 4px rgba(0, 0, 0, 0.2)",
      },
      screens: {
        md: { min: "640px", max: "1330px" },
        sm: { max: "640px" },
      },
      animation: {
        spin: "wiggle 1s ease-in-out infinite",
        "spin-slow": "spin 4s linear infinite",
      },
    },
  },
  plugins: [],
};
