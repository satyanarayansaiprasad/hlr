/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#003d9b",
        "primary-container": "#0052cc",
        secondary: "#006e1c",
        "secondary-container": "#91f78e",
        surface: "#f8f9fa",
        "surface-container": "#edeeef",
        "on-surface": "#191c1d",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
}
