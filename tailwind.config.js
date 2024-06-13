/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        grey:{
          cool: 'hsl(231, 11%, 63%)',
          light: 'hsl(229, 24%, 87%)'
        },
        magnolia:{
          500: 'hsl(217, 100%, 97%)'
        },
        alabaster:{
          500: 'hsl(231, 100%, 99%)'
        },
        blue:{
          marine: 'hsl(213, 96%, 18%)',
          purpleish: 'hsl(243, 100%, 62%)',
          pastel: 'hsl(228, 100%, 84%)',
          light: 'hsl(206, 94%, 87%)'
        },
        red:{
          strawberry: 'hsl(354, 84%, 57%)'
        }
      }
    },
  },
  plugins: [],
}

