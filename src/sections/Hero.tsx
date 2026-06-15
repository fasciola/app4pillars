import { heroConfig } from '../config';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  onServices: () => void;
}

export default function Hero({ onExplore, onServices }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      {/* Cinematic butterfly artwork layer */}
      <img
        src="/hero-butterfly.png"
        alt="Luminous gold and peach butterfly on a black cinematic background"
        className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
        loading="eager"
      />

      {/* Dark luxury gradient for text readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(255,177,94,0.10),transparent_30%),linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.42)_42%,rgba(0,0,0,0.14)_60%,rgba(0,0,0,0.80)_100%)]" />

      {/* Fine grid / premium editorial structure */}
      <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.20)_1px,transparent_1px)] bg-[size:25%_25%]" />

      {/* Warm corner light leak */}
      <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-[#f2a14a]/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="grid min-h-[72vh] grid-cols-1 lg:grid-cols-12 items-center gap-10">
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Small editorial label */}
            <div className="inline-flex items-center gap-3 mb-8 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#f3b66b] shadow-[0_0_18px_rgba(243,182,107,0.9)]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-white/70">
                Four Pillars Digital Atelier
              </span>
            </div>

            <h1 className="font-light tracking-[-0.08em] leading-[0.82] text-[clamp(4.6rem,15vw,12rem)] text-white/95 whitespace-pre-line mix-blend-screen">
              {heroConfig.headline}
            </h1>

            <p className="mt-8 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-white/72 leading-relaxed">
              {heroConfig.subheadline}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onExplore}
                className="liquid-glass-strong px-8 py-4 rounded-full text-foreground text-sm font-medium tracking-wide hover:scale-105 transition-transform duration-300 flex items-center gap-2 group"
              >
                <span className="relative z-10">{heroConfig.ctaPrimary}</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onServices}
                className="px-8 py-4 rounded-full text-sm text-white/65 hover:text-white transition-colors duration-300 border border-white/15 hover:border-white/30 bg-black/10 backdrop-blur-sm"
              >
                {heroConfig.ctaSecondary}
              </button>
            </div>
          </div>

          {/* Decorative side note similar to premium hero references */}
          <div className="hidden lg:flex lg:col-span-5 justify-end">
            <div className="max-w-xs border border-white/10 bg-black/20 backdrop-blur-md p-6 text-left shadow-2xl">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#f3b66b] mb-3">
                Cinematic Presence
              </p>
              <p className="text-sm leading-relaxed text-white/62">
                A luminous first impression built with atmosphere, depth, elegant typography, and focused conversion paths.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-[10px] text-white/35 uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4 text-white/35" />
      </div>
    </section>
  );
}