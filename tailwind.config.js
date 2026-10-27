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
          950: '#0B0F19', // Rich, deep slate navy (modern luxury, not pitch dark)
          900: '#111827', // Clean elevated dark slate
          850: '#162033', // Distinct card surface
          800: '#1E293B', // Elevated interactive surface
          750: '#27354D', // Border and divider highlight
          700: '#334155', // Subdued text and icons
          600: '#475569',
        },
        gold: {
          300: '#FDE68A',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          metallic: '#E5A93C',
        },
        amber: {
          450: '#F7A71B',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 30px -4px rgba(245, 158, 11, 0.35)',
        'glow-amber': '0 0 25px -3px rgba(245, 158, 11, 0.3)',
        'glow-card': '0 12px 35px -8px rgba(0, 0, 0, 0.45)',
        'elevated': '0 10px 30px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
}
