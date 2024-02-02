/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#b9d5de',
        secondaryBlue: '#00263e',
        textoNota: '#a9b1c5',
        green: '#a8d5ba',
        footer: '#002339'
      },
    },
  },
  plugins: [],
}
