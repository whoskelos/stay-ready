import type { APIRoute } from 'astro';
import { getSite } from '../lib/content';

// Manifiesto generado desde el CMS para que el nombre no quede duplicado a mano.
export const GET: APIRoute = async () => {
  const site = await getSite();
  const manifest = {
    name: `${site.name} · ${site.tagline}`,
    short_name: site.name,
    description: site.seo.description,
    lang: 'es',
    start_url: '/',
    display: 'browser',
    background_color: '#f9fcfe',
    theme_color: '#f9fcfe',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json' },
  });
};
