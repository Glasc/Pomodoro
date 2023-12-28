/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      
      "forest",
      "lofi",
      "halloween"
    ],
  },

  plugins: [require("daisyui")],
}
