/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        quick:['Quicksand', "sans-serif"],
        open:['Open Sans', "sans-serif"],
        Dance:['Dancing Script', "cursive"],
      
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
