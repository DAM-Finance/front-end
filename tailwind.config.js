/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        damgray: '#1F212C',
        damdarkgray: '#151823',
        damtranspgray: 'rgba(40, 42, 52, 0.5)',
        damNavGray: 'rgba(255, 255, 255, 0.7)',
        damnavygreen: 'rgba(134, 253, 217, 0.1)',
        damyellow: '#F5DB59'
      }
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      sans: ['Poppins', 'Helvetica', 'Arial', 'sans-serif']
    }
  },
  plugins: []
}
