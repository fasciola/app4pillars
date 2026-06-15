import { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import {
  siteConfig,
  headerConfig,
  backgroundConfig,
  contactConfig,
} from './config';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Portfolio from './sections/Portfolio';
import Contact from './sections/Contact';
import { Menu, X } from 'lucide-react';

const SilkCascade = lazy(() => import('./components/FlowField'));
const MoonlitRipple = lazy(() => import('./components/MoonlitRipple'));
const RainOnGlass = lazy(() => import('./components/RainOnGlass'));

type BgMode = 'solid' | 'silk' | 'moonlit' | 'rain';
const BG_KEY = 'fourpillars-bg';
const BG_COLOR_KEY = 'fourpillars-bg-color';

function BackgroundToggle({
  bg,
  setBg,
  bgColor,
  setBgColor,
}: {
  bg: BgMode;
  setBg: (mode: BgMode) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center text-subtle hover:text-foreground transition-colors"
        title="Toggle Background"
      >
        <span className="relative z-10 text-xs">&#9680;</span>
      </button>

      {showMenu && (
        <>
          <div className="fixed inset-0 z-50" onClick={() => setShowMenu(false)} />
          <div className="absolute right-0 top-10 z-50 bg-[#111] border border-white/[0.06] rounded-lg py-1 min-w-[140px] shadow-2xl">
            {backgroundConfig.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  setBg(opt.id);
                  if (opt.id !== 'solid') setShowMenu(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                  bg === opt.id ? 'text-foreground' : 'text-muted hover:text-dim'
                }`}
              >
                {bg === opt.id && <span className="mr-1.5 text-accent">&#183;</span>}
                {opt.label}
              </button>
            ))}

            {bg === 'solid' && (
              <div className="px-3 py-2 border-t border-white/[0.06] mt-1 flex gap-2">
                {backgroundConfig.solidColors.map((c) => (
                  <button
                    key={c.color}
                    onClick={() => {
                      setBgColor(c.color);
                      setShowMenu(false);
                    }}
                    title={c.label}
                    className="w-5 h-5 rounded-full transition-transform hover:scale-110"
                    style={{
                      backgroundColor: c.color,
                      boxShadow:
                        bgColor === c.color
                          ? '0 0 0 1.5px #888'
                          : 'inset 0 0 0 1px rgba(255,255,255,0.15)',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function Navigation({
  bg,
  setBg,
  bgColor,
  setBgColor,
}: {
  bg: BgMode;
  setBg: (mode: BgMode) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'liquid-glass' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-14">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Four Pillars" className="h-20 w-auto" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {[
            { label: headerConfig.navServices, id: 'services' },
            { label: headerConfig.navPortfolio, id: 'portfolio' },
            { label: headerConfig.navContact, id: 'contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="px-4 py-1.5 text-xs text-dim hover:text-foreground transition-colors rounded-md hover:bg-white/[0.04]"
            >
              {item.label}
            </button>
          ))}
          <div className="ml-2">
            <BackgroundToggle
              bg={bg}
              setBg={setBg}
              bgColor={bgColor}
              setBgColor={setBgColor}
            />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <BackgroundToggle
            bg={bg}
            setBg={setBg}
            bgColor={bgColor}
            setBgColor={setBgColor}
          />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-8 h-8 flex items-center justify-center text-dim hover:text-foreground transition-colors"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden liquid-glass-strong border-t border-white/[0.04] px-6 py-4">
          {[
            { label: headerConfig.navServices, id: 'services' },
            { label: headerConfig.navPortfolio, id: 'portfolio' },
            { label: headerConfig.navContact, id: 'contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="block w-full text-left px-4 py-3 text-sm text-dim hover:text-foreground transition-colors rounded-lg hover:bg-white/[0.04]"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

export default function App() {
  const [bg, setBg] = useState<BgMode>(() => {
    const saved = localStorage.getItem(BG_KEY);
    if (saved === 'black') return 'solid';
    return (saved as BgMode) || backgroundConfig.defaultMode;
  });
  const [bgColor, setBgColor] = useState(
    () => localStorage.getItem(BG_COLOR_KEY) || backgroundConfig.defaultSolidColor
  );

  useEffect(() => {
    localStorage.setItem(BG_KEY, bg);
  }, [bg]);

  useEffect(() => {
    localStorage.setItem(BG_COLOR_KEY, bgColor);
  }, [bgColor]);

  useEffect(() => {
    document.title = siteConfig.title;
    const metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = siteConfig.description;
    }
    document.documentElement.lang = siteConfig.language;
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div
      className="min-h-screen relative"
      style={bg === 'solid' ? { backgroundColor: bgColor } : { background: '#000' }}
    >
      <Suspense fallback={null}>
        {bg === 'silk' && <SilkCascade />}
        {bg === 'moonlit' && <MoonlitRipple />}
        {bg === 'rain' && <RainOnGlass />}
      </Suspense>

      <Navigation
        bg={bg}
        setBg={setBg}
        bgColor={bgColor}
        setBgColor={setBgColor}
      />

      <main className="relative z-10">
        <Hero
          onExplore={() => scrollTo('portfolio')}
          onServices={() => scrollTo('services')}
        />
        <Services />
        <Portfolio />
        <Contact />
      </main>

      <a
        href={`https://wa.me/${contactConfig.phone.replace(/\+/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-green-500/20 flex items-center justify-center hover:scale-110 hover:shadow-green-500/40 transition-all duration-300 group text-white font-bold"
        title="Chat on WhatsApp"
      >
        WA
        <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#111] border border-white/[0.06] rounded-lg text-xs text-dim whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}