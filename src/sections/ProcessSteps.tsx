import { processSteps } from '../content/site';
import { SectionHeader } from '../components/PageHero';

/** The four-step process, shared by Home, Services, About and the Dubai page. */
export default function ProcessSteps({
  eyebrow = 'Process / How we work',
  title = 'From idea to launch',
  intro = 'A structured process keeps the website aligned with your brand and business goals while reducing unnecessary revisions and technical surprises.',
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
}) {
  return (
    <section aria-labelledby="process-heading" className="relative px-6 py-24 sm:px-10 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-[1320px]">
        <SectionHeader eyebrow={eyebrow} title={title} intro={intro} id="process-heading" />
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step) => (
            <li key={step.number} className="flex min-h-[240px] flex-col bg-[#060606] p-7 xl:p-8">
              <span className="font-mono text-[11px] tracking-[0.22em] text-accent">{step.number}</span>
              <h3 className="mb-3 mt-auto pt-10 text-2xl font-light uppercase tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-dim">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
