/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'], // Define a fonte Inter como padrão para sans-serif
      },
      colors: {
        'btn-filter': '#32475B',
        'btn-filter-dark': '#2b3946',
        'btn-new': '#3FB27F',
        'btn-green-new': '44C38B'
      }
    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
