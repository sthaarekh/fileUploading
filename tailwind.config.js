/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    screens: {
      '3xl': '1600px',
      '2xl': '1400px',
      'xl': '1280px',
      'lg': '1024px',
      'md': '768px', 
      'sm': '640px', 
    },
    extend: {},
  },
  plugins: [],
}