# Stay Ready

Landing de una página para **Stay Ready**, empresa de limpieza y mantenimiento para empresas en Madrid. El único objetivo de conversión es que la persona escriba por WhatsApp o llame.

- **Astro** (sitio 100 % estático, sin adaptador) · **Tailwind CSS v4** · **TypeScript estricto**
- **Contenido editable** con Keystatic (solo en local, ver más abajo) y validado con Zod
- Tipografías self-hosted con Fontsource: Outfit y Plus Jakarta Sans

## Puesta en marcha

Requiere Node 22 o superior.

```sh
npm install
npm run dev        # http://localhost:4321  ·  panel de contenido en /keystatic
npm run build      # genera ./dist
npm run preview    # sirve ./dist para probar el build
```

## Cómo editar el contenido

1. Ejecuta `npm run dev` y abre `http://localhost:4321/keystatic`.
2. Edita textos, servicios, sectores, pasos o datos de contacto y pulsa **Save**. Cambia los archivos JSON de `src/content/`.
3. Sube los cambios a GitHub (`git add`, `git commit`, `git push`). Vercel publica solo.

Keystatic y React solo se cargan en desarrollo (ver `astro.config.mjs`), así que la web publicada no incluye el panel ni JavaScript de más.

## Estructura

```
src/
  components/     Header, Hero, Solutions, Sectors, Process, About, Contact, Footer…
  content/        JSON editable: site, home y colecciones (services, sectors, steps, values)
  content.config.ts   Esquemas Zod (deben coincidir con keystatic.config.ts)
  layouts/        BaseLayout (head, skip link, scroll reveal)
  lib/            Iconos propios, enlaces de contacto, JSON-LD, lectura de contenido
  pages/          index, 404, robots.txt y manifest generados desde el CMS
  styles/global.css   Tokens de diseño (@theme) y utilidades
public/           Favicon, iconos de app e imagen Open Graph
scripts/          generate-icons.mjs: regenera los iconos desde src/assets/logo.webp
docs/             Brief, secciones y contenido de partida
```

## Antes de publicar: datos provisionales

Estos valores son de ejemplo y hay que sustituirlos por los reales:

| Dato | Dónde |
| --- | --- |
| Dominio (`https://tudominio.com`) | `site` en `astro.config.mjs` |
| Teléfono y WhatsApp (`+34 600 000 000`) | Keystatic → Datos del sitio |
| Email (`info@stayready.es`) | Keystatic → Datos del sitio |
| Cifras de «Sobre nosotros» (+500 / 15' / 100 %) | Keystatic → Textos de la home |

El dominio también alimenta el canonical, Open Graph, el sitemap, `robots.txt` y el JSON-LD, así que basta con cambiarlo en un solo sitio. Si cambias el logo o el titular de la home, regenera `public/og-image.jpg` (1200×630).

## Despliegue en Vercel

1. Sube el proyecto a GitHub: crea un repositorio vacío y ejecuta
   ```sh
   git remote add origin https://github.com/TU_USUARIO/stay-ready.git
   git branch -M main
   git push -u origin main
   ```
2. En [vercel.com/new](https://vercel.com/new) importa el repositorio. Vercel detecta Astro; no cambies nada (Build `npm run build`, Output `dist`).
3. Pulsa **Deploy**. Cada `git push` a `main` publica una versión nueva.
4. Dominio: en el proyecto → **Settings → Domains → Add**, escribe tu dominio y crea en tu registrador los registros DNS que Vercel te indique (un `A` o `CNAME`, según sea dominio raíz o `www`).
5. Con el dominio activo, cambia `site` en `astro.config.mjs`, haz commit y push.
6. Da de alta el sitio en Google Search Console y envía `https://TU_DOMINIO/sitemap-index.xml`.

## Calidad

Lighthouse móvil sobre el build: Rendimiento 100 · Accesibilidad 100 · Buenas prácticas 100 · SEO 100. LCP 0,8 s, CLS 0,008, TBT 0 ms.
