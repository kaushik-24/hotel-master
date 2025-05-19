/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: 'Poppins',
        nanum: 'Nanum Myeongjo'
      },
      backgroundImage: {
        'split-gradient': 'linear-gradient(to right, #4f2f1f 40%, #4f2f1f 40%, #5b3421 60%, #5b3421 60%)',
        'split-gradient-bottom': 'linear-gradient(to bottom, #4f2f1f 50%, #4f2f1f 50%, #5b3421 50%, #5b3421 50%)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(40px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 2s ease-out forwards',
      },
    },
  },
  plugins: [],
}