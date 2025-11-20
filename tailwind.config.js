/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: '#0B1120', // Deep Blue
        accent: '#D4AF37',  // Gold
        secondary: '#64748B', // Slate
      },
    },
  },
  plugins: [],
}
