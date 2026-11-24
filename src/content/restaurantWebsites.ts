/** Copy for /restaurant-website-design-dubai/, kept apart so the page and its schema share it. */

export const guestFeatures = [
  {
    title: 'Digital QR menus for restaurants and cafés',
    body: 'A branded menu that opens from the QR code on the table: clear categories, dish photos and prices that read comfortably on a phone, without PDFs to download or pinch-zoom.',
  },
  {
    title: 'A website page for every location',
    body: 'A page for every location with its own opening hours, map, phone number and menu, so guests land on the branch they are actually visiting.',
  },
  {
    title: 'Book or order in one tap',
    body: 'Reservation and delivery links set per branch, so every “Book a table” and “Order now” button goes to the right place for that location.',
  },
  {
    title: 'English and Arabic',
    body: 'Menus and pages structured in both languages, with Arabic laid out right-to-left rather than squeezed into an English template.',
  },
];

export const teamFeatures = [
  'Menus and prices organised by branch and by brand',
  'Opening hours, holiday and Ramadan timings per location',
  'Booking and delivery links that match each branch',
  'Brunch, seasonal and limited-time menus that come and go',
  'Separate pages for each brand in a restaurant group',
  'One consistent look across every location',
];

export const restaurantFaqs = [
  {
    question: 'Do you design websites for restaurant groups with several branches?',
    answer:
      'Yes. We plan the site around your branches and brands: a page for each location with its own hours, map, contact details and menu, and separate brand pages where a group runs more than one concept.',
  },
  {
    question: 'Can our menu open from a QR code on the table?',
    answer:
      'Yes. We design branded, mobile-friendly menus that guests open by scanning a QR code at the table. Each table can have its own code, so the table number is filled in automatically, and guests can send their order on WhatsApp with the table attached.',
  },
  {
    question: 'Can the website and menu be in English and Arabic?',
    answer:
      'Yes. Pages and menus can be structured in English and Arabic, with the Arabic version laid out right-to-left.',
  },
  {
    question: 'Can each branch link its website from Google Maps?',
    answer:
      'Yes. A dedicated page for each location gives your team a specific URL to use on that branch’s Google Business Profile. Guests can find the address, opening hours and reservation or delivery links for that location.',
  },
  {
    question: 'We only need a QR menu, not a full website. Can you help?',
    answer:
      'Yes. Tell us your venue name and how many tables or branches you have, and we will recommend either a standalone QR menu or a full restaurant website.',
  },
];

export interface RestaurantConcept {
  id: string;
  name: string;
  cuisine: string;
  domain: string;
  thumb: string;
  image: string;
}

/** Full-page restaurant & café homepage concepts showcased on /restaurant-website-design-dubai/. */
export const restaurantConcepts: RestaurantConcept[] = [
  {
    id: 'date-house',
    name: 'The Date House',
    cuisine: 'Khaleeji dining & majlis · Dubai',
    domain: 'thedatehouse.ae',
    thumb: '/concepts/date-house-sm.webp',
    image: '/concepts/date-house.webp',
  },
  {
    id: 'afterglow',
    name: 'Afterglow',
    cuisine: 'Late-night lounge & dessert bar · Downtown',
    domain: 'afterglow.dubai',
    thumb: '/concepts/afterglow-sm.webp',
    image: '/concepts/afterglow.webp',
  },
  {
    id: 'ember-tide',
    name: 'Ember & Tide',
    cuisine: 'Wood-fired seafood & grill · Marina',
    domain: 'emberandtide.ae',
    thumb: '/concepts/ember-tide-sm.webp',
    image: '/concepts/ember-tide.webp',
  },
  {
    id: 'momo-maple',
    name: 'Momo & Maple',
    cuisine: 'Artisanal dumpling bar & teahouse',
    domain: 'momoandmaple.ae',
    thumb: '/concepts/momo-maple-sm.webp',
    image: '/concepts/momo-maple.webp',
  },
  {
    id: 'verdant-table',
    name: 'Verdant Table',
    cuisine: 'Seasonal garden plates & botanic kitchen',
    domain: 'verdanttable.ae',
    thumb: '/concepts/verdant-table-sm.webp',
    image: '/concepts/verdant-table.webp',
  },
  {
    id: 'zaatar-stone',
    name: 'Zaatar & Stone',
    cuisine: 'Wood-baked Levantine kitchen & mezze',
    domain: 'zaatarandstone.ae',
    thumb: '/concepts/zaatar-stone-sm.webp',
    image: '/concepts/zaatar-stone.webp',
  },
  {
    id: 'pistachio-court',
    name: 'Pistachio Court',
    cuisine: 'Artisanal pastry & slow morning café',
    domain: 'pistachiocourt.ae',
    thumb: '/concepts/pistachio-court-sm.webp',
    image: '/concepts/pistachio-court.webp',
  },
  {
    id: 'lime-canopy',
    name: 'Lime Canopy',
    cuisine: 'Tropical Thai & Southeast Asian dining',
    domain: 'limecanopy.ae',
    thumb: '/concepts/lime-canopy-sm.webp',
    image: '/concepts/lime-canopy.webp',
  },
  {
    id: 'ember-oak',
    name: 'Ember & Oak',
    cuisine: 'Specialty coffee · Roastery & cafés',
    domain: 'emberandoak.coffee',
    thumb: '/concepts/ember-oak-sm.webp',
    image: '/concepts/ember-oak.webp',
  },
];

