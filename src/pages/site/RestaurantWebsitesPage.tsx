import { ArrowUpRight, Check } from 'lucide-react';
import PageHero, { ArrowLink, SectionHeader } from '../../components/PageHero';
import { contactConfig } from '../../config';
import { demoTables } from '../../content/menuDemo';
import { guestFeatures, restaurantFaqs, teamFeatures } from '../../content/restaurantWebsites';

const pad = (n: number) => String(n).padStart(2, '0');

/** WhatsApp enquiry that asks for what separates a group website from a single QR menu. */
const enquiryUrl = `https://wa.me/${contactConfig.phone.replace(/\+/g, '')}?text=${encodeURIComponent(
  'Hello Four Pillars, I would like to discuss a restaurant website.\n\nBrand name:\nNumber of branches:\nFeatures needed (menu, reservations, delivery links, Arabic):',
)}`;

const demoHref = `/menu-demo/?t=${demoTables[0].code}`;

/**
 * Landing page for restaurant groups and multi-branch cafés:
 * /restaurant-website-design-dubai/. Linked from the homepage restaurant
 * section, the Services page and the footer.
 */
export default function RestaurantWebsitesPage() {
  return (
    <>
      <PageHero
        eyebrow="Restaurants & cafés / Dubai · UAE"
        title={
          <>
            Website design for restaurant groups <span className="text-white/45">&amp; cafés in Dubai</span>
          </>
        }
        intro="Four Pillars designs websites for Dubai restaurants and café groups, with mobile QR menus, reservation links and a dedicated page for every branch, in English and Arabic."
      >
        <a
          href={enquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
        >
          Discuss your restaurant website
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <a
          href={demoHref}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm text-foreground transition-colors hover:border-white/40"
        >
          Try the QR menu demo
        </a>
      </PageHero>

      {/* The operator's problem */}
      <section className="border-b border-white/[0.06] px-6 py-20 sm:px-10 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-2 lg:gap-20">
          <h2 className="text-3xl font-light uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
            Menus, hours and booking links change. <span className="text-white/45">Your website should keep up.</span>
          </h2>
          <div className="space-y-5 text-base leading-relaxed text-dim">
            <p>
              For a restaurant group, the hard part isn’t the homepage. It’s keeping every branch accurate: this
              week’s brunch menu, Ramadan hours at one location, a new delivery partner at another, prices that
              changed across the brand.
            </p>
            <p>
              We design restaurant websites around that reality, so guests always find the right menu, hours and
              booking link for the branch they’re visiting, and your team isn’t chasing outdated PDFs and links.
            </p>
          </div>
        </div>
      </section>

      {/* What guests see */}
      <section aria-labelledby="guests-heading" className="px-6 py-20 sm:px-10 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1320px]">
          <SectionHeader
            id="guests-heading"
            eyebrow="On the guest’s phone"
            title={
              <>
                What your guests see <span className="text-white/45">when they look you up</span>
              </>
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {guestFeatures.map((f, i) => (
              <article key={f.title} className="liquid-glass flex flex-col rounded-2xl p-7">
                <span className="font-mono text-xs tracking-[0.22em] text-accent">{pad(i + 1)}</span>
                <h3 className="mt-6 text-xl font-light text-foreground">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-dim">{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What the team manages */}
      <section className="border-y border-white/[0.06] px-6 py-20 sm:px-10 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1320px] items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50 sm:text-xs">
              For your marketing team
            </p>
            <h2 className="text-3xl font-light uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
              Websites for multi-location <span className="text-white/45">restaurants and café chains</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-dim">
              We plan the structure before the design, so each branch and brand has its own place for the details
              that change most.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {teamFeatures.map((item) => (
              <li key={item} className="liquid-glass flex items-start gap-3 rounded-xl p-5 text-sm leading-relaxed text-white/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Try it */}
      <section aria-labelledby="try-heading" className="px-6 py-20 sm:px-10 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1320px]">
          <SectionHeader
            id="try-heading"
            eyebrow="Try it on your phone"
            title={
              <>
                Scan a table. <span className="text-white/45">The table number fills itself in.</span>
              </>
            }
            intro="Each table gets its own QR code, so the menu already knows where the guest is sitting. Scan a card, or tap one to open the demo. The café is fictional."
          />
          <ul className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-6 px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:max-w-4xl">
            {demoTables.map((t) => (
              <li key={t.code} className="w-[62%] shrink-0 snap-start sm:w-auto">
                <a
                  href={`/menu-demo/?t=${t.code}`}
                  className="block overflow-hidden rounded-2xl border border-white/10 transition-transform hover:-translate-y-1"
                  aria-label={`Open the demo menu for table ${t.table}`}
                >
                  <img
                    src={t.webp}
                    alt={`QR code card for table ${t.table}`}
                    width={450}
                    height={625}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <a
              href="https://cloudkitchensetup.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-2xl border border-white/10"
            >
              <img
                src="/portfolio/cloud-kitchen-setup.webp"
                alt="CKS by Business Lab website shown on a desktop monitor"
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="flex items-center justify-between gap-4 p-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">Food &amp; beverage · Client work</p>
                  <h3 className="mt-2 text-xl font-light text-foreground">CKS by Business Lab</h3>
                </div>
                <ArrowUpRight className="h-5 w-5 text-white/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </div>
            </a>
            <a href="/#concepts-heading" className="group overflow-hidden rounded-2xl border border-white/10">
              <img
                src="/concepts/ember-oak-sm.webp"
                alt="Ember & Oak coffee shop website concept"
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="flex items-center justify-between gap-4 p-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">Specialty coffee · Concept design</p>
                  <h3 className="mt-2 text-xl font-light text-foreground">Ember &amp; Oak</h3>
                </div>
                <ArrowUpRight className="h-5 w-5 text-white/60" aria-hidden="true" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/[0.06] px-6 py-20 sm:px-10 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-3xl font-light uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
            Restaurant websites: <span className="text-white/45">common questions</span>
          </h2>
          <div className="space-y-4">
            {restaurantFaqs.map((faq) => (
              <article key={faq.question} className="liquid-glass rounded-2xl p-6 sm:p-8">
                <h3 className="mb-3 text-lg font-medium text-foreground">{faq.question}</h3>
                <p className="text-sm leading-relaxed text-dim sm:text-base">{faq.answer}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <a
              href={enquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
            >
              Discuss your restaurant website
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <ArrowLink href="/website-design-dubai/">All website design services</ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
