/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: { sm: "330px", md: "600px", lg: "1200px" },
    fontFamily: {
      raleway: "Raleway, sans-serif",
    },
    listStyleType: {
      square: "square",
      disc: "disc",
    },
    extend: {
      colors: {
        //Blues
        darkestBlue: "rgba(12, 17, 28, 1)",
        blue900: "rgba(17, 23, 37, 1)",
        blue800: "rgba(23, 36, 72, 1)",
        blue700: "rgba(29, 46, 97, 1)",
        blue600: "rgba(36, 57, 116, 1)",
        blue500: "rgba(45, 68, 132, 1)",
        blue400: "rgba(55, 80, 152, 1)",
        blue300: "rgba(64, 94, 178, 1)",
        blue200: "rgba(61, 99, 221, 1)",
        blue150: "rgba(63, 92, 176, 1)",
        blue100: "rgba(147, 180, 255, 1)",
        blue50: "rgba(213, 226, 255, 1)",

        //Electric Blues
        darkestElectricBlue: "rgba(0, 18, 251, 0.05)",
        electricBlue900: "rgba(17, 86, 249, 0.09)",
        electricBlue800: "rgba(43, 100, 255, 0.23)",
        electricBlue700: "rgba(53, 103, 255, 0.34)",
        electricBlue600: "rgba(63, 113, 253, 0.42)",
        electricBlue500: "rgba(75, 122, 253, 0.49)",
        electricBlue400: "rgba(84, 128, 255, 0.57)",
        electricBlue300: "rgba(87, 131, 255, 0.68)",
        electricBlue200: "rgba(69, 113, 255, 0.86)",
        electricBlue150: "rgba(85, 128, 254, 0.67)",
        electricBlue100: "rgba(147, 180, 255, 1)",
        electricBlue50: "rgba(213, 226, 255, 1)",

        //Blacks
        charcoalBlack: "rgba(17, 17, 19, 1)",
        black900: "rgba(25, 25, 27, 1)",
        black800: "rgba(34, 35, 37, 1)",
        black700: "rgba(41, 42, 46, 1)",
        black600: "rgba(48, 49, 54, 1)",
        black500: "rgba(57, 58, 64, 1)",
        black400: "rgba(70, 72, 79, 1)",
        black300: "rgba(95, 96, 106, 1)",
        black200: "rgba(108, 110, 121, 1)",
        black150: "rgba(121, 123, 134, 1)",
        black100: "rgba(178, 179, 189, 1)",
        black50: "rgba(238, 238, 240, 1)",

        //Midnight Blues
        darkestMidnightBlue: "rgba(17, 17, 187, 0.01)",
        midnightBlue900: "rgba(203, 203, 249, 0.04)",
        midnightBlue800: "rgba(214, 226, 249, 0.09)",
        midnightBlue700: "rgba(209, 217, 249, 0.13)",
        midnightBlue600: "rgba(215, 221, 253, 0.16)",
        midnightBlue500: "rgba(217, 222, 252, 0.2)",
        midnightBlue400: "rgba(218, 226, 253, 0.26)",
        midnightBlue300: "rgba(224, 227, 253, 0.38)",
        midnightBlue200: "rgba(224, 228, 253, 0.44)",
        midnightBlue150: "rgba(227, 231, 253, 0.49)",
        midnightBlue100: "rgba(239, 240, 254, 0.73)",
        midnightBlue50: "rgba(253, 253, 255, 0.94)",

        //Error colors
        errorRed: "#E54D51",
      },
    },
  },
  plugins: [],
};
