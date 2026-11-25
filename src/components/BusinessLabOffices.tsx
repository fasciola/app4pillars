import { ArrowUpRight, MapPin } from 'lucide-react';
import RainyGlassCard from './RainyGlassCard';
import { businessLabOffices, businessLabUrl, mapsEmbedUrl, mapsLinkUrl } from '../content/businessLab';

/**
 * "A brand of Business Lab" section with both of Business Lab's real UAE
 * offices as rainy-glass cards, each with a live Google Maps embed. Shared by
 * the Dubai, Ajman and Abu Dhabi local-SEO pages so the parent-brand
 * messaging and address data stay identical everywhere it appears.
 */
export default function BusinessLabOffices({
  coverageNote,
}: {
  /** Extra line for a city with no Business Lab office of its own (e.g. Abu Dhabi). */
  coverageNote?: string;
}) {
  return (
    <section
      id="business-lab"
      aria-labelledby="business-lab-heading"
      className="relative py-28 px-6 border-t border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="max-w-3xl">
            <p className="text-[10px] uppercase tracking-[0.28em] text-accent mb-4">A Business Lab Brand</p>
            <h2
              id="business-lab-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-light text-foreground tracking-tight mb-6"
            >
              Four Pillars is a web design brand of Business Lab
            </h2>
            <p className="text-dim leading-relaxed text-base sm:text-lg">
              Four Pillars Web Design operates under{' '}
              <a
                href={businessLabUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 hover:text-accent"
              >
                Business Lab
              </a>
              , a UAE corporate services provider. That means every website we design is backed by a company with a
              real, physical presence in the UAE — not a freelancer working from a laptop. You're welcome to visit
              either office in person.
            </p>
            {coverageNote && <p className="mt-4 text-sm text-dim leading-relaxed">{coverageNote}</p>}
          </div>

          {/* Real Business Lab desk-and-skyline photography, framed to match the site's
              glass language. The transparent accent graphic floats half off the frame
              for a touch of the "premium product shot" polish the rest of the site uses. */}
          <div className="relative">
            <div className="liquid-glass relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
              <img
                src="/business-lab/business-lab-desk-skyline.webp"
                alt="A Business Lab office desk overlooking the Dubai skyline at sunset"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            <img
              src="/business-lab/business-lab-mainland-accent.webp"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 -right-6 hidden w-[42%] drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)] sm:block"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {businessLabOffices.map((office) => (
            <RainyGlassCard key={office.id} className="flex flex-col">
              <div className="p-7 sm:p-8">
                <p className="text-[10px] uppercase tracking-[0.28em] text-accent mb-3">{office.city} Office</p>
                <h3 className="text-2xl font-light text-foreground tracking-tight mb-3">{office.name}</h3>
                <div className="flex items-start gap-2 text-sm text-white/75 leading-relaxed">
                  <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <p>
                    {office.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
                <a
                  href={mapsLinkUrl(office.mapsQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
                >
                  Get directions
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="mt-auto h-56 border-t border-white/10">
                <iframe
                  title={`Business Lab ${office.city} office location`}
                  src={mapsEmbedUrl(office.mapsQuery)}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full grayscale-[0.4] contrast-[1.05] opacity-90"
                  style={{ border: 0 }}
                />
              </div>
            </RainyGlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
