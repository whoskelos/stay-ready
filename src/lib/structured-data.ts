import type { CollectionEntry } from 'astro:content';

type Site = CollectionEntry<'site'>['data'];

// Solo se publican datos que existen en el CMS. No hay dirección postal ni redes
// sociales en el contenido, así que no se incluyen (`address` y `sameAs`) en lugar de inventarlas.
export function buildJsonLd(site: Site, siteUrl: URL): Record<string, unknown>[] {
  const url = siteUrl.href;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${url}#organization`,
      name: site.name,
      description: site.seo.description,
      url,
      logo: new URL('/icon-512.png', siteUrl).href,
      email: site.email,
      telephone: `+${site.phoneDigits}`,
      areaServed: { '@type': 'City', name: site.city },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: `+${site.phoneDigits}`,
        email: site.email,
        areaServed: 'ES',
        availableLanguage: 'es',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${url}#website`,
      url,
      name: site.name,
      inLanguage: 'es-ES',
      publisher: { '@id': `${url}#organization` },
    },
  ];
}
