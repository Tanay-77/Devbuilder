/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        retro: {
          yellow: '#FFDE59',
          black: '#111111',
          white: '#FDFBF7',
          gray: '#E6E6E6',
        }
      },
      boxShadow: {
        'hard': '4px 4px 0px 0px #000000',
        'hard-sm': '2px 2px 0px 0px #000000',
        'hard-lg': '6px 6px 0px 0px #000000',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'none': '0px',
        'sm': '2px',
        'DEFAULT': '4px',
        'md': '6px',
        'lg': '8px',
      }
    },
  },
  plugins: [],
};
