/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: { sm: "330px", xmd: "391px", md: "600px", lg: "1200px" },
    fontFamily: {
      spaceGrotesk: "Space Grotesk , sans-serif",
      varela: "Varela, sans-serif",
      tsukimiRounded: "Tsukimi Rounded, sans-serif",
      roboto: "Roboto, sans-serif",
      beVietnamPro: "Be Vietnam Pro, sans-serif",
      figtree: "Figtree, sans-serif",
    },
    listStyleType: {
      square: "square",
      disc: "disc",
    },
    extend: {
      colors: {
        cyan: "#00BCD7",
        blurredCyan: "rgba(0,188,215,0.1)",
        primary: "#49bcdc",
      },
    },
  },
  plugins: [],
};
