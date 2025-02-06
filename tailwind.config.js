/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        'gray': '#808080',
        'white': '#ffffff', 
        'gray100': '#f0f0f0',
        'gray200': '#d3d3d3',
        'gray300': '#a9a9a9',
        'gray400': '#696969',
        'gray500': '#555555',
        'red': '#ff0000',
      },
    },
  },
  plugins: [],
}
