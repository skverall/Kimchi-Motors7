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
        primary: '#FFFFFF', // White background
        secondary: '#F8FAFC', // Slate-50 for sections
        accent: '#D6001C',  // Kimchi Red (Keep accent)
        'kimchi-red': '#D6001C',
        'kimchi-blue': '#004C97',
        'kimchi-black': '#0B1120', // Dark text
        'kimchi-gray': '#64748B', // Slate-500
      },
      backgroundImage: {
        'pattern-firm': "url('/pattern.svg')",
      }
    },
  },
  plugins: [],
}
