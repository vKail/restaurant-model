/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
      extend: {
        colors:{
            'science-blue': {
                '50': '#ecfaff',
                '100': '#d4f3ff',
                '200': '#b3ecff',
                '300': '#7fe2ff',
                '400': '#43ceff',
                '500': '#18b0ff',
                '600': '#0090ff',
                '700': '#0077fb',
                '800': '#0364d3',
                '900': '#0a529e',
                '950': '#0c325f',
            },
          },
      },
    
  },
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs")]
  }
