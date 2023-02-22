/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#8ecae6',
        secondary: '#219ebc',
        accent: '#ffb703',
        'accent-2': '#fb8500',
        background: '#023047',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
