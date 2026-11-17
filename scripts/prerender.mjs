// Runs after `vite build` and `build-ssr.mjs`. Injects real, crawlable page
// content into the shipped HTML (replacing the previous approach of shipping
// an empty <div id="root"> and only swapping <head> meta tags). Replaces the
// old scripts/generate-seo-pages.mjs, which only handled meta tags.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { renderPath, routes, notFoundRoute } from '../dist/server/entry-server.js';

const dist = path.resolve('dist/public');
const rootIndexPath = path.join(dist, 'index.html');
const rootHtml = await readFile(rootIndexPath, 'utf8');

const ROOT_DIV = '<div id="root"></div>';
if (!rootHtml.includes(ROOT_DIV)) {
  throw new Error(
    'Expected to find <div id="root"></div> in the built index.html — the Vite output shape may have changed.',
  );
}

// Writes one page's title, description, canonical, Open Graph, Twitter and
// JSON-LD into the shipped <head>. The values come from src/seo.ts, the same
// file the client uses at runtime, so the static and live heads always agree.
const attr = (value) => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
function applySeo(html, seo) {
  const set = (pattern, replacement) => {
    if (!pattern.test(html)) throw new Error(`prerender: no match for ${pattern}`);
    html = html.replace(pattern, replacement);
  };
  set(/<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`);
  set(/<meta name="description" content="[^"]*" \/>/i, `<meta name="description" content="${attr(seo.description)}" />`);
  set(/<link rel="canonical" href="[^"]*" \/>/i, `<link rel="canonical" href="${seo.canonical}" />`);
  set(/<meta property="og:title" content="[^"]*" \/>/i, `<meta property="og:title" content="${attr(seo.title)}" />`);
  set(/<meta property="og:description" content="[^"]*" \/>/i, `<meta property="og:description" content="${attr(seo.description)}" />`);
  set(/<meta property="og:url" content="[^"]*" \/>/i, `<meta property="og:url" content="${seo.canonical}" />`);
  set(/<meta property="og:image" content="[^"]*" \/>/i, `<meta property="og:image" content="${seo.image}" />`);
  set(/<meta property="og:image:alt" content="[^"]*" \/>/i, `<meta property="og:image:alt" content="${attr(seo.imageAlt)}" />`);
  set(/<meta name="twitter:title" content="[^"]*" \/>/i, `<meta name="twitter:title" content="${attr(seo.title)}" />`);
  set(/<meta name="twitter:description" content="[^"]*" \/>/i, `<meta name="twitter:description" content="${attr(seo.description)}" />`);
  set(/<meta name="twitter:image" content="[^"]*" \/>/i, `<meta name="twitter:image" content="${seo.image}" />`);
  set(
    /<script id="seo-schema" type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script id="seo-schema" type="application/ld+json">${JSON.stringify(seo.schema).replace(/</g, '\\u003c')}</script>`,
  );
  set(
    /<meta name="robots" content="[^"]*" \/>/i,
    `<meta name="robots" content="${
      seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    }" />`,
  );
  return html;
}

// One static HTML file per page: dist/public/<path>/index.html, plus 404.html
// (GitHub Pages serves it for any unknown address).
for (const route of routes) {
  const html = applySeo(rootHtml, route.seo).replace(ROOT_DIV, `<div id="root">${renderPath(route.path)}</div>`);
  const dir = path.join(dist, route.path);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html, 'utf8');
}

const notFoundHtml = applySeo(rootHtml, notFoundRoute.seo).replace(
  ROOT_DIV,
  `<div id="root">${renderPath(notFoundRoute.path)}</div>`,
);
await writeFile(path.join(dist, '404.html'), notFoundHtml, 'utf8');

console.log(`Prerendered: ${routes.map((route) => route.path).join(' ')} and 404.html`);
