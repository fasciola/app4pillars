import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { portfolioConfig, projects } from "../config";

const MOBILE_INITIAL = 6;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Portfolio as an index. On desktop the project names form a list and one
 * large preview stays pinned beside it; the preview follows the row you hover
 * or focus, and otherwise the row nearest the middle of the screen as you
 * scroll. On phones and tablets there is no hover, so every project is a card
 * with its own image and the list starts collapsed to the first six.
 */
export default function Portfolio({
  limit,
  showHeader = true,
}: {
  /** Show only the first N projects, with a link to the full Work page. */
  limit?: number;
  /** The Work page has its own page hero, so it hides this header. */
  showHeader?: boolean;
} = {}) {
  const list = limit ? projects.slice(0, limit) : projects;
  const [active, setActive] = useState(0);
  // Preview images are only mounted once their row has been active (plus the
  // next one, so the cross-fade has something to fade to).
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0, 1]));
  const [expanded, setExpanded] = useState(false);
  const rowRefs = useRef<Array<HTMLLIElement | null>>([]);

  const activate = (index: number) => {
    setActive(index);
    setMounted(current => {
      const next = Math.min(index + 1, list.length - 1);
      if (current.has(index) && current.has(next)) return current;
      return new Set(current).add(index).add(next);
    });
  };

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!desktop.matches) return;
      const line = window.innerHeight * 0.45;
      let best = -1;
      let bestDistance = Infinity;
      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        const rect = row.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - line);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      });
      if (best >= 0) activate(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const current = list[active];

  return (
    <section
      id="portfolio"
      aria-labelledby={showHeader ? "portfolio-heading" : undefined}
      aria-label={showHeader ? undefined : "Projects"}
      className={`relative z-10 bg-transparent px-6 sm:px-10 lg:px-12 ${
        showHeader
          ? "py-24 sm:py-28 lg:py-36"
          : "pb-24 pt-14 sm:pb-28 lg:pb-36 lg:pt-16"
      }`}
    >
      <div className="mx-auto max-w-[1320px]">
        {showHeader && (
          <header className="mb-12 grid gap-6 border-b border-white/10 pb-10 lg:mb-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50 sm:text-xs">
                Portfolio / Selected Work
              </p>
              <h2
                id="portfolio-heading"
                className="text-4xl font-light uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl lg:text-7xl"
              >
                Selected Fragments
              </h2>
            </div>
            <div className="max-w-md lg:text-right">
              <p className="text-sm leading-relaxed text-dim sm:text-base">
                {portfolioConfig.subtitle}
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 sm:text-xs">
                {limit ? (
                  <a
                    href="/work/"
                    className="underline decoration-white/30 underline-offset-4 hover:text-white"
                  >
                    {pad(projects.length)} live projects · view all
                  </a>
                ) : (
                  <>{pad(list.length)} live projects</>
                )}
              </p>
            </div>
          </header>
        )}

        <div className="lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-24">
          {/* Index */}
          <ol className="grid gap-10 sm:grid-cols-2 sm:gap-x-8 lg:block">
            {list.map((project, index) => {
              const isActive = index === active;
              return (
                <li
                  key={project.title}
                  ref={node => {
                    rowRefs.current[index] = node;
                  }}
                  className={`lg:border-b lg:border-white/10 ${
                    !expanded && index >= MOBILE_INITIAL ? "max-lg:hidden" : ""
                  }`}
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title}: view the live website`}
                    onPointerEnter={event => {
                      if (event.pointerType !== "touch") activate(index);
                    }}
                    onFocus={() => activate(index)}
                    className="group block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-white/60 lg:rounded-none"
                  >
                    {/* Card image: phones and tablets only */}
                    <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] lg:hidden">
                      <img
                        src={project.image}
                        alt={`${project.title} website design project`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-4 lg:gap-x-6 lg:py-5">
                      <span
                        className={`font-mono text-[10px] tracking-[0.18em] transition-colors duration-300 sm:text-xs ${
                          isActive ? "lg:text-accent" : "lg:text-white/35"
                        } text-white/45`}
                      >
                        {pad(index + 1)}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`block text-xl font-light uppercase leading-tight tracking-tight text-foreground transition-all duration-300 sm:text-2xl lg:text-[clamp(1.5rem,2.2vw,2.1rem)] ${
                            isActive
                              ? "lg:translate-x-2 lg:opacity-100"
                              : "lg:opacity-45"
                          }`}
                        >
                          {project.title}
                        </span>
                        <span className="mt-1 block text-xs leading-snug text-dim sm:text-sm lg:hidden">
                          {project.tagline}
                        </span>
                        <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.16em] text-accent/85 lg:hidden">
                          {project.category}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className={`h-4 w-4 self-center transition-all duration-300 lg:h-5 lg:w-5 ${
                          isActive
                            ? "lg:translate-x-0 lg:text-foreground lg:opacity-100"
                            : "lg:-translate-x-2 lg:opacity-0"
                        } text-white/60`}
                      />
                    </div>
                  </a>
                </li>
              );
            })}
          </ol>

          {!expanded && list.length > MOBILE_INITIAL && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="mt-10 w-full rounded-full border border-white/20 px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60 lg:hidden"
            >
              Show all {list.length} projects
            </button>
          )}

          {/* Pinned preview: desktop only */}
          <div className="hidden lg:block" aria-hidden="true">
            <div className="sticky top-[max(5.5rem,calc(50vh-17rem))]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
                {list.map((project, index) =>
                  mounted.has(index) ? (
                    <img
                      key={project.title}
                      src={project.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                        index === active
                          ? "scale-100 opacity-100"
                          : "scale-[1.04] opacity-0"
                      }`}
                    />
                  ) : null
                )}
              </div>
              <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/85">
                    {current.category}
                  </p>
                  <p className="mt-2 text-lg font-light leading-snug text-foreground">
                    {current.tagline}
                  </p>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {pad(active + 1)} / {pad(list.length)}
                </p>
              </div>
            </div>
          </div>
        </div>
        {limit && projects.length > limit && (
          <div className="mt-14 flex justify-center border-t border-white/10 pt-10">
            <a
              href="/work/"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-white/40 hover:bg-white/5"
            >
              View all {projects.length} projects
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
