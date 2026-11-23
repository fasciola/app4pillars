import { servicesConfig } from './config';
import { restaurantFaqs } from './content/restaurantWebsites';
import { websiteDesignDubaiFaqs } from './content/websiteDesignDubaiFaqs';
import { serviceDetails } from './content/site';

export interface SeoPageConfig {
  title: string;
  description: string;
  canonical: string;
  image: string;
  imageAlt: string;
  schema: Record<string, unknown>;
  /** Keep this page out of search results (used by the 404 page). */
  noindex?: boolean;
}

const organization = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': 'https://4pillarsweb.online/#organization',
  name: 'Four Pillars Web Design',
  url: 'https://4pillarsweb.online/',
  logo: 'https://4pillarsweb.online/logo.png',
  image: 'https://4pillarsweb.online/og-image.jpg',
  email: 'info@fourpillarsweb.com',
  parentOrganization: { '@type': 'Organization', name: 'Business Lab' },
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

const SITE = 'https://4pillarsweb.online';

/** WebPage + breadcrumb for an inner page, plus any extra graph nodes. */
function innerPage(
  path: string,
  name: string,
  description: string,
  type: string,
  extra: Record<string, unknown>[] = [],
): Record<string, unknown> {
  const url = `${SITE}${path}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      {
        '@type': type,
        '@id': `${url}#webpage`,
        url,
        name,
        description,
        isPartOf: { '@id': `${SITE}/#website` },
        about: { '@id': `${SITE}/#organization` },
        inLanguage: 'en-AE',
      },
      ...extra,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name, item: url },
        ],
      },
    ],
  };
}

const servicesDescription =
  'Website design and development, e-commerce, SEO and performance, experience strategy, brand design and conversion optimization for businesses in Dubai and the UAE.';

export const servicesSeo: SeoPageConfig = {
  title: 'Web Design & Digital Services in Dubai | Four Pillars',
  description: servicesDescription,
  canonical: `${SITE}/services/`,
  image: `${SITE}/og-image.jpg`,
  imageAlt: 'Four Pillars Web Design services for Dubai and UAE businesses',
  schema: innerPage('/services/', 'Services', servicesDescription, 'WebPage', [
    {
      '@type': 'ItemList',
      name: 'Four Pillars services',
      itemListElement: serviceDetails.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: service.title,
          description: service.body,
          url: `${SITE}/services/#${service.id}`,
          provider: { '@id': `${SITE}/#organization` },
          areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
        },
      })),
    },
  ]),
};

const workDescription =
  'Selected website design projects by Four Pillars for brands in luxury retail, business setup, healthcare, real estate, food, creative studios, furniture and fashion.';

export const workSeo: SeoPageConfig = {
  title: 'Website Design Portfolio | Dubai & UAE Projects | Four Pillars',
  description: workDescription,
  canonical: `${SITE}/work/`,
  image: `${SITE}/og-website-design-dubai.jpg`,
  imageAlt: 'A website designed by Four Pillars, shown on a desktop monitor',
  schema: innerPage('/work/', 'Work', workDescription, 'CollectionPage'),
};

const showcaseDescription =
  'Interactive website concept builds by Four Pillars: scroll-assembled product scenes, a fashion depth carousel, a colour-changing tech product hero, scroll-driven menus and a real-time 3D fish.';

export const showcaseSeo: SeoPageConfig = {
  title: 'Interactive Website Showcase | Scroll & 3D Concepts | Four Pillars',
  description: showcaseDescription,
  canonical: `${SITE}/showcase/`,
  image: `${SITE}/og-image.jpg`,
  imageAlt: 'Four Pillars interactive website concept builds',
  schema: innerPage('/showcase/', 'Showcase', showcaseDescription, 'CollectionPage'),
};

const aboutDescription =
  'Four Pillars, a brand of Business Lab, is a Dubai web design studio combining strategy, design, development and performance to build websites that look distinctive and win enquiries.';

export const aboutSeo: SeoPageConfig = {
  title: 'About Four Pillars | Web Design Studio in Dubai',
  description: aboutDescription,
  canonical: `${SITE}/about/`,
  image: `${SITE}/og-image.jpg`,
  imageAlt: 'About Four Pillars Web Design, Dubai',
  schema: innerPage('/about/', 'About', aboutDescription, 'AboutPage'),
};

const contactDescription =
  'Start a website project with Four Pillars in Dubai. Message us on WhatsApp at +971 56 707 4922 or email info@fourpillarsweb.com.';

export const contactSeo: SeoPageConfig = {
  title: 'Contact Four Pillars | Start a Website Project in Dubai',
  description: contactDescription,
  canonical: `${SITE}/contact/`,
  image: `${SITE}/og-image.jpg`,
  imageAlt: 'Contact Four Pillars Web Design',
  schema: innerPage('/contact/', 'Contact', contactDescription, 'ContactPage'),
};

export const restaurantWebsitesSeo: SeoPageConfig = {
  title: 'Restaurant & Café Website Design Dubai | Four Pillars',
  description:
    'Four Pillars designs websites for Dubai restaurants and café groups, with mobile QR menus, reservation links and dedicated pages for every branch.',
  canonical: `${SITE}/restaurant-website-design-dubai/`,
  image: `${SITE}/og-image.jpg`,
  imageAlt: 'Four Pillars restaurant and café website design in Dubai',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      {
        '@type': 'WebPage',
        '@id': `${SITE}/restaurant-website-design-dubai/#webpage`,
        url: `${SITE}/restaurant-website-design-dubai/`,
        name: 'Restaurant & Café Website Design Dubai | Four Pillars',
        isPartOf: { '@id': `${SITE}/#website` },
        about: { '@id': `${SITE}/#organization` },
        inLanguage: 'en-AE',
      },
      {
        '@type': 'Service',
        '@id': `${SITE}/restaurant-website-design-dubai/#service`,
        name: 'Restaurant and café website design',
        serviceType: 'Restaurant website design, QR menu design',
        provider: { '@id': `${SITE}/#organization` },
        areaServed: [
          { '@type': 'City', name: 'Dubai' },
          { '@type': 'Country', name: 'United Arab Emirates' },
        ],
        url: `${SITE}/restaurant-website-design-dubai/`,
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE}/restaurant-website-design-dubai/#faq`,
        mainEntity: restaurantFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  },
};

export const notFoundSeo: SeoPageConfig = {
  title: 'Page not found | Four Pillars Web Design',
  description: 'This page does not exist. Explore Four Pillars web design services, work and showcase.',
  canonical: `${SITE}/`,
  image: `${SITE}/og-image.jpg`,
  imageAlt: 'Four Pillars Web Design',
  noindex: true,
  schema: { '@context': 'https://schema.org', '@graph': [organization] },
};
