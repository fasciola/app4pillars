import { CheckCircle2 } from 'lucide-react';
import PageHero, { SectionHeader } from '../../components/PageHero';
import ProcessSteps from '../../sections/ProcessSteps';
import { pillars, strengths } from '../../content/site';

/** About: what the studio stands for, why clients choose it, and how it works. */
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About / Four Pillars Web Design"
        title={
          <>
            A web design studio <span className="text-white/45">in Dubai, built on four pillars</span>
          </>
        }
        intro="Four Pillars creates premium, high-performance websites for businesses in Dubai and across the UAE, combining strategy, design, development and conversion-focused performance in every project."
      />

      <section aria-labelledby="pillars-heading" className="px-6 py-24 sm:px-10 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1320px]">
          <SectionHeader
            id="pillars-heading"
            eyebrow="Our name / Our method"
            title="The four pillars"
            intro="Every project is held up by the same four things. If one is missing, the website looks good but does not perform, or performs but does not stand out."
          />
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, index) => (
              <li key={pillar.title} className="flex min-h-[260px] flex-col bg-[#060606] p-7 xl:p-8">
                <span className="font-mono text-[11px] tracking-[0.22em] text-accent">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-auto pt-10 text-3xl font-light uppercase tracking-tight text-foreground">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-dim">{pillar.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="why-heading" className="border-y border-white/[0.06] px-6 py-24 sm:px-10 sm:py-28 lg:px-12">
        <div className="mx-auto grid max-w-[1320px] items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50 sm:text-xs">Why Four Pillars</p>
            <h2 id="why-heading" className="text-4xl font-light uppercase leading-[0.98] tracking-tight text-foreground sm:text-5xl">
              Strategy behind the visuals
            </h2>
            <p className="mt-6 text-base leading-relaxed text-dim">
              Visual design is supported by structure, speed, SEO foundations and conversion thinking from the first
              day of a project, not added at the end.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {strengths.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-white/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProcessSteps />
    </>
  );
}
