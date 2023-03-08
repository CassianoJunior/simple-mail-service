const { transform } = require('typescript');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      keyframes: {
        contentShow: {
          '0%': {
            opacity: 0,
            transform: 'translate(-1/2,_-1/2)',
            transform: 'scale-[0.96]',
          },
          '100%': {
            opacity: 1,
            transform: 'translate(-1/2,_-1/2)',
            transform: 'scale-100',
          },
        },
        overlayShow: {
          '0%': {
            opacity: 0,
          },
          '100% ': {
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
