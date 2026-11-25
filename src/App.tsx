import { useLocation } from 'react-router';
import { contactConfig } from './config';
import Contact from './sections/Contact';
import SiteHeader from './components/SiteHeader';
import Seo from './components/Seo';
import { findRoute } from './routes';

/**
 * Site shell: header, the page for the current URL, the closing call to action
 * and footer, and the floating WhatsApp button. Pages are separate URLs that
 * are each prerendered to static HTML (see src/routes.tsx).
 *
 * The site's three ambient canvas effects (Silk/FlowField, Moonlit Ripple,
 * Rain on Glass) are never applied here as a full-page background — each one
 * lives scoped to a single section (PageHero's `atmosphere` prop, the
 * homepage pillars section) or inside a RainyGlassCard, never behind the
 * whole app.
 */
export default function App() {
  const location = useLocation();
  const route = findRoute(location.pathname);
  const { Page } = route;

  return (
    <div className="relative min-h-screen bg-background">
      <Seo config={route.seo} />

      <SiteHeader currentPath={route.path} />

      <main className="relative z-10">
        <Page />
      </main>

      <div className="relative z-10">
        <Contact showCta={route.closingCta} />
      </div>

      <a
        href={`https://wa.me/${contactConfig.phone.replace(/\+/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] font-bold text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:scale-110 hover:shadow-green-500/40"
        title="Chat on WhatsApp"
        aria-label="Chat with Four Pillars on WhatsApp"
      >
        WA
        <span className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/[0.06] bg-[#111] px-3 py-1.5 text-xs text-dim opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
