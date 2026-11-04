import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { iconNames } from './lib/icons';

const icon = z.enum(iconNames);

// Cabecera común de sección: `highlight` es la parte del titular con énfasis.
const heading = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  highlight: z.string().optional(),
  subtitle: z.string().optional(),
});

// Elementos repetidos (servicios, sectores, pasos, valores): un JSON por entrada.
const item = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  icon,
  order: z.number().int().min(1),
});

const collectionOf = (folder: string) =>
  defineCollection({
    loader: glob({ pattern: '*.json', base: `./src/content/${folder}` }),
    schema: item,
  });

const home = defineCollection({
  loader: glob({ pattern: 'home.json', base: './src/content' }),
  schema: z.object({
    hero: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      highlight: z.string().min(1),
      text: z.string().min(1),
      ctaLabel: z.string().min(1),
      availability: z.string().min(1),
      cards: z
        .array(z.object({ title: z.string().min(1), subtitle: z.string().min(1), icon }))
        .length(2),
    }),
    solutions: heading,
    sectors: heading,
    process: heading,
    about: z.object({
      eyebrow: z.string().min(1),
      title: z.string().min(1),
      text: z.string().min(1),
      stats: z.array(z.object({ value: z.string().min(1), label: z.string().min(1) })).length(3),
    }),
    contact: heading.extend({
      whatsappLabel: z.string().min(1),
      whatsappHint: z.string().min(1),
      callLabel: z.string().min(1),
      emailLabel: z.string().min(1),
    }),
    notFound: z.object({
      title: z.string().min(1),
      text: z.string().min(1),
      ctaLabel: z.string().min(1),
    }),
  }),
});

const site = defineCollection({
  loader: glob({ pattern: 'site.json', base: './src/content' }),
  schema: z.object({
    name: z.string().min(1),
    tagline: z.string().min(1),
    phone: z.string().min(1),
    // Solo dígitos y prefijo internacional, sin «+»: se usa en `tel:` y `wa.me`.
    phoneDigits: z.string().regex(/^\d{9,15}$/),
    email: z.email(),
    whatsappNumber: z.string().regex(/^\d{9,15}$/),
    whatsappMessage: z.string().min(1),
    hoursShort: z.string().min(1),
    hoursLong: z.string().min(1),
    city: z.string().min(1),
    nav: z
      .array(z.object({ label: z.string().min(1), href: z.string().regex(/^#[a-z-]+$/) }))
      .min(1),
    seo: z.object({
      title: z.string().min(1),
      description: z.string().min(1),
    }),
    // Textos de interfaz que solo leen los lectores de pantalla (accesibilidad).
    a11y: z.object({
      skipLink: z.string().min(1),
      mainNav: z.string().min(1),
      mobileNav: z.string().min(1),
      openMenu: z.string().min(1),
      homeLink: z.string().min(1),
    }),
  }),
});

export const collections = {
  home,
  site,
  services: collectionOf('services'),
  sectors: collectionOf('sectors'),
  steps: collectionOf('steps'),
  values: collectionOf('values'),
};
