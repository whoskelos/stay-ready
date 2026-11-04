import { getCollection, getEntry } from 'astro:content';

type ItemCollection = 'services' | 'sectors' | 'steps' | 'values';

// Devuelve los datos de una colección de elementos ya ordenados por `order`.
export async function getOrderedItems(name: ItemCollection) {
  const entries = await getCollection(name);
  return entries.map((entry) => entry.data).sort((a, b) => a.order - b.order);
}

// Singletons: si falta el archivo el build falla con un mensaje claro.
export async function getSite() {
  const entry = await getEntry('site', 'site');
  if (!entry) throw new Error('Falta el contenido en src/content/site.json');
  return entry.data;
}

export async function getHome() {
  const entry = await getEntry('home', 'home');
  if (!entry) throw new Error('Falta el contenido en src/content/home.json');
  return entry.data;
}
