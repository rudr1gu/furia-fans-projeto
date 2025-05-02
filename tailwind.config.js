/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px) scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
        'spin-reverse': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(-360deg)',
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.3s ease-out forwards',
        'spin-reverse': 'spin-reverse 1s linear infinite',
      },
    }
  },
  darkMode: 'class',
  plugins: [],
}
