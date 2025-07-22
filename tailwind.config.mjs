export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightHover: '#fcf4ff',
        darkHover: '#2a004a', 
        darkTheme: '#11001F'
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        ovo: ['Ovo', 'serif']
      },
      boxShadow: {
        'black': '4px 4px 0px #000',
        'white': '4px 4px 0px #fff',
      }
    },
  },
  darkMode: 'selector',
  plugins: [],
};