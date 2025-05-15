/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'game': ['"Press Start 2P"', 'cursive'],
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      dropShadow: {
        'glow': '0 0 10px rgba(234, 88, 12, 0.8)',
      },
    },
  },
  plugins: [],
}