/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "10px",
      xsm: "400px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: "#F5385D",
      },
    },
  },
  plugins: [],
};
