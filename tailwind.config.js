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
        night: {
          950: '#06080D',
          900: '#080B11',
          850: '#0D111A',
          800: '#121724',
          700: '#1C2333',
          600: '#283248',
        },
        gold: {
          300: '#FDE68A',
          400: '#F59E0B',
          500: '#D97706',
          600: '#B45309',
          metallic: '#D4AF37',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['Cinzel', 'serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px -4px rgba(217, 119, 6, 0.35)',
        'glow-amber': '0 0 20px -3px rgba(245, 158, 11, 0.4)',
        'glow-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(13, 17, 26, 0.8) 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #F59E0B 0%, #FCD34D 50%, #D97706 100%)',
      }
    },
  },
  plugins: [],
}
