import { lazy, Suspense } from 'react';
import Hero from '../../sections/Hero';
import Services from '../../sections/Services';
import Portfolio from '../../sections/Portfolio';
import ShowcaseTeaser from '../../sections/ShowcaseTeaser';
import ProcessSteps from '../../sections/ProcessSteps';
import ConceptGallery from '../../sections/ConceptGallery';
import DigitalMenu from '../../sections/DigitalMenu';
import MotionReel from '../../sections/MotionReel';
import { pillars } from '../../content/site';

const FlowField = lazy(() => import('../../components/FlowField'));

/** Homepage: a short tour of the site, each block leading to its own page. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ConceptGallery />
      <MotionReel />
      <DigitalMenu />

      {/* Positioning statement + the four pillars. A contained "Silk" current
          lives behind this one section only — never the whole page. */}
      <section aria-labelledby="pillars-heading" className="relative overflow-hidden border-b border-white/[0.06] px-6 py-24 sm:px-10 sm:py-28 lg:px-12">
        <div className="absolute inset-0 -z-20 opacity-[0.32]" aria-hidden="true">
          <Suspense fallback={null}>
            <FlowField contained />
          </Suspense>
        </div>
        <div className="absolute inset-0 -z-10 bg-black/45" aria-hidden="true" />
        <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50 sm:text-xs">
              Four Pillars / Our approach
            </p>
            <h2
              id="pillars-heading"
              className="text-[clamp(2rem,4.2vw,3.6rem)] font-light leading-[1.05] tracking-tight text-foreground"
            >
              Websites that look distinctive <span className="text-white/45">and are built to win enquiries.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-dim">
              We design for the full customer journey: the first search result, the first impression, the mobile
              browsing experience, the proof a prospect needs and the final call to action.
            </p>
            <a
              href="/about/"
              className="group mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground"
            >
              <span className="border-b border-white/30 pb-1 group-hover:border-white">About the studio</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
          <ol className="grid gap-px self-end overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {pillars.map((pillar, index) => (
              <li key={pillar.title} className="bg-[#060606] p-6 sm:p-7">
                <span className="font-mono text-[11px] tracking-[0.2em] text-accent">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-6 text-xl font-light uppercase tracking-tight text-foreground">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dim">{pillar.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Services linkToPage />
      <Portfolio limit={6} />
      <ShowcaseTeaser />
      <ProcessSteps />
    </>
  );
}
