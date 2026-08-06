// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all TSX files inside src/ and src/components/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};