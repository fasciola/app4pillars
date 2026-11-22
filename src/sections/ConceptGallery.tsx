import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { conceptDesigns } from '../content/site';

/**
 * Homepage gallery of full-page website concepts. Each card is a browser
 * window showing the top of the design; hovering or focusing it scrolls the
 * page inside the window so the whole layout can be seen, and clicking opens
 * the full design in a viewer. On phones the cards sit in a swipeable row.
 */
export default function ConceptGallery() {
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open !== null && !dialog.open) dialog.showModal();
    if (open === null && dialog.open) dialog.close();
  }, [open]);

  const current = open !== null ? conceptDesigns[open] : null;

  return (
    <section
      aria-labelledby="concepts-heading"
      className="relative border-b border-white/[0.06] px-6 py-20 sm:px-10 sm:py-24 lg:px-12"
    >
      <div className="mx-auto max-w-[1320px]">
        <header className="mb-10 grid gap-5 lg:mb-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50 sm:text-xs">
              Concept designs / Four industries
            </p>
            <h2
              id="concepts-heading"
              className="text-4xl font-light uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Designed for every brand
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-dim sm:text-base lg:text-right">
            Full homepage concepts showing how we adapt layout, type and colour to each industry. Open any design to see
            the whole page.
          </p>
        </header>

        <ul className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 sm:scroll-px-10 overflow-x-auto px-6 pb-4 sm:-mx-10 sm:px-10 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          {conceptDesigns.map((concept, index) => (
            <li key={concept.id} className="w-[72vw] max-w-[320px] shrink-0 snap-start sm:w-[44vw] lg:w-auto lg:max-w-none">
              <button
                type="button"
                onClick={() => setOpen(index)}
                aria-label={`View the full ${concept.name} concept design`}
                className="group block w-full text-left outline-none"
              >
                <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0c0c0c] shadow-[0_30px_60px_rgba(0,0,0,0.45)] transition-[border-color,transform] duration-500 group-hover:-translate-y-1 group-hover:border-white/25 group-focus-visible:border-white/60">
                  {/* Browser bar */}
                  <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="ml-2 truncate rounded bg-white/[0.05] px-2 py-0.5 font-mono text-[9px] tracking-wide text-white/40">
                      {concept.domain}
                    </span>
                  </div>
                  {/* Page: scrolls from top to bottom on hover/focus */}
                  <div className="concept-window relative aspect-[4/5] overflow-hidden">
                    <img
                      src={concept.thumb}
                      alt={`${concept.name} homepage concept: ${concept.industry.toLowerCase()} website design`}
                      width={512}
                      height={768}
                      loading="lazy"
                      decoding="async"
                      className="concept-page absolute inset-x-0 top-0 h-auto w-full"
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-accent">{String(index + 1).padStart(2, '0')}</span>
                    <p className="mt-1 text-lg font-light uppercase leading-tight tracking-tight text-foreground">{concept.name}</p>
                    <p className="mt-1 text-xs text-dim">{concept.industry}</p>
                  </div>
                  <ArrowUpRight className="mt-5 h-4 w-4 shrink-0 text-white/40 transition-colors group-hover:text-white" aria-hidden="true" />
                </div>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
          Concept work. Brands shown are fictional.
        </p>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(null);
        }}
        aria-label={current ? `${current.name} concept design` : 'Concept design'}
        className="m-auto h-[92dvh] w-[min(92vw,760px)] max-w-none overflow-hidden rounded-2xl border border-white/15 bg-[#0b0b0b] p-0 text-foreground backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm uppercase tracking-wide">{current.name}</p>
                <p className="truncate text-xs text-dim">{current.industry}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-white"
                aria-label="Close"
                autoFocus
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <img src={current.image} alt={`${current.name} full homepage concept`} width={1024} height={1536} className="block h-auto w-full" />
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
