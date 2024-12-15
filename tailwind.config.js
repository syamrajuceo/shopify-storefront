/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': 'rgb(240, 240, 240)',
        'custom-black':'rgba(41, 41, 41, 0.63)',
        'custom-rose':'rgba(243,235,235)'
      },
      fontFamily: {
        'noto': ['"Noto Sans"', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
  