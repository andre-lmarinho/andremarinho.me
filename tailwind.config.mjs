/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: {
    files: [
      './src/app/**/*.{js,jsx,ts,tsx,mdx}',
      './src/components/**/*.{js,jsx,ts,tsx,mdx}',
      './src/context/**/*.{js,jsx,ts,tsx,mdx}',
      './src/hooks/**/*.{js,jsx,ts,tsx,mdx}',
      './src/utils/**/*.{js,jsx,ts,tsx,mdx}',
    ],
    relative: import.meta.url,
  },
  theme: {
    extend: {
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
        'gradient-x': 'gradient-x 8s ease infinite',
        'gradient-y': 'gradient-y 8s ease infinite',
      },
    },
  },
  plugins: [],
};

export default config;
