import { heroConfig } from '../config';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onServices: () => void;
}

export default function Hero({ onExplore, onServices }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Pillars decoration */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1 h-12 bg-accent/40 rounded-full"
              style={{
                animation: `pillarGlow 3s ease-in-out ${i * 0.3}s infinite alternate`,
              }}
            />
          ))}
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-foreground tracking-tight leading-[0.95] mb-8 whitespace-pre-line">
          {heroConfig.headline}
        </h1>

        <p className="text-base sm:text-lg text-dim max-w-2xl mx-auto mb-12 leading-relaxed">
          {heroConfig.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExplore}
            className="liquid-glass-strong px-8 py-4 rounded-full text-foreground text-sm font-medium tracking-wide hover:scale-105 transition-transform duration-300 flex items-center gap-2 group"
          >
            <span className="relative z-10">{heroConfig.ctaPrimary}</span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onServices}
            className="px-8 py-4 rounded-full text-sm text-dim hover:text-foreground transition-colors duration-300 border border-white/10 hover:border-white/20"
          >
            {heroConfig.ctaSecondary}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] text-subtle uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4 text-subtle" />
      </div>

      <style>{`
        @keyframes pillarGlow {
          from { opacity: 0.3; box-shadow: 0 0 4px rgba(200,149,108,0.2); }
          to { opacity: 0.8; box-shadow: 0 0 12px rgba(200,149,108,0.5); }
        }
      `}</style>
    </section>
  );
}
