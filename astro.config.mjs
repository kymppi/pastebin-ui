import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
import vercel from '@astrojs/vercel/edge';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  // vite: {
  //   plugins: [
  //     nodePolyfills({
  //       protocolImports: true,
  //     }),
  //   ],
  // },
  integrations: [tailwind()],
});
