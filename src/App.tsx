import { useState, useEffect, useRef, lazy, Suspense, useCallback } from 'react';
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
import { Menu, X, Github } from 'lucide-react';

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
        {/* Brand */}
<div className="flex items-center gap-2">
  <img src="/logo.png" alt="Four Pillars" className="h-16 w-auto" />
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
      {/* Cinematic Backgrounds */}
      <Suspense fallback={null}>
        {bg === 'silk' && <SilkCascade />}
        {bg === 'moonlit' && <MoonlitRipple />}
        {bg === 'rain' && <RainOnGlass />}
      </Suspense>

      {/* Navigation */}
      <Navigation
        bg={bg}
        setBg={setBg}
        bgColor={bgColor}
        setBgColor={setBgColor}
      />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero
          onExplore={() => scrollTo('portfolio')}
          onServices={() => scrollTo('services')}
        />
        <Services />
        <Portfolio />
        <Contact />
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${contactConfig.phone.replace(/\+/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-green-500/20 flex items-center justify-center hover:scale-110 hover:shadow-green-500/40 transition-all duration-300 group"
        title="Chat on WhatsApp"
      >
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        {/* Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#111] border border-white/[0.06] rounded-lg text-xs text-dim whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
