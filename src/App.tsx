import { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router';
import { backgroundConfig, contactConfig } from './config';
import type { BackgroundMode } from './config';
import Contact from './sections/Contact';
import SiteHeader from './components/SiteHeader';
import Seo from './components/Seo';
import { findRoute } from './routes';

const SilkCascade = lazy(() => import('./components/FlowField'));
const MoonlitRipple = lazy(() => import('./components/MoonlitRipple'));
const RainOnGlass = lazy(() => import('./components/RainOnGlass'));

const BG_KEY = 'fourpillars-bg';
const BG_COLOR_KEY = 'fourpillars-bg-color';
const isBgMode = (value: string | null): value is BackgroundMode =>
  value === 'solid' || value === 'silk' || value === 'moonlit' || value === 'rain';

function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Site shell: header, the page for the current URL, the closing call to action
 * and footer, and the floating WhatsApp button. Pages are separate URLs that
 * are each prerendered to static HTML (see src/routes.tsx).
 */
export default function App() {
  const location = useLocation();
  const route = findRoute(location.pathname);
  const { Page } = route;

  // The animated backgrounds are opt-in from the header toggle; the default is
  // a plain colour because the canvas effects keep the CPU/GPU busy.
  const [bg, setBg] = useState<BackgroundMode>(() => {
    const saved = readStorage(BG_KEY);
    if (saved === 'black') return 'solid';
    return isBgMode(saved) ? saved : backgroundConfig.defaultMode;
  });
  const [bgColor, setBgColor] = useState(() => readStorage(BG_COLOR_KEY) || backgroundConfig.defaultSolidColor);

  useEffect(() => {
    try {
      localStorage.setItem(BG_KEY, bg);
      localStorage.setItem(BG_COLOR_KEY, bgColor);
    } catch {
      /* storage unavailable: the choice just won't persist */
    }
  }, [bg, bgColor]);

  return (
    <div className="relative min-h-screen" style={bg === 'solid' ? { backgroundColor: bgColor } : { background: '#000' }}>
      <Seo config={route.seo} />

      <Suspense fallback={null}>
        {bg === 'silk' && <SilkCascade />}
        {bg === 'moonlit' && <MoonlitRipple />}
        {bg === 'rain' && <RainOnGlass />}
      </Suspense>

      <SiteHeader currentPath={route.path} bg={bg} setBg={setBg} bgColor={bgColor} setBgColor={setBgColor} />

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
