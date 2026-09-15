import { heroConfig } from '../config';
import { ArrowRight, ChevronDown } from 'lucide-react';
import HeroBackgroundVideo from '../components/HeroBackgroundVideo';

interface HeroProps {
  onExplore: () => void;
  onServices: () => void;
}

export default function Hero({ onExplore, onServices }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black text-white">
      <HeroBackgroundVideo />

      {/* Lighter cinematic gradient: preserve text contrast without burying the video. */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.62)_0%,rgba(0,0,0,0.44)_28%,rgba(0,0,0,0.18)_55%,rgba(0,0,0,0.10)_75%,rgba(0,0,0,0.35)_100%)]" />

      {/* Fine grid / premium editorial structure */}
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] bg-[size:25%_25%]" />

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/40 via-black/15 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-20">
        <div className="min-h-[72vh] flex items-center">
          <div className="max-w-5xl text-left">
            <div className="inline-flex items-center gap-3 mb-7 rounded-full border border-white/15 bg-black/15 px-5 py-2 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-white/80 shadow-[0_0_18px_rgba(255,255,255,0.55)]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-white/70">
                Dubai · UAE Website Design
              </span>
            </div>

            <h1 className="font-light tracking-[-0.08em] leading-[0.84] text-[clamp(3.6rem,9vw,8.5rem)] text-white/95 whitespace-pre-line drop-shadow-[0_10px_35px_rgba(0,0,0,0.45)]">
              Website Design in Dubai{`\n`}Crafted to Perform
            </h1>

            <p className="mt-7 max-w-2xl text-base sm:text-lg text-white/80 leading-relaxed drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)]">
              Four Pillars creates premium, high-performance websites for businesses in Dubai and across the UAE — combining strategy, design, development and conversion-focused performance.
            </p>

            <a
              href="/website-design-dubai/"
              className="mt-5 inline-flex items-center gap-2 text-xs sm:text-sm text-white/72 hover:text-white transition-colors"
            >
              Explore our website design services in Dubai
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <div className="mt-9 flex flex-col sm:flex-row items-start gap-4">
              <button
                onClick={onExplore}
                className="liquid-glass-strong px-8 py-4 rounded-full text-foreground text-sm font-medium tracking-wide hover:scale-105 transition-transform duration-300 flex items-center gap-2 group"
              >
                <span className="relative z-10">{heroConfig.ctaPrimary}</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onServices}
                className="px-8 py-4 rounded-full text-sm text-white/78 hover:text-white transition-colors duration-300 border border-white/15 hover:border-white/30 bg-black/10 backdrop-blur-sm"
              >
                {heroConfig.ctaSecondary}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden xl:block absolute right-12 bottom-24 z-10 max-w-sm border border-white/10 bg-black/12 backdrop-blur-md p-6 text-left shadow-2xl">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/65 mb-3">
          Web Design · Dubai · UAE
        </p>
        <p className="text-sm leading-relaxed text-white/70">
          Distinctive website design supported by responsive development, performance, SEO foundations and focused conversion paths.
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] text-white/40 uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4 text-white/40" />
      </div>
    </section>
  );
}
