import { useEffect, useRef } from 'react';

const clips = [
  { id: 'jellyfish', src: '/motion/jellyfish.mp4', poster: '/motion/jellyfish-poster.webp', label: 'Reef' },
  { id: 'glass-creature', src: '/motion/glass-creature.mp4', poster: '/motion/glass-creature-poster.webp', label: 'Drift' },
];

/** Alternating cyan / violet glow per card, echoing the Blue Ocean palette. */
const dotColors = ['bg-[#35d8f0]', 'bg-[#a878ff]'];

/**
 * Homepage motion strip: two compact side-by-side cards, Reef and Drift,
 * each with its clip as the card's own background and the section's actual
 * copy sitting directly on a soft navy scrim on top of it — same unboxed,
 * text-on-atmosphere treatment as the "Silk" (FlowField) pillars section,
 * rather than a framed glass panel. Each clip loads and plays only while on
 * screen, stays muted, and is skipped (poster only) for visitors who asked
 * for reduced motion or reduced data.
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
        {/* Reef and Drift: two compact side-by-side cards, each with its clip
            as the background and the section's own copy sitting on top in a
            frosted liquid-glass panel — the video is a backdrop for real
            content here, not a framed thumbnail next to it. */}
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          {clips.map((clip, index) => (
            <div key={clip.id} className="group relative h-[440px] overflow-hidden rounded-[1.75rem] border border-white/10 sm:h-[500px]">
              <LoopClip
                src={clip.src}
                poster={clip.poster}
                className="transition-transform duration-[1.6s] ease-out group-hover:scale-[1.04]"
              />
              {/* Soft navy scrim, same unboxed text-on-atmosphere read as the
                  "Our approach" / Silk section's flat bg-[#0d1830]/55 tint. A
                  uniform base layer first, so copy stays legible no matter
                  how bright a given frame of the clip is, then a gradient on
                  top for extra depth at the edges where the copy sits. */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[#060c1a]/45" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060c1a]/70 via-[#060c1a]/25 to-[#060c1a]/50" />
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

              {/* Copy sits directly on the scrim — no glass box, just a
                  drop-shadow for legibility, matching how the pillars
                  heading reads straight off the Silk canvas. */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                {index === 0 ? (
                  <>
                    <div>
                      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-white/60 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-xs">
                        Motion / Video on the web
                      </p>
                      <h2
                        id="motion-heading"
                        className="text-[clamp(1.9rem,3.6vw,2.9rem)] font-light uppercase leading-[0.98] tracking-tight text-foreground drop-shadow-[0_6px_22px_rgba(0,0,0,0.55)]"
                      >
                        Make visitors{' '}
                        <span className="bg-gradient-to-r from-[#a878ff] via-[#6fe3ff] to-[#35d8f0] bg-clip-text text-transparent">
                          stop scrolling
                        </span>
                      </h2>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                      <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${dotColors[index]}`} aria-hidden="true" />
                      {String(index + 1).padStart(2, '0')} · {clip.label}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-base leading-relaxed text-white/85 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                      A short looping clip sets a mood faster than any headline. We use video as a card's own
                      background rather than a framed thumbnail, with the copy living right on top — silent, loaded
                      only when it's on screen, never slowing the page down.
                    </p>
                    <div>
                      <a
                        href="/showcase/"
                        className="group/link inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                      >
                        <span className="border-b border-white/30 pb-1 group-hover/link:border-white">
                          See more motion in the showcase
                        </span>
                        <span aria-hidden="true" className="transition-transform group-hover/link:translate-x-1">
                          →
                        </span>
                      </a>
                      <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-white/80 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                        <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${dotColors[index]}`} aria-hidden="true" />
                        {String(index + 1).padStart(2, '0')} · {clip.label}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
          Concept clips. Shown to illustrate motion on the web.
        </p>
      </div>
    </section>
  );
}
