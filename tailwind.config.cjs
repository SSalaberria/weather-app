/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,ts,tsx}", "./index.html"],
  theme: {
    fontSize: {
      xxs: ["10px", { lineHeight: "120%", letterSpacing: "-0.03em" }],
      xs: ["12px", { lineHeight: "120%", letterSpacing: "-0.03em" }],
      s: ["14px", { lineHeight: "120%", letterSpacing: "-0.03em" }],
      m: ["16px", { lineHeight: "120%", letterSpacing: "-0.03em" }],
      l: ["18px", { lineHeight: "120%", letterSpacing: "-0.03em" }],
      xl: ["20px", { lineHeight: "120%", letterSpacing: "-0.03em" }],
      xxl: ["24px", { lineHeight: "120%", letterSpacing: "-0.03em" }],
    },
    extend: {
      colors: {
        blue: {
          600: "#2F90FF",
          500: "",
          400: "",
          300: "",
          200: "",
          100: "",
        },
        gray: {
          900: "",
          800: "",
          400: "",
          300: "",
          200: "",
        },
        yellow: "#FFD439",
        green: {
          400: "#68E2D3",
          500: "#37E4AA",
        },
        red: "#FD7778",
      },
    },
  },
  plugins: [],
};
