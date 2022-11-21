/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {

    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        blue: {
          200: '#547DE6',
          400: '#0A69C0',
          800: '#30398E',
          900: '#040721',
        },
        indigo: {
          200: '#7184EA',
          300: '#2F5AC7',
          400: '#478AD8',
          500: '#8772F3',
          600: '#547DE5',
          600: '#6B7EC2',
        },
        gray: {
          100: '#616161',
          200: '#FBF8F8',
          300: '#D9D9D9',
          400: '#B0A8A8',
          500: '#8D8686',
          600: '#393737',
          700: '#424242',
        },
        green: {
          500: '#08A358',
        },
        red: {
          200: '#D0103F',
          500: '#EB1B2E',
        }
      },


    screens: {
      'mobile': {'min': '300px', 'max': '640px'},
      
    },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
