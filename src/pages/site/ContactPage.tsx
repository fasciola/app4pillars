import { ArrowUpRight, Mail, MapPin, MessageCircle } from 'lucide-react';
import PageHero from '../../components/PageHero';
import { contactConfig } from '../../config';

const whatsappUrl = `https://wa.me/${contactConfig.phone.replace(/\+/g, '')}`;
const whatsappWithText = `${whatsappUrl}?text=${encodeURIComponent('Hello Four Pillars, I would like to discuss a website project.')}`;

const channels = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+971 56 707 4922',
    note: 'Fastest reply. Send a message any time.',
    href: whatsappWithText,
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    value: contactConfig.email,
    note: 'Best for briefs, files and longer details.',
    href: `mailto:${contactConfig.email}`,
    external: false,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Dubai, United Arab Emirates',
    note: 'Working with businesses across the UAE.',
    href: null,
    external: false,
  },
];

const briefChecklist = [
  'What your business does and who it serves',
  'The type of site: new website, redesign, e-commerce or landing page',
  'Links to your current site or sites you like',
  'Your timeline and any launch date',
];

/** Contact: direct channels and what to include in a first message. */
export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact / Start a project"
        title={
          <>
            Let&rsquo;s talk <span className="text-white/45">about your website</span>
          </>
        }
        intro={contactConfig.subtitle}
      >
        <a
          href={whatsappWithText}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
        >
          Message us on WhatsApp
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <a
          href={`mailto:${contactConfig.email}`}
          className="inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 text-sm text-foreground transition-colors hover:border-white/40"
        >
          <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
          Email us
        </a>
      </PageHero>

      <section aria-labelledby="contact-channels-heading" className="px-6 py-20 sm:px-10 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-20">
          <div className="min-w-0">
            <h2 id="contact-channels-heading" className="sr-only">
              Ways to reach us
            </h2>
            <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
              {channels.map(({ icon: Icon, label, value, note, href, external }) => {
                const body = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15">
                      <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">{label}</span>
                      <span className="mt-1 block text-lg [overflow-wrap:anywhere] font-light text-foreground sm:text-xl">{value}</span>
                      <span className="mt-1 block text-sm text-dim">{note}</span>
                    </span>
                    {href && <ArrowUpRight className="h-5 w-5 shrink-0 text-white/40 transition-colors group-hover:text-white" aria-hidden="true" />}
                  </>
                );
                return (
                  <li key={label} className="bg-[#060606]">
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="group flex items-center gap-5 p-6 transition-colors hover:bg-white/[0.03] sm:p-8"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="flex items-center gap-5 p-6 sm:p-8">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <aside aria-labelledby="brief-heading" className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:p-8">
            <h2 id="brief-heading" className="text-2xl font-light uppercase tracking-tight text-foreground">
              What to send us
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-dim">
              A few lines are enough to start. These help us reply with useful next steps:
            </p>
            <ol className="mt-6 grid gap-4">
              {briefChecklist.map((item, index) => (
                <li key={item} className="flex gap-4 text-sm leading-relaxed text-white/80">
                  <span className="font-mono text-[11px] tracking-[0.2em] text-accent">{String(index + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>
    </>
  );
}
