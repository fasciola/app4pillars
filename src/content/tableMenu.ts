/**
 * The live QR menu (Four Pillars Asian Kitchen on Netlify) and the table cards
 * shown on the site. Each card's QR code opens the menu with that table's code,
 * so the table number is filled in and the order goes out on WhatsApp with it.
 *
 * The codes must match `tables` in the menu project's menu.js.
 */
export const MENU_URL = 'https://menu-example.netlify.app/';

export interface TableCard {
  code: string;
  table: string;
  href: string;
  /** Printable card with the QR code. */
  png: string;
  /** Smaller copy for showing on the page. */
  webp: string;
}

export const tableCards: TableCard[] = [
  { code: 'hbnayg', table: '1' },
  { code: '7hzztw', table: '2' },
  { code: '1umhwr', table: '3' },
].map(({ code, table }) => ({
  code,
  table,
  href: `${MENU_URL}?t=${code}`,
  png: `/table-qr/table-0${table}.png`,
  webp: `/table-qr/table-0${table}.webp`,
}));

/** Opens the live menu as table 1. */
export const menuDemoHref = tableCards[0].href;

/** Dish cut-outs from the Asian Kitchen menu, used as decoration on the restaurant pages. */
export const dishImage = (id: string) => `/restaurant/dishes/${id}.webp`;
