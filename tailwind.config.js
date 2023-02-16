/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        rosepine: {
          primary: "#c4a7e7",
          secondary: "#ebbcba",
          accent: "#f6c177",
          neutral: "#191724",
          "base-100": "#1f1d2e",
          info: "#31748f",
          success: "#9ccfd8",
          warning: "#f6c177",
          error: "#eb6f92",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
}
