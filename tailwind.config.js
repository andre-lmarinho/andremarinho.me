module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{tsx,ts,jsx,js}'],
  theme: {
    extend: {
      colors: {
        primary: {
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
        },
        secondary: {
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
        },
        accent: {
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
        },
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'gradient-x': {
          '0%,100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'gradient-y': {
          '0%,100%': { 'background-position': '50% 0%' },
          '50%': { 'background-position': '50% 100%' },
        },
        wave: {
          '0%, 20%, 100%': { transform: 'rotate(0deg)' },
          '5%': { transform: 'rotate(14deg)' },
          '10%': { transform: 'rotate(-8deg)' },
          '15%': { transform: 'rotate(14deg)' },
        },
      },
      animation: {
        wave: 'wave 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
        'gradient-y': 'gradient-y 8s ease infinite',
      },
    },
  },
  plugins: [],
};
