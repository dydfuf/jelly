/* eslint-disable @typescript-eslint/no-var-requires */
const spacing = {};
const borderWidth = {};
const borderRadius = {};
const fontSize = {};
const lineHeight = {};

for (let i = 0; i <= 1000; i++) {
  spacing[i] = `${i}px`;
  borderWidth[i] = `${i}px`;
  borderRadius[i] = `${i}px`;
  fontSize[i] = `${i}px`;
  lineHeight[i] = `${i}px`;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          DEFAULT: "#7DF9FF",
        },
        "mint-100": {
          DEFAULT: "#DAF5F0",
        },
        "mint-200": {
          DEFAULT: "#A7DBD8",
        },
        "mint-300": {
          DEFAULT: "#87CEEB",
        },
        "mint-400": {
          DEFAULT: "#69D2E7",
        },
        green: {
          DEFAULT: "#2FFF2F",
        },
        "green-100": {
          DEFAULT: "#B5D2AD",
        },
        "green-200": {
          DEFAULT: "#BAFCA2",
        },
        "green-300": {
          DEFAULT: "#90EE90",
        },
        "green-400": {
          DEFAULT: "#7FBC8C",
        },
        pink: {
          DEFAULT: "#FF00F5",
        },
        "pink-100": {
          DEFAULT: "#FCDFFF",
        },
        "pink-200": {
          DEFAULT: "#FFC0CB",
        },
        "pink-300": {
          DEFAULT: "#FFB2EF",
        },
        "pink-400": {
          DEFAULT: "#FF69B4",
        },
        blue: {
          DEFAULT: "#3300FF",
        },
        yellow: {
          DEFAULT: "#FFFF00",
        },
        "yellow-100": {
          DEFAULT: "#FDFD96",
        },
        "yellow-200": {
          DEFAULT: "#FFDB58",
        },
        "yellow-300": {
          DEFAULT: "#F4D738",
        },
        "yellow-400": {
          DEFAULT: "#E3A018",
        },
        red: {
          DEFAULT: "#FF4911",
        },
        "red-50": {
          DEFAULT: "#FCF2E9",
        },
        "red-100": {
          DEFAULT: "#F8D6B3",
        },
        "red-200": {
          DEFAULT: "#FFA07A",
        },
        "red-300": {
          DEFAULT: "#FF7A5C",
        },
        "red-400": {
          DEFAULT: "#FF6B6B",
        },
        "purple-100": {
          DEFAULT: "#E3DFF2",
        },
        "purple-200": {
          DEFAULT: "#C4A1FF",
        },
        "purple-300": {
          DEFAULT: "#A388EE",
        },
        "purple-400": {
          DEFAULT: "#9723C9",
        },
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      fontFamily: {
        body: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      spacing,
      borderWidth,
      borderRadius,
      fontSize,
      lineHeight,
    },
  },
  plugins: [require("tailwindcss-safe-area")],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
