/**
 * Four Pillars Web Design is a brand of Business Lab (businesslab.ae), a UAE
 * corporate services provider. These are Business Lab's two real offices,
 * shared by the website-design-dubai, website-design-ajman and
 * website-design-abu-dhabi pages so the address data can never drift between
 * them. Source: businesslab.ae/contact.
 */
export interface BusinessLabOffice {
  id: string;
  city: string;
  name: string;
  addressLines: string[];
  mapsQuery: string;
}

export const businessLabOffices: BusinessLabOffice[] = [
  {
    id: 'dubai',
    city: 'Dubai',
    name: 'Blue Bay Tower',
    addressLines: ['Office 1619, Business Bay', 'Dubai, United Arab Emirates'],
    mapsQuery: 'Blue Bay Tower, Business Bay, Dubai, UAE',
  },
  {
    id: 'ajman',
    city: 'Ajman',
    name: 'Amber Gem Tower',
    addressLines: ['Mezzanine Floor, Sheikh Khalifa Bin Zayed St', 'Ajman, United Arab Emirates'],
    mapsQuery: 'Amber Gem Tower, Sheikh Khalifa Bin Zayed Street, Ajman, UAE',
  },
];

export function mapsEmbedUrl(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

export function mapsLinkUrl(query: string): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}`;
}

export const businessLabUrl = 'https://businesslab.ae/';
