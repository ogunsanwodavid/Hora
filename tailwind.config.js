/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: { sm: "330px", xmd: "391px", md: "600px", lg: "1200px" },
    fontFamily: {
      inter: "Inter, sans-serif",
    },
    listStyleType: {
      square: "square",
      disc: "disc",
    },
    extend: {
      colors: {},
    },
  },
  plugins: [],
};
