// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite'; // Plugin de v4
import react from '@astrojs/react';

import sanity from '@sanity/astro';

import partytown from '@astrojs/partytown';


import node from '@astrojs/node';


export default defineConfig({
  site: 'https://panggea.site',
  output: 'server',

  // Quitamos tailwind de aquí porque en v4 va en los plugins de Vite
  integrations: [mdx(), sitemap(), react(), sanity({
    projectId: 'zjxg4fvd',
    dataset: 'production',
    useCdn: false, // Ponlo en falso para que los cambios se vean en tiempo real
    }), partytown()],

  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Atkinson',
      cssVariable: '--font-atkinson',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/atkinson-regular.woff'],
            weight: 400,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/atkinson-bold.woff'],
            weight: 700,
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: node({
    mode: 'standalone',
  }),
});