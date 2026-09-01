/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        gold: {
          400: '#f6d365',
          500: '#fda085',
          600: '#cf9f38',
          700: '#b28328',
        },
        dark: {
          900: '#0B0F17',
          800: '#131926',
          700: '#1F293D',
          600: '#2E3D59',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
