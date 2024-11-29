/** @type {import('tailwindcss').Config} */
export default {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-noto-sans-thai)', 'sans-serif'],
        prompt: ['Prompt', 'sans-serif']
      },

      colors: {
        theme: {
          DEFAULT: '#3A57E8',
          dark: '#232D42'
        },
      },
    },
  },
  plugins: [],
}
