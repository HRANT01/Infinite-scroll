/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-500": "#3b82f6",
      },
      spacing: {
        1: "0.25rem",
      },
    },
  },
  plugins: [],
};
