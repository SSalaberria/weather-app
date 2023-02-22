/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,ts,tsx}", "./index.html"],
  theme: {
    fontSize: {
      xxs: ["10px", { lineHeight: "120%", letterSpacing: "0.03em" }],
      xs: ["12px", { lineHeight: "120%", letterSpacing: "0.03em" }],
      s: ["14px", { lineHeight: "120%", letterSpacing: "0.03em" }],
      m: ["16px", { lineHeight: "120%", letterSpacing: "0.03em" }],
      l: ["18px", { lineHeight: "120%", letterSpacing: "0.03em" }],
      xl: ["20px", { lineHeight: "120%", letterSpacing: "0.03em" }],
      xxl: ["24px", { lineHeight: "120%", letterSpacing: "0.03em" }],
    },
    extend: {
      colors: {
        blue: {
          600: "#2F90FF",
          500: "#00BCFF",
          400: "#5AB9F3",
          300: "#7EB9C5",
          200: "#B2D7DE",
          100: "#D0F3FF",
        },
        gray: {
          900: "#29292C",
          800: "#333333",
          400: "#A0A7BA",
          300: "#CDD2DE",
          200: "#CBD6E7",
          100: "#E9E9EA",
          0: "#F4F4F4",
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
