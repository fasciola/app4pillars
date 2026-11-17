import { ArrowUpRight } from 'lucide-react';
import { showcaseItems } from '../content/site';
import { ArrowLink, SectionHeader } from '../components/PageHero';

/** Homepage teaser for the Showcase page: four cards, each linking to its build. */
export default function ShowcaseTeaser() {
  return (
    <section aria-labelledby="showcase-teaser-heading" className="relative px-6 py-24 sm:px-10 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeader
          id="showcase-teaser-heading"
          eyebrow="Showcase / Concept builds"
          title="Motion, made to scroll"
          intro="Interactive concept sections we design to show what a page can do: cut-outs that assemble, scenes that change as you scroll, and a real-time 3D fish."
          action={<ArrowLink href="/showcase/">Open the showcase</ArrowLink>}
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {showcaseItems.map((item, index) => (
            <li key={item.id}>
              <a
                href={`/showcase/#${item.id}`}
                className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b] p-6 outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${item.tint} to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100`}
                  aria-hidden="true"
                />
                {item.image ? (
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute left-1/2 top-[8%] h-[62%] w-auto max-w-none -translate-x-1/2 object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-[1.04] motion-reduce:transition-none"
                  />
                ) : (
                  <div
                    className="absolute inset-x-0 top-[10%] flex h-[58%] items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="text-[clamp(4rem,9vw,7rem)] font-extralight tracking-tight text-white/80 transition-transform duration-700 group-hover:scale-105">
                      3D
                    </span>
                  </div>
                )}
                <div className="relative">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-accent">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-2 flex items-center justify-between gap-3 text-xl font-light uppercase tracking-tight text-foreground">
                    {item.title}
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-white/50 transition-colors group-hover:text-white" aria-hidden="true" />
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-dim">{item.note}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
