import { servicesConfig } from './config';
import { websiteDesignDubaiFaqs } from './content/websiteDesignDubaiFaqs';

export interface SeoPageConfig {
  title: string;
  description: string;
  canonical: string;
  image: string;
  imageAlt: string;
  schema: Record<string, unknown>;
}

const organization = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': 'https://4pillarsweb.online/#organization',
  name: 'Four Pillars Web Design',
  url: 'https://4pillarsweb.online/',
  logo: 'https://4pillarsweb.online/logo.png',
  image: 'https://4pillarsweb.online/og-image.jpg',
  email: 'faisal.alamir@4pillarsweb.online',
  telephone: '+971567074922',
  description:
    'Website design and digital experience services for businesses in Dubai and across the United Arab Emirates.',
  areaServed: [
    { '@type': 'City', name: 'Dubai' },
    { '@type': 'Country', name: 'United Arab Emirates' },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+971567074922',
    contactType: 'sales',
    areaServed: 'AE',
    availableLanguage: ['English', 'Arabic'],
  },
  // Mirrors the six services shown on the homepage.
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web design and digital services',
    itemListElement: servicesConfig.items.map((item) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: item.title, description: item.description },
    })),
  },
};

export const homeSeo: SeoPageConfig = {
  title: 'Website Design Dubai | Web Design Company UAE | Four Pillars',
  description:
    'Four Pillars is a website design company serving Dubai and the UAE, creating premium, fast and SEO-ready websites, e-commerce experiences and conversion-focused digital platforms.',
  canonical: 'https://4pillarsweb.online/',
  image: 'https://4pillarsweb.online/og-image.jpg',
  imageAlt: 'Four Pillars Web Design: cinematic website design for Dubai and UAE brands',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      {
        '@type': 'WebSite',
        '@id': 'https://4pillarsweb.online/#website',
        url: 'https://4pillarsweb.online/',
        name: 'Four Pillars Web Design',
        publisher: { '@id': 'https://4pillarsweb.online/#organization' },
        inLanguage: 'en-AE',
      },
    ],
  },
};

export const websiteDesignDubaiSeo: SeoPageConfig = {
  title: 'Website Design Dubai | Professional Web Design Services | Four Pillars',
  description:
    'Website design in Dubai for ambitious UAE businesses. Four Pillars creates premium, responsive, SEO-ready websites, e-commerce stores and conversion-focused digital experiences.',
  canonical: 'https://4pillarsweb.online/website-design-dubai/',
  image: 'https://4pillarsweb.online/og-website-design-dubai.jpg',
  imageAlt: 'A luxury jewellery website designed by Four Pillars, shown on a desktop monitor',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      {
        '@type': 'WebPage',
        '@id': 'https://4pillarsweb.online/website-design-dubai/#webpage',
        url: 'https://4pillarsweb.online/website-design-dubai/',
        name: 'Website Design Dubai | Four Pillars',
        description:
          'Professional website design services for businesses in Dubai and across the UAE.',
        isPartOf: { '@id': 'https://4pillarsweb.online/#website' },
        about: { '@id': 'https://4pillarsweb.online/#organization' },
        inLanguage: 'en-AE',
      },
      {
        '@type': 'Service',
        '@id': 'https://4pillarsweb.online/website-design-dubai/#service',
        name: 'Website Design Dubai',
        serviceType: 'Website design and web development',
        provider: { '@id': 'https://4pillarsweb.online/#organization' },
        areaServed: [
          { '@type': 'City', name: 'Dubai' },
          { '@type': 'Country', name: 'United Arab Emirates' },
        ],
        url: 'https://4pillarsweb.online/website-design-dubai/',
        description:
          'Premium responsive website design, e-commerce design, SEO-ready development, performance optimization and conversion-focused digital experiences for Dubai businesses.',
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://4pillarsweb.online/website-design-dubai/#faq',
        mainEntity: websiteDesignDubaiFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://4pillarsweb.online/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Website Design Dubai',
            item: 'https://4pillarsweb.online/website-design-dubai/',
          },
        ],
      },
    ],
  },
};
