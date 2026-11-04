// Catálogo único de iconos: lo comparten el esquema Zod y el selector de
// Keystatic para que un icono inexistente rompa el build, no la web.
export const iconNames = [
  'sparkles',
  'hard-hat',
  'key',
  'brush',
  'wrench',
  'leaf',
  'building',
  'store',
  'home',
  'briefcase',
  'trending-up',
  'chat',
  'clipboard',
  'calendar',
  'shield-check',
  'clock',
  'award',
  'handshake',
] as const;

export type IconName = (typeof iconNames)[number];

export const iconLabels: Record<IconName, string> = {
  sparkles: 'Destellos',
  'hard-hat': 'Casco',
  key: 'Llave',
  brush: 'Brocha',
  wrench: 'Llave inglesa',
  leaf: 'Hoja',
  building: 'Edificio',
  store: 'Local con toldo',
  home: 'Casa',
  briefcase: 'Maletín',
  'trending-up': 'Gráfica ascendente',
  chat: 'Chat',
  clipboard: 'Lista de tareas',
  calendar: 'Calendario',
  'shield-check': 'Escudo con check',
  clock: 'Reloj',
  award: 'Medalla',
  handshake: 'Apretón de manos',
};
