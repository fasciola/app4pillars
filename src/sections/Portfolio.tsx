import { useEffect, useRef, useState } from 'react';
import { portfolioConfig, projects } from '../config';
import { ExternalLink } from 'lucide-react';

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    if (motionQuery.matches) {
      section.style.height = 'auto';
      track.style.transform = 'none';
      return;
    }

    let raf = 0;

    const getDistance = () =>
      Math.max(0, track.scrollWidth - window.innerWidth + Math.max(32, window.innerWidth * 0.035));

    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / travel, 0, 1);
      const distance = getDistance();
      track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
    };

    const recalculate = () => {
      const distance = getDistance();
      /* Mirror the long sticky-scroll rhythm of the FLUID STUDIO
       * "SELECTED FRAGMENTS" section while sizing dynamically for our
       * larger portfolio collection. */
      section.style.height = `${Math.max(
        window.innerHeight * 2.2,
        distance + window.innerHeight * 1.4,
      )}px`;
      update();
    };

    const requestUpdate = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(recalculate) : null;
    resizeObserver?.observe(track);

    recalculate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', recalculate);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', recalculate);
      resizeObserver?.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      aria-label="Selected Four Pillars portfolio fragments"
      className={`relative bg-transparent ${reducedMotion ? 'py-28' : ''}`}
    >
      <div
        className={
          reducedMotion
            ? 'relative overflow-hidden'
            : 'sticky top-0 h-screen min-h-[620px] overflow-hidden flex flex-col justify-center'
        }
      >
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_48%_at_50%_48%,rgba(255,255,255,0.03),transparent_72%)]" />
        <div className="relative z-10 px-6 sm:px-10 lg:px-12 mb-10 sm:mb-12">
          <div className="max-w-4xl">
            <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-white/45 mb-4">
              Portfolio / Selected Work
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light uppercase text-foreground tracking-tight mb-5">
              Selected Fragments
            </h2>
            <p className="text-dim max-w-2xl leading-relaxed">
              {portfolioConfig.subtitle}
            </p>
          </div>
        </div>

        <div
          className={reducedMotion ? 'overflow-x-auto pb-6' : 'overflow-visible'}
          aria-label="Selected portfolio projects"
        >
          <div
            ref={trackRef}
            className="relative z-10 flex items-start gap-5 sm:gap-8 lg:gap-12 px-6 sm:px-10 lg:px-12 will-change-transform"
          >
            {projects.map((project, index) => (
              <figure
                key={project.title}
                className={`relative flex-none w-[78vw] sm:w-[62vw] lg:w-[45vw] max-w-[648px] ${
                  index % 2 === 1 ? 'mt-8 sm:mt-12' : ''
                }`}
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} live website`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.08] bg-black/20 shadow-[0_20px_48px_rgba(0,0,0,0.34)] transition-all duration-500 group-hover:border-white/20 group-hover:shadow-[0_28px_64px_rgba(0,0,0,0.50)]">
                    <img
                      src={project.image}
                      alt={`${project.title} website design project`}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/15 bg-black/20 backdrop-blur-sm flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="w-3.5 h-3.5 text-white/70" />
                    </div>
                  </div>

                  <figcaption className="mt-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] text-white/45 group-hover:text-white/70 transition-colors duration-300">
                        {String(index + 1).padStart(2, '0')} — Selected Fragment
                      </span>
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-accent/80">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="mt-2 text-xl sm:text-2xl font-light text-foreground tracking-tight">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-sm text-dim">{project.tagline}</p>
                  </figcaption>
                </a>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
