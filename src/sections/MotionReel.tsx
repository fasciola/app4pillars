import { useEffect, useRef } from 'react';

const clips = [
  { id: 'jellyfish', src: '/motion/jellyfish.mp4', poster: '/motion/jellyfish-poster.webp', label: 'Reef' },
  { id: 'glass-creature', src: '/motion/glass-creature.mp4', poster: '/motion/glass-creature-poster.webp', label: 'Drift' },
];

/** Alternating cyan / violet glow per card, echoing the Blue Ocean palette. */
const dotColors = ['bg-[#35d8f0]', 'bg-[#a878ff]'];

/** Short tagline shown on the frosted glass panel over each clip. */
const taglines: Record<string, string> = {
  jellyfish: 'Full-bleed video as the section itself, not a framed thumbnail.',
  'glass-creature': 'A liquid-glass panel sits on top, so the motion reads straight through it.',
};

/**
 * Homepage motion strip: two short looping clips, each filling its own
 * full-bleed section as the background, with a frosted liquid-glass panel
 * floating on top so the clip stays visible — blurred, not hidden — behind
 * it. Each video loads and plays only while it is on screen, stays muted,
 * and is skipped (poster only) for visitors who asked for reduced motion or
 * reduced data.
 */
function LoopClip({ src, poster, className = '' }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || typeof IntersectionObserver === 'undefined') return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || connection?.saveData) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = src;
          video.play()?.catch(() => undefined);
        } else if (!video.paused) {
          video.pause();
        }
      },
      { rootMargin: '200px 0px', threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      width={1280}
      height={720}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

export default function MotionReel() {
  return (
    <section
      aria-labelledby="motion-heading"
      className="relative overflow-hidden border-b border-white/[0.06] px-6 py-20 sm:px-10 sm:py-28 lg:px-12"
    >
      <div className="relative mx-auto max-w-[1320px]">
        <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50 sm:text-xs">
          Motion / Video on the web
        </p>
        <h2
          id="motion-heading"
          className="max-w-3xl text-[clamp(2.2rem,4.6vw,4rem)] font-light uppercase leading-[0.95] tracking-tight text-foreground"
        >
          Make visitors <span className="bg-gradient-to-r from-[#a878ff] via-[#6fe3ff] to-[#35d8f0] bg-clip-text text-transparent">stop scrolling</span>
        </h2>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-dim">
          A short looping clip sets a mood faster than any headline. We use video as a section's background rather than a
          framed thumbnail, with the interface living on top in frosted glass — silent, loaded only when it's on screen,
          never slowing the page down.
        </p>

        {/* Reef and Drift as backgrounds for two ordinary cards, side by side —
            not sections of their own. A liquid-glass panel sits on top of
            each clip, translucent and blurred, so the motion reads straight
            through it rather than being framed or hidden. */}
        <div className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6">
          {clips.map((clip, index) => (
            <div key={clip.id} className="group relative h-[340px] overflow-hidden rounded-[1.75rem] border border-white/10 sm:h-[400px]">
              <LoopClip
                src={clip.src}
                poster={clip.poster}
                className="transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
              />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060c1a]/80 via-[#060c1a]/15 to-[#060c1a]/30" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    index === 1
                      ? 'radial-gradient(closest-side, rgba(168,120,255,0.18), transparent 65%)'
                      : 'radial-gradient(closest-side, rgba(53,216,240,0.18), transparent 65%)',
                }}
              />

              {/* Frosted glass panel: translucent + blurred, not an opaque
                  card — the clip stays visible straight through it. */}
              <div className="liquid-glass liquid-glass--flat absolute inset-x-5 bottom-5 rounded-2xl p-5 sm:inset-x-6 sm:bottom-6 sm:p-6">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-white/90">
                  <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${dotColors[index % dotColors.length]}`} aria-hidden="true" />
                  {String(index + 1).padStart(2, '0')} · {clip.label}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{taglines[clip.id]}</p>
              </div>
            </div>
          ))}
        </div>

        <a
          href="/showcase/"
          className="group mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground"
        >
          <span className="border-b border-white/30 pb-1 group-hover:border-white">See more motion in the showcase</span>
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
          Concept clips. Shown to illustrate motion on the web.
        </p>
      </div>
    </section>
  );
}
