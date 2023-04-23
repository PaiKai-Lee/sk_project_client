/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      keyframes: {
        fill: {
          '0%': { fill: 'transparent' },
          '100%': { fill: 'black' },
        }
      },
      animation:{
        fill: 'fill 1s ease-in forwards'
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ['winter', 'night']
  }
}

