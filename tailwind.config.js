/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'pin-red': 'url(/pin-red.svg)',
      },
      colors: {
        gray: {
          600: '#4D4D4D',
        },
        blue: {
          600: '#0082FC',
        },
      },
    },
  },
  plugins: [],
}
