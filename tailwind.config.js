/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        display: ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: '#000000', // Black background
        secondary: '#1A1A1A', // Dark Gray for cards/sections
        accent: '#D6001C',  // Kimchi Red
        'kimchi-red': '#D6001C',
        'kimchi-blue': '#004C97', // Kimchi Blue
        'kimchi-black': '#000000',
        'kimchi-gray': '#1F1F1F',
      },
      backgroundImage: {
        'pattern-firm': "url('/pattern.svg')", // Placeholder for now, will implement via CSS or SVG
      }
    },
  },
  plugins: [],
}
