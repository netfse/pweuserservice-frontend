/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'white-Title': 'rgba(255, 255, 255, 1)',
        'white-Description': 'rgba(255, 255, 255, 0.8)'
      },
      'backgroundImage': {
        'signInBackground': 'url("./images/signin_background.jpg")',
      }
    },
  },
  plugins: [],
}

