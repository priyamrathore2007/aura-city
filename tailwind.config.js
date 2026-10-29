/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#070b14',
        surface: '#0e1626',
        card: '#131e33',
        cardHover: '#1a2744',
        tealAccent: '#00f2fe',
        cyanGlow: '#4facfe',
        atriumGold: '#d97706',
        atriumWarm: '#fef3c7',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
