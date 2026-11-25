import type { ComponentType } from 'react';
import type { SeoPageConfig } from './seo';
import {
  aboutSeo,
  contactSeo,
  homeSeo,
  restaurantWebsitesSeo,
  notFoundSeo,
  servicesSeo,
  showcaseSeo,
  websiteDesignDubaiSeo,
  websiteDesignAjmanSeo,
  websiteDesignAbuDhabiSeo,
  workSeo,
} from './seo';
import HomePage from './pages/site/HomePage';
import ServicesPage from './pages/site/ServicesPage';
import WorkPage from './pages/site/WorkPage';
import ShowcasePage from './pages/site/ShowcasePage';
import AboutPage from './pages/site/AboutPage';
import ContactPage from './pages/site/ContactPage';
import NotFoundPage from './pages/site/NotFoundPage';
import WebsiteDesignDubai from './pages/WebsiteDesignDubai';
import WebsiteDesignAjman from './pages/WebsiteDesignAjman';
import WebsiteDesignAbuDhabi from './pages/WebsiteDesignAbuDhabi';
import RestaurantWebsitesPage from './pages/site/RestaurantWebsitesPage';

export interface SiteRoute {
  /** Always with a trailing slash; the prerender writes <path>index.html. */
  path: string;
  Page: ComponentType;
  seo: SeoPageConfig;
  /** Show the "Start a Project" block above the footer. */
  closingCta: boolean;
}

/**
 * Every page on the site. App.tsx picks one by URL, entry-server renders each
 * to static HTML, and scripts/prerender.mjs writes them to dist/.
 */
export const routes: SiteRoute[] = [
  { path: '/', Page: HomePage, seo: homeSeo, closingCta: true },
  { path: '/services/', Page: ServicesPage, seo: servicesSeo, closingCta: true },
  { path: '/work/', Page: WorkPage, seo: workSeo, closingCta: true },
  { path: '/showcase/', Page: ShowcasePage, seo: showcaseSeo, closingCta: true },
  { path: '/about/', Page: AboutPage, seo: aboutSeo, closingCta: true },
  { path: '/contact/', Page: ContactPage, seo: contactSeo, closingCta: false },
  { path: '/website-design-dubai/', Page: WebsiteDesignDubai, seo: websiteDesignDubaiSeo, closingCta: true },
  { path: '/website-design-ajman/', Page: WebsiteDesignAjman, seo: websiteDesignAjmanSeo, closingCta: true },
  { path: '/website-design-abu-dhabi/', Page: WebsiteDesignAbuDhabi, seo: websiteDesignAbuDhabiSeo, closingCta: true },
  { path: '/restaurant-website-design-dubai/', Page: RestaurantWebsitesPage, seo: restaurantWebsitesSeo, closingCta: true },
];

export const notFoundRoute: SiteRoute = {
  path: '/404/',
  Page: NotFoundPage,
  seo: notFoundSeo,
  closingCta: false,
};

/** "/services", "/services/index.html" and "/services/" all map to "/services/". */
export function normalizePath(pathname: string): string {
  let path = pathname.replace(/index\.html$/, '');
  if (!path.endsWith('/')) path += '/';
  return path.replace(/\/{2,}/g, '/');
}

export function findRoute(pathname: string): SiteRoute {
  const path = normalizePath(pathname);
  return routes.find((route) => route.path === path) ?? notFoundRoute;
}
