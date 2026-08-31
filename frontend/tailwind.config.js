// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all TSX files inside src/ and src/components/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};