import { Check } from 'lucide-react';
import PageHero, { ArrowLink } from '../../components/PageHero';
import ProcessSteps from '../../sections/ProcessSteps';
import { serviceDetails } from '../../content/site';

const pad = (n: number) => String(n).padStart(2, '0');

/** Services: every discipline in full, then the process. */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services / Dubai · UAE"
        title={
          <>
            Digital services <span className="text-white/45">built to move business forward</span>
          </>
        }
        intro="Strategy, design, development and growth brought together in one digital practice. We build distinctive experiences for businesses in Dubai and across the UAE."
        aside={
          <nav aria-label="Services on this page" className="hidden lg:block">
            <ol className="grid gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/55">
              {serviceDetails.map((service, index) => (
                <li key={service.id}>
                  <a href={`#${service.id}`} className="flex gap-3 hover:text-white">
                    <span className="text-accent">{pad(index + 1)}</span>
                    {service.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        }
      />

      <section aria-label="Our services" className="px-6 py-20 sm:px-10 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1320px] gap-20 lg:gap-28">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-light uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
              Six connected disciplines. One commercial objective.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-dim">
              Every service is designed to work as part of a wider customer journey, from the first search result or
              social touchpoint through to the website experience, enquiry, purchase and long-term growth.
            </p>
          </div>

          {serviceDetails.map((service, index) => (
            <article
              key={service.id}
              id={service.id}
              className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className={`relative aspect-[16/11] overflow-hidden rounded-2xl border border-white/10 ${index % 2 ? 'lg:order-2' : ''}`}>
                <img
                  src={service.image}
                  alt=""
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 font-mono text-[11px] tracking-[0.2em] text-accent">{pad(index + 1)}</span>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">{service.tag}</p>
                <h3 className="mt-4 text-3xl font-light uppercase leading-none tracking-tight text-foreground sm:text-4xl">
                  {service.title}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-dim">{service.body}</p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm leading-snug text-white/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
                {service.link && (
                  <div className="mt-8">
                    <ArrowLink href={service.link.href}>{service.link.label}</ArrowLink>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="hospitality-heading" className="border-t border-white/[0.06] px-6 py-16 sm:px-10 lg:px-12">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">Restaurants &amp; cafés</p>
            <h2 id="hospitality-heading" className="mt-4 text-3xl font-light uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
              Websites for restaurant groups <span className="text-white/45">and cafés</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-dim">
              Mobile QR menus, reservation and delivery links, and a page for every branch, in English and Arabic.
            </p>
          </div>
          <ArrowLink href="/restaurant-website-design-dubai/">Explore restaurant and café website design</ArrowLink>
        </div>
      </section>

      <ProcessSteps />
    </>
  );
}
