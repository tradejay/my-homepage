const { theme } = require('./src/styles/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        mobile: '1rem',
        tablet: '2rem',
        desktop: '4rem',
      },
      screens: {
        mobile: '360px',
        tablet: '768px',
        desktop: '1280px',
      },
    },
    extend: {
      colors: theme.colors,
      spacing: theme.spacing,
      screens: theme.breakpoints,
      fontFamily: {
        nanum: ['NanumSquareNeo', 'sans-serif'],
        gmarket: ['GmarketSans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      gridTemplateColumns: {
        'main': 'minmax(0, 1fr) 300px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}
