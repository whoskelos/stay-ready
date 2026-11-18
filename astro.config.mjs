// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// La web sigue siendo estática (todas las páginas se prerenderizan). El adaptador
// de Vercel solo sirve las rutas de Keystatic (/keystatic y /api/keystatic), que
// necesitan servidor para que el cliente pueda editar el contenido en producción.

// https://astro.build/config
export default defineConfig({
  // TODO: sustituir por el dominio final cuando exista.
  site: 'https://tudominio.com',
  adapter: vercel(),
  integrations: [sitemap(), react(), keystatic()],
  vite: {
    plugins: [tailwindcss()],
  },
});
