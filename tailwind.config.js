/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        haven: {
          50: '#f4f8f7',
          100: '#e5f0ee',
          200: '#cde1dc',
          300: '#a7cbc3',
          400: '#7aaf9f',
          500: '#549382',
          600: '#417668',
          700: '#365f54',
          800: '#2f4d45',
          900: '#29413b',
        },
        sage: {
          50: '#f8faf8',
          100: '#eef3ef',
          200: '#dde6df',
          300: '#c3d3c7',
          400: '#a2b9a7',
          500: '#7f9c85',
          600: '#647e6a',
          700: '#506455',
          800: '#425146',
          900: '#37433a',
        },
        terracotta: {
          50: '#fdf7f4',
          100: '#fbece6',
          200: '#f7d8cc',
          300: '#f1bda8',
          400: '#e8977c',
          500: '#dd7355',
          600: '#cc593c',
          700: '#aa462e',
          800: '#8c3b28',
        },
        lavender: {
          50: '#f7f6fb',
          100: '#efedf6',
          200: '#ded9ee',
          300: '#c4bce2',
          400: '#a498d2',
          500: '#8875c1',
          600: '#735dad',
          700: '#5e4c8e',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Merriweather', 'serif'],
      },
      animation: {
        'breathe-in-out': 'breathe 16s ease-in-out infinite',
        'soft-pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.4)' },
          '50%': { transform: 'scale(1.4)' },
          '75%': { transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
