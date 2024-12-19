/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        'customShadow':`-3px 5px 3px gray`
      },
      colors:{
        'secondary':'#213555',
        'primary':'#D1D5DB'
      }
    },
  },
  plugins: [],
}