/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        background_color : "#E4E0E1",
        primary_color : "#4B352A",
        secondary_color : "#D6C0B3",
        tertiary_color : "#FFD700",
        text_default_color : "#5E503F",
        text_heading_color : "#5E503F",
      }
    },
  },
  plugins: [],
}