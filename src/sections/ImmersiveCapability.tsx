import { Home, Box, Sparkles, Hexagon, Circle, Square, SlidersHorizontal, RotateCw } from 'lucide-react';

/**
 * Homepage capability pitch: "Current", the Blue Ocean bioluminescent ray,
 * staged as the centerpiece inside decorative glassmorphic HUD chrome (nav
 * pill, side panel, dock), in the spirit of an "immersive WebGL product
 * viewer" reference the client liked. The HUD chrome is purely decorative
 * and desktop-only; mobile gets the ray and copy without the extra chrome.
 */
export default function ImmersiveCapability() {
  return (
    <section
      aria-labelledby="immersive-heading"
      className="relative overflow-hidden border-b border-white/[0.06] px-6 py-24 sm:px-10 sm:py-28 lg:px-12"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#060c1a]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 72% 32%, rgba(168,120,255,0.16), transparent 60%), radial-gradient(ellipse 55% 45% at 22% 72%, rgba(53,216,240,0.14), transparent 60%)',
        }}
      />

      <div className="relative mx-auto grid max-w-[1320px] items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
        <div>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50 sm:text-xs">
            Four Pillars / Craft
          </p>
          <h2
            id="immersive-heading"
            className="max-w-xl text-[clamp(2.2rem,4.6vw,4rem)] font-light uppercase leading-[0.98] tracking-tight text-foreground"
          >
            We build interfaces{' '}
            <span className="bg-gradient-to-r from-[#a878ff] via-[#6fe3ff] to-[#35d8f0] bg-clip-text text-transparent">
              people remember
            </span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-dim">
            The same attention that goes into a luxury product goes into how your site feels in the hand: the
            weight of a transition, the catch-light on a hover state, the way a page breathes as you scroll. It's
            the standard behind every build, not just the showcase pieces.
          </p>
          <a
            href="/services/"
            className="group mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground"
          >
            <span className="border-b border-white/30 pb-1 group-hover:border-white">See it in motion</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <div className="gem-stage relative mx-auto w-full max-w-[520px] py-14 lg:py-16">
          {/* Decorative HUD chrome — desktop only, purely atmospheric. */}
          <div
            aria-hidden="true"
            className="liquid-glass liquid-glass--flat absolute left-1/2 top-0 z-10 hidden -translate-x-1/2 items-center gap-4 rounded-full px-5 py-2.5 lg:flex"
          >
            <Home className="h-3.5 w-3.5 text-white/70" strokeWidth={1.5} />
            <span className="h-3 w-px bg-white/15" />
            <Box className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
            <span className="h-3 w-px bg-white/15" />
            <Sparkles className="h-3.5 w-3.5 text-white/70" strokeWidth={1.5} />
          </div>

          <div
            aria-hidden="true"
            className="liquid-glass liquid-glass--flat absolute right-0 top-1/2 z-10 hidden w-[72px] -translate-y-1/2 flex-col items-center gap-4 rounded-2xl p-3 lg:flex"
          >
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#35d8f0]" />
              <span className="h-2 w-2 rounded-full bg-[#a878ff]" />
              <span className="h-2 w-2 rounded-full bg-white/70" />
            </div>
            <div className="h-px w-full bg-white/10" />
            <SlidersHorizontal className="h-3.5 w-3.5 text-white/70" strokeWidth={1.5} />
            <div className="h-16 w-1 overflow-hidden rounded-full bg-white/10">
              <div className="h-1/2 w-full rounded-full bg-gradient-to-t from-[#35d8f0] to-[#a878ff]" />
            </div>
            <RotateCw className="h-3.5 w-3.5 text-white/70" strokeWidth={1.5} />
          </div>

          <div
            aria-hidden="true"
            className="liquid-glass liquid-glass--flat absolute bottom-0 left-1/2 z-10 hidden -translate-x-1/2 translate-y-1/2 items-center gap-4 rounded-full px-5 py-2.5 lg:flex"
          >
            <Hexagon className="h-3.5 w-3.5 text-accent" strokeWidth={1.5} />
            <Circle className="h-3.5 w-3.5 text-white/70" strokeWidth={1.5} />
            <Square className="h-3.5 w-3.5 text-white/70" strokeWidth={1.5} />
          </div>

          {/* Ambient glow behind the ray — doubles as the bioluminescence
              "Current" itself is named for. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[8%] rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(53,216,240,0.32) 0%, rgba(168,120,255,0.16) 55%, transparent 75%)',
            }}
          />
          <div className="relative mx-auto flex aspect-square w-full max-w-[420px] items-center justify-center">
            <img
              src="/creatures/current.webp"
              alt=""
              aria-hidden="true"
              className="h-[88%] w-auto max-w-none opacity-90 mix-blend-screen drop-shadow-[0_0_60px_rgba(53,216,240,0.45)]"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
