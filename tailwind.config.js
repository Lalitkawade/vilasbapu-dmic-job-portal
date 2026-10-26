/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4f9',
          100: '#d9e2f0',
          200: '#b3c7e0',
          300: '#85a4cd',
          400: '#5c84b9',
          500: '#3a66a4',
          600: '#2b4f85',
          700: '#213c66',
          800: '#192c4a',
          900: '#111d31',
          950: '#0a101d',
        },
        saffron: {
          50: '#fff8f1',
          100: '#feeedb',
          200: '#fddab6',
          300: '#fbbd86',
          400: '#f89753',
          500: '#f4732a', // restrained Indian saffron
          600: '#e5561a',
          700: '#be3f15',
          800: '#973318',
          900: '#7a2d17',
          950: '#42140a',
        },
        primary: {
          DEFAULT: '#192c4a', // Navy 800
          foreground: '#ffffff',
          light: '#2b4f85',
        },
        accent: {
          DEFAULT: '#e5561a', // Saffron
          foreground: '#ffffff',
          subtle: '#fff8f1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', '-apple-system', 'sans-serif'],
        marathi: ['Noto Sans Devanagari', 'Mukta', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px -1px rgba(17, 29, 49, 0.06), 0 1px 4px -1px rgba(17, 29, 49, 0.04)',
        'elevated': '0 10px 25px -5px rgba(17, 29, 49, 0.1), 0 8px 10px -6px rgba(17, 29, 49, 0.06)',
      }
    },
  },
  plugins: [],
}
