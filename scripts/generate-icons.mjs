// Genera los iconos del sitio a partir de src/assets/logo.webp.
// Uso: node scripts/generate-icons.mjs
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const source = 'src/assets/logo.webp';
const background = { r: 249, g: 252, b: 254, alpha: 1 }; // --color-bg

// Cuadrado con el logo centrado; `padding` es la fracción de margen por lado.
const square = (size, padding, flatten) => {
  const inner = Math.round(size * (1 - padding * 2));
  let image = sharp(source).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });
  image = image.extend({
    top: Math.floor((size - inner) / 2),
    bottom: Math.ceil((size - inner) / 2),
    left: Math.floor((size - inner) / 2),
    right: Math.ceil((size - inner) / 2),
    background: flatten ? background : { r: 0, g: 0, b: 0, alpha: 0 },
  });
  return image.png().toBuffer();
};

// Favicon: transparente y casi a sangre para que se lea a 16-32 px.
const favicon32 = await square(32, 0.04, false);
const favicon48 = await square(48, 0.04, false);

// .ico con PNG incrustado (válido en todos los navegadores actuales).
const ico = (images) => {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size, 0);
    entry.writeUInt8(size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
};

await writeFile('public/favicon.ico', ico([{ size: 32, data: favicon32 }, { size: 48, data: favicon48 }]));
await writeFile('public/favicon-32.png', favicon32);
// Iconos de aplicación: fondo sólido y margen, para que no queden con bordes negros.
await writeFile('public/apple-touch-icon.png', await square(180, 0.14, true));
await writeFile('public/icon-192.png', await square(192, 0.14, true));
await writeFile('public/icon-512.png', await square(512, 0.14, true));
console.log('Iconos generados en /public');
