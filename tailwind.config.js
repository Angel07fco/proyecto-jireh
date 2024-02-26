/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#b9d5de',
        secondaryBlue: '#00263e',
        textoNota: '#a9b1c5',
        verde: '#a8d5ba',
        footer: '#002339',
        alertError: '#fef2f2',
        alertTextError: '#a22e2e',
        alertSuccess: '#f0fdf4',
        alertTextSuccess: '#166534',
        alertAdvertention: '#fefce8',
        alertTextAdvertention: '#ae7827'
      },
    },
  },
  plugins: [],
}