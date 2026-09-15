import { useEffect } from 'react';
import type { SeoPageConfig } from '../seo';

function ensureMeta(selector: string, attribute: 'name' | 'property', key: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  return element;
}

export default function Seo({ config }: { config: SeoPageConfig }) {
  useEffect(() => {
    document.title = config.title;
    document.documentElement.lang = 'en-AE';

    ensureMeta('meta[name="description"]', 'name', 'description').content = config.description;
    ensureMeta('meta[name="robots"]', 'name', 'robots').content =
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = config.canonical;

    const ogValues: Record<string, string> = {
      'og:type': 'website',
      'og:locale': 'en_AE',
      'og:site_name': 'Four Pillars Web Design',
      'og:title': config.title,
      'og:description': config.description,
      'og:url': config.canonical,
      'og:image': config.image,
      'og:image:alt': 'Four Pillars Web Design digital experience',
    };

    Object.entries(ogValues).forEach(([property, content]) => {
      ensureMeta(`meta[property="${property}"]`, 'property', property).content = content;
    });

    const twitterValues: Record<string, string> = {
      'twitter:card': 'summary_large_image',
      'twitter:title': config.title,
      'twitter:description': config.description,
      'twitter:image': config.image,
    };

    Object.entries(twitterValues).forEach(([name, content]) => {
      ensureMeta(`meta[name="${name}"]`, 'name', name).content = content;
    });

    let schema = document.getElementById('seo-schema') as HTMLScriptElement | null;
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'seo-schema';
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify(config.schema);
  }, [config]);

  return null;
}
