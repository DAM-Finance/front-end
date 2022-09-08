/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        damgray: '#1F212C',
        damdarkgray: '#151823',
        damtranspgray: 'rgba(40, 42, 52, 0.5)'
      }
    }
  },
  plugins: []
}
