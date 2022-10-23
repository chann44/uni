/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: '#081420',
        secondary: '#212C3A',
        fadedblack: 'black/20',
        text: '#ABAFC7',
        fadded: '#858585',
        blueButton: '#6001D3',
        yellowButton: '#B78E3E',
        blueText: '#7749D7',
        yellowText: '#5585B1',
        pink: '#FD346E',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
    screens: {
      xxs: '240px',
      xs: '270px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px',
    },
  },
  // eslint-disable-next-line import/no-extraneous-dependencies
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // ...
  ],
};
