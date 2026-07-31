/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Refined luxury caregiving palette
        teal: {
          DEFAULT: '#0f6b6b',
          light: '#14807f',
          dark: '#0a4d4d',
          deep: '#083c3c',
        },
        navy: {
          DEFAULT: '#13233f',
          light: '#1e3a5f',
          dark: '#0c1729',
        },
        cream: {
          DEFAULT: '#f7f3ea',
          dark: '#efe8d8',
        },
        gold: {
          DEFAULT: '#c9a24b',
          light: '#d9b968',
          dark: '#a9842f',
        },
        sage: {
          DEFAULT: '#8ca08a',
          light: '#a9bca6',
          dark: '#6f8a6d',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(19, 35, 63, 0.18)',
        card: '0 20px 50px -20px rgba(19, 35, 63, 0.22)',
        gold: '0 10px 30px -10px rgba(201, 162, 75, 0.45)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'teal-gradient': 'linear-gradient(135deg, #0f6b6b 0%, #13233f 100%)',
        'gold-gradient': 'linear-gradient(135deg, #d9b968 0%, #c9a24b 100%)',
        'hero-overlay':
          'linear-gradient(120deg, rgba(12,23,41,0.86) 0%, rgba(10,77,77,0.72) 55%, rgba(15,107,107,0.55) 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.9s ease both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
