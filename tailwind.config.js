/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        damgray: '#1F212C',
        damlabelgray: '#BCBCC0',
        damlabelgray2: '#B1B1B1',
        damlabelgray3: '#646E82',
        damlabellightgray: '#A1A3AA',
        damdarkgray: '#151823',
        damtranspgray: 'rgba(40, 42, 52, 0.5)',
        damNavGray: 'rgba(255, 255, 255, 0.7)',
        damnavygreen: 'rgba(134, 253, 217, 0.1)',
        dambackgroundgrayed: 'rgba(255, 184, 0, 0.05)',
        dambackgroundgrayedhover: 'rgba(255, 184, 0, 0.1)',
        damyellow: '#F5DB59',
        damlightyellow: '#E6CE82',
        damorange: '#CBA56C',
        damspecialbanner: 'linear-gradient(124.57deg, #4B2BA5 -118.12%, #1F212C 57.01%)'
      }
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      sans: ['Poppins', 'Helvetica', 'Arial', 'sans-serif']
    }
  },
  plugins: []
}
