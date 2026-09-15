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
      className={`relative z-10 bg-transparent ${reducedMotion ? 'py-28' : ''}`}
    >
      <div
        className={
          reducedMotion
            ? 'relative overflow-hidden'
            : 'sticky top-0 h-screen min-h-[560px] overflow-hidden flex flex-col justify-start pt-[clamp(2.5rem,6vh,4.5rem)]'
        }
      >
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_48%_at_50%_48%,rgba(255,255,255,0.025),transparent_72%)]" />

        <div className="relative z-20 px-6 sm:px-10 lg:px-12 mb-[clamp(1.25rem,3vh,2.5rem)] shrink-0">
          <div className="max-w-4xl">
            <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-white/50 mb-3 sm:mb-4">
              Portfolio / Selected Work
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light uppercase text-foreground tracking-tight mb-4 sm:mb-5 leading-[0.95]">
              Selected Fragments
            </h2>
            <p className="text-dim max-w-2xl leading-relaxed text-sm sm:text-base">
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
                className={`relative flex-none w-[82vw] sm:w-[62vw] lg:w-[min(45vw,60vh)] max-w-[648px] ${
                  index % 2 === 1 ? 'mt-[clamp(0.75rem,2.5vh,2rem)]' : ''
                }`}
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} live website`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.08] bg-black/10 shadow-[0_18px_42px_rgba(0,0,0,0.24)] transition-all duration-500 group-hover:border-white/20 group-hover:shadow-[0_24px_56px_rgba(0,0,0,0.34)]">
                    <img
                      src={project.image}
                      alt={`${project.title} website design project`}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/15 bg-black/10 backdrop-blur-sm flex items-center justify-center opacity-75 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="w-3.5 h-3.5 text-white/75" />
                    </div>
                  </div>

                  <figcaption className="mt-3 sm:mt-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] text-white/50 group-hover:text-white/75 transition-colors duration-300">
                        {String(index + 1).padStart(2, '0')} — Selected Fragment
                      </span>
                      <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-accent/85">
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
