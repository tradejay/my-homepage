/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#000',
        'white': '#fff',
        'black100': '#111',
        'black200': '#222',
        'black300': '#333',
        'black400': '#444',
        'black500': '#555',
        'red': '#ff0000',
      },
      fontFamily: {
        'mont': ['Montserrat', 'sans-serif'],
        'nanum': ['nanumSquareNeo', 'sans-serif'],
        'gmarket': ['gmarket', 'sans-serif'],
      },
      zIndex: {
        '9999': '9999',
        '10000': '10000',
        '10001': '10001',
      },
      keyframes: {
        logo: {
          '0%': { transform: 'translateY(-50%) rotate(0deg) scale(1)', opacity: '1' },
          '25%': { transform: 'translateY(-50%) rotate(180deg) scale(0.5)', opacity: '0.5' },
          '50%': { transform: 'translateY(-50%) rotate(360deg) scale(1.2)', opacity: '0.8' },
          '75%': { transform: 'translateY(-50%) rotate(540deg) scale(0.8)', opacity: '0.3' },
          '100%': { transform: 'translateY(-50%) rotate(720deg) scale(1)', opacity: '1' },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
      },
      animation: {
        'logo': 'logo 4s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 0.5s ease-out forwards',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      container: {
        center: true,
        padding: '1rem',
      },
      gridTemplateColumns: {
        '1': 'repeat(1, 1fr)',
        '2': 'repeat(2, 1fr)',
        '3': 'repeat(3, 1fr)',
        '4': 'repeat(4, 1fr)',
        '5': 'repeat(5, 1fr)',
        '6': 'repeat(6, 1fr)',
        'main': '280px 1fr',
        'footer': '200px 1fr 200px'
      },
      gridTemplateRows: {
        'layout': 'auto 1fr auto',
      },
      gap: {
        'grid': '2rem',
      }
    },
  },
  plugins: [],
} 