/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#8ECAE6',
          secondary: '#219EBC',
          accent: '#FFB703',
          neutral: '#023047',
          'base-100': '#2A303C',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FB8500',
          error: '#F87272',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/forms'), require('daisyui')],
};
