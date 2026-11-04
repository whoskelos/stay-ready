import { collection, config, fields, singleton } from '@keystatic/core';
import { iconLabels, iconNames } from './src/lib/icons';

// Selector de iconos alineado con el enum de Zod (src/content.config.ts).
const iconField = fields.select({
  label: 'Icono',
  options: iconNames.map((value) => ({ value, label: iconLabels[value] })),
  defaultValue: iconNames[0],
});

const orderField = fields.integer({
  label: 'Orden',
  description: 'Posición en la web (1 aparece primero).',
  validation: { isRequired: true, min: 1 },
});

const required = { validation: { isRequired: true } } as const;

// Cabecera de sección: etiqueta, titular con énfasis y subtítulo opcional.
const headingFields = {
  eyebrow: fields.text({ label: 'Etiqueta (mayúsculas)', ...required }),
  title: fields.text({ label: 'Titular', ...required }),
  highlight: fields.text({
    label: 'Parte destacada del titular',
    description: 'Se muestra con color teal a continuación del titular.',
  }),
  subtitle: fields.text({ label: 'Subtítulo', multiline: true }),
};

// Colección de elementos repetidos: mismo esquema que `item` en content.config.ts.
const itemCollection = (label: string, folder: string, withDescription: boolean) =>
  collection({
    label,
    slugField: 'title',
    path: `src/content/${folder}/*`,
    format: { data: 'json' },
    schema: {
      title: fields.slug({ name: { label: 'Título', validation: { isRequired: true } } }),
      // Los sectores solo muestran icono y etiqueta, sin párrafo.
      description: fields.text({
        label: 'Descripción',
        multiline: true,
        validation: { isRequired: withDescription },
      }),
      icon: iconField,
      order: orderField,
    },
  });

export default config({
  storage: { kind: 'local' },
  ui: { brand: { name: 'Stay Ready' } },
  singletons: {
    site: singleton({
      label: 'Datos del sitio',
      path: 'src/content/site',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Nombre de la empresa', ...required }),
        tagline: fields.text({ label: 'Descriptor', ...required }),
        phone: fields.text({
          label: 'Teléfono (como se muestra)',
          description: 'Ej.: +34 600 000 000',
          ...required,
        }),
        phoneDigits: fields.text({
          label: 'Teléfono (solo dígitos)',
          description: 'Con prefijo y sin «+» ni espacios. Se usa en el enlace de llamada.',
          validation: { isRequired: true, pattern: { regex: /^\d{9,15}$/, message: 'Entre 9 y 15 dígitos.' } },
        }),
        email: fields.text({ label: 'Email', ...required }),
        whatsappNumber: fields.text({
          label: 'Número de WhatsApp (solo dígitos)',
          description: 'Con prefijo y sin «+», p. ej. 34600000000.',
          validation: { isRequired: true, pattern: { regex: /^\d{9,15}$/, message: 'Entre 9 y 15 dígitos.' } },
        }),
        whatsappMessage: fields.text({
          label: 'Mensaje precargado de WhatsApp',
          multiline: true,
          ...required,
        }),
        hoursShort: fields.text({ label: 'Horario (versión corta)', ...required }),
        hoursLong: fields.text({ label: 'Horario (versión larga)', ...required }),
        city: fields.text({ label: 'Ciudad de servicio', ...required }),
        nav: fields.array(
          fields.object({
            label: fields.text({ label: 'Texto del enlace', ...required }),
            href: fields.text({
              label: 'Ancla',
              description: 'Con almohadilla y en minúsculas, p. ej. #soluciones.',
              validation: { isRequired: true, pattern: { regex: /^#[a-z-]+$/, message: 'Formato: #ancla' } },
            }),
          }),
          {
            label: 'Menú de navegación',
            itemLabel: (props) => props.fields.label.value,
            validation: { length: { min: 1 } },
          },
        ),
        seo: fields.object(
          {
            title: fields.text({
              label: 'Título SEO',
              description: 'Entre 50 y 60 caracteres, con el término clave delante.',
              ...required,
            }),
            description: fields.text({
              label: 'Descripción SEO',
              description: 'Entre 140 y 160 caracteres.',
              multiline: true,
              ...required,
            }),
          },
          { label: 'SEO por defecto' },
        ),
      },
    }),
    home: singleton({
      label: 'Textos de la home',
      path: 'src/content/home',
      format: { data: 'json' },
      schema: {
        hero: fields.object(
          {
            eyebrow: fields.text({ label: 'Etiqueta', ...required }),
            title: fields.text({ label: 'Titular (H1)', ...required }),
            highlight: fields.text({ label: 'Parte destacada del titular', ...required }),
            text: fields.text({ label: 'Párrafo', multiline: true, ...required }),
            ctaLabel: fields.text({ label: 'Texto del botón principal', ...required }),
            availability: fields.text({ label: 'Nota de disponibilidad', ...required }),
            cards: fields.array(
              fields.object({
                title: fields.text({ label: 'Título', ...required }),
                subtitle: fields.text({ label: 'Subtítulo', ...required }),
                icon: iconField,
              }),
              {
                label: 'Tarjetas flotantes',
                description: 'Deben ser exactamente 2.',
                itemLabel: (props) => props.fields.title.value,
                validation: { length: { min: 2, max: 2 } },
              },
            ),
          },
          { label: 'Inicio' },
        ),
        solutions: fields.object(headingFields, { label: 'Soluciones' }),
        sectors: fields.object(headingFields, { label: 'Sectores' }),
        process: fields.object(headingFields, { label: 'Cómo trabajamos' }),
        about: fields.object(
          {
            eyebrow: fields.text({ label: 'Etiqueta', ...required }),
            title: fields.text({ label: 'Titular', ...required }),
            text: fields.text({ label: 'Párrafo', multiline: true, ...required }),
            stats: fields.array(
              fields.object({
                value: fields.text({ label: 'Cifra', ...required }),
                label: fields.text({ label: 'Etiqueta', ...required }),
              }),
              {
                label: 'Cifras destacadas',
                description: 'Deben ser exactamente 3.',
                itemLabel: (props) => props.fields.value.value,
                validation: { length: { min: 3, max: 3 } },
              },
            ),
          },
          { label: 'Sobre nosotros' },
        ),
        contact: fields.object(
          {
            ...headingFields,
            whatsappLabel: fields.text({ label: 'Título tarjeta WhatsApp', ...required }),
            whatsappHint: fields.text({ label: 'Texto tarjeta WhatsApp', ...required }),
            callLabel: fields.text({ label: 'Título tarjeta llamada', ...required }),
            emailLabel: fields.text({ label: 'Título tarjeta email', ...required }),
          },
          { label: 'Contacto' },
        ),
      },
    }),
  },
  collections: {
    services: itemCollection('Servicios', 'services', true),
    sectors: itemCollection('Sectores', 'sectors', false),
    steps: itemCollection('Pasos del proceso', 'steps', true),
    values: itemCollection('Valores (barra del inicio)', 'values', true),
  },
});
