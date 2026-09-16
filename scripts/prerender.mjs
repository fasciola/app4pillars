// Runs after `vite build` and `build-ssr.mjs`. Injects real, crawlable page
// content into the shipped HTML (replacing the previous approach of shipping
// an empty <div id="root"> and only swapping <head> meta tags). Replaces the
// old scripts/generate-seo-pages.mjs, which only handled meta tags.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { renderHome, renderWebsiteDesignDubai } from '../dist/server/entry-server.js';

const dist = path.resolve('dist/public');
const rootIndexPath = path.join(dist, 'index.html');
const rootHtml = await readFile(rootIndexPath, 'utf8');

const ROOT_DIV = '<div id="root"></div>';
if (!rootHtml.includes(ROOT_DIV)) {
  throw new Error(
    'Expected to find <div id="root"></div> in the built index.html — the Vite output shape may have changed.',
  );
}

// 1. Home page: inject the real Hero/Services/PracticeCube/Portfolio/Contact
// markup into the existing (already-correct) homepage <head> meta.
const homeHtml = rootHtml.replace(ROOT_DIV, `<div id="root">${renderHome()}</div>`);
await writeFile(rootIndexPath, homeHtml, 'utf8');

// 2. /website-design-dubai/: same content-injection technique, plus its own
// title/description/canonical/OG/Twitter/schema so it's a real, independently
// indexable page rather than a meta-only shell.
const landing = {
  title: 'Website Design Dubai | Professional Web Design Services | Four Pillars',
  description:
    'Website design in Dubai for ambitious UAE businesses. Four Pillars creates premium, responsive, SEO-ready websites, e-commerce stores and conversion-focused digital experiences.',
  canonical: 'https://4pillarsweb.online/website-design-dubai/',
  image: 'https://4pillarsweb.online/project-fluid-studio.png',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': 'https://4pillarsweb.online/#organization',
        name: 'Four Pillars Web Design',
        url: 'https://4pillarsweb.online/',
        logo: 'https://4pillarsweb.online/logo.png',
        email: 'faisal.alamir@4pillarsweb.online',
        telephone: '+971567074922',
        areaServed: [
          { '@type': 'City', name: 'Dubai' },
          { '@type': 'Country', name: 'United Arab Emirates' },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': 'https://4pillarsweb.online/website-design-dubai/#webpage',
        url: 'https://4pillarsweb.online/website-design-dubai/',
        name: 'Website Design Dubai | Four Pillars',
        description: 'Professional website design services for businesses in Dubai and across the UAE.',
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
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://4pillarsweb.online/' },
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

let landingHtml = rootHtml
  .replace(/<title>[\s\S]*?<\/title>/i, `<title>${landing.title}</title>`)
  .replace(
    /<meta name="description" content="[^"]*" \/>/i,
    `<meta name="description" content="${landing.description}" />`,
  )
  .replace(/<link rel="canonical" href="[^"]*" \/>/i, `<link rel="canonical" href="${landing.canonical}" />`)
  .replace(/<meta property="og:title" content="[^"]*" \/>/i, `<meta property="og:title" content="${landing.title}" />`)
  .replace(
    /<meta property="og:description" content="[^"]*" \/>/i,
    `<meta property="og:description" content="${landing.description}" />`,
  )
  .replace(/<meta property="og:url" content="[^"]*" \/>/i, `<meta property="og:url" content="${landing.canonical}" />`)
  .replace(/<meta property="og:image" content="[^"]*" \/>/i, `<meta property="og:image" content="${landing.image}" />`)
  .replace(/<meta name="twitter:title" content="[^"]*" \/>/i, `<meta name="twitter:title" content="${landing.title}" />`)
  .replace(
    /<meta name="twitter:description" content="[^"]*" \/>/i,
    `<meta name="twitter:description" content="${landing.description}" />`,
  )
  .replace(/<meta name="twitter:image" content="[^"]*" \/>/i, `<meta name="twitter:image" content="${landing.image}" />`)
  .replace(
    /<script id="seo-schema" type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script id="seo-schema" type="application/ld+json">${JSON.stringify(landing.schema)}</script>`,
  )
  .replace(ROOT_DIV, `<div id="root">${renderWebsiteDesignDubai()}</div>`);

const routeDir = path.join(dist, 'website-design-dubai');
await mkdir(routeDir, { recursive: true });
await writeFile(path.join(routeDir, 'index.html'), landingHtml, 'utf8');

console.log('Prerendered: / (home) and /website-design-dubai/');
