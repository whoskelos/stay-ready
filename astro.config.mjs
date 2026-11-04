// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Keystatic (y React, que solo necesita el panel) se cargan únicamente en
// desarrollo: la web se publica 100 % estática, sin adaptador ni JS extra.
const isDev = process.argv.includes('dev');

// https://astro.build/config
export default defineConfig({
  // TODO: sustituir por el dominio final cuando exista.
  site: 'https://tudominio.com',
  integrations: [sitemap(), ...(isDev ? [react(), keystatic()] : [])],
  vite: {
    plugins: [tailwindcss()],
  },
});
