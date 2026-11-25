import { useEffect, useRef } from 'react';

const clips = [
  { id: 'jellyfish', src: '/motion/jellyfish.mp4', poster: '/motion/jellyfish-poster.webp', label: 'Reef' },
  { id: 'glass-creature', src: '/motion/glass-creature.mp4', poster: '/motion/glass-creature-poster.webp', label: 'Drift' },
];

/** Alternating cyan / violet glow per card, echoing the Blue Ocean palette. */
const dotColors = ['bg-[#35d8f0]', 'bg-[#a878ff]'];

/**
 * Homepage motion strip: two short looping clips in tall frames. Each video
 * loads and plays only while it is on screen, stays muted, and is skipped
 * (poster only) for visitors who asked for reduced motion or reduced data.
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
      width={464}
      height={688}
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
      {/* Bioluminescent cyan/violet glow taken from the clips */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/2 h-[560px] w-[760px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(53,216,240,0.24),rgba(168,120,255,0.12)_55%,transparent)] blur-2xl"
      />

      <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50 sm:text-xs">
            Motion / Video on the web
          </p>
          <h2
            id="motion-heading"
            className="text-[clamp(2.2rem,4.6vw,4rem)] font-light uppercase leading-[0.95] tracking-tight text-foreground"
          >
            Make visitors <span className="bg-gradient-to-r from-[#a878ff] via-[#6fe3ff] to-[#35d8f0] bg-clip-text text-transparent">stop scrolling</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-dim">
            A short looping clip sets a mood faster than any headline. We build video into hero sections and showcases so it
            stays silent, loads only when it is on screen and never slows the page down.
          </p>
          <a
            href="/showcase/"
            className="group mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground"
          >
            <span className="border-b border-white/30 pb-1 group-hover:border-white">See more motion in the showcase</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        <div className="relative grid grid-cols-2 gap-4 sm:gap-6">
          {clips.map((clip, index) => (
            <figure
              key={clip.id}
              className={`group relative ${index === 1 ? 'translate-y-10 sm:translate-y-16' : ''}`}
            >
              <div className="relative aspect-[464/688] overflow-hidden rounded-[1.75rem] border border-[#35d8f0]/25 bg-[#00040a] shadow-[0_40px_80px_rgba(0,0,0,0.55),0_0_60px_-20px_rgba(53,216,240,0.5)] transition-transform duration-700 ease-out group-hover:-translate-y-1.5">
                <LoopClip src={clip.src} poster={clip.poster} className="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-[#35d8f0]/20" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 to-transparent" />
              </div>
              <figcaption className="absolute bottom-4 left-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 sm:bottom-5 sm:left-5">
                <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${dotColors[index % dotColors.length]}`} aria-hidden="true" />
                {String(index + 1).padStart(2, '0')} · {clip.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <p className="relative mx-auto mt-16 max-w-[1320px] font-mono text-[10px] uppercase tracking-[0.18em] text-white/35 sm:mt-20">
        Concept clips. Shown to illustrate motion on the web.
      </p>
    </section>
  );
}
