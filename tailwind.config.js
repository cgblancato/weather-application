/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'sky-background': "url(./Assets/images/bg-sky.jpg)"
      }
    },
  },
  plugins: [],
}