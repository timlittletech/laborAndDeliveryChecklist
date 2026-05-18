import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#fdf2f5',
          100: '#fce7ee',
          200: '#f9d0dc',
          300: '#f4a8be',
          500: '#e879a0',
          700: '#b8456e',
        },
        lavender: {
          100: '#ece9f7',
          200: '#d8d2ef',
          500: '#9b8cd4',
          700: '#6b5ca3',
        },
        mint: {
          100: '#dff5ec',
          200: '#bce8d4',
          500: '#6cc9a0',
          700: '#3d8a68',
        },
        peach: {
          100: '#ffe8d9',
          200: '#ffd2b5',
          500: '#f0a878',
          700: '#b56f3d',
        },
        butter: {
          100: '#fdf5d4',
          200: '#faeaa8',
          500: '#e6c850',
          700: '#8a7320',
        },
        sky: {
          100: '#dcecf7',
          200: '#b8d6ed',
          500: '#6ca3d4',
          700: '#3a6f9d',
        },
        mauve: {
          100: '#f3e8f0',
          200: '#e3c8de',
          500: '#b07bac',
          700: '#794476',
        },
        rose: {
          100: '#fde7eb',
          200: '#f7c8d2',
          500: '#d96a8c',
          700: '#9c3559',
        },
        ink: {
          DEFAULT: '#4a3a4f',
          soft: '#7d6e84',
        },
        paper: {
          DEFAULT: '#fffafc',
          warm: '#fff6f0',
        },
        line: '#f0dfe6',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 2px 6px rgba(184, 69, 110, 0.06)',
        md: '0 6px 20px rgba(184, 69, 110, 0.08)',
        lg: '0 12px 36px rgba(184, 69, 110, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
