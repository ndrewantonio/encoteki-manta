/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        desktop: '1280px',
        tablet: '600px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          black: '#1A1A1A',
          blue: '#1346AC',
          red: '#D63B29',
          green: '#246234',
        },
        neutral: {
          70: '#E6E8E6',
          60: '#CCCECC',
          30: '#515351',
          10: '#0D140F',
        },
        green: {
          90: '#F0FAF3',
          10: '#163C20',
        },
        khaki: {
          60: '#DADA9F',
          70: '#E7E7C0',
          80: '#EFEFD6',
          90: '#F6F6EC',
          99: '#F9F9F6',
        },
        red: {
          90: '#FBE8E2',
        },
      },
    },
  },
  plugins: [],
}
