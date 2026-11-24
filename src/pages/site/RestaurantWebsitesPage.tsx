import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CalendarCheck, Languages, MapPin, Plus, QrCode, X } from 'lucide-react';
import { ArrowLink } from '../../components/PageHero';
import FreshBowl from '../../sections/FreshBowl';
import IcedMenu from '../../sections/IcedMenu';
import { contactConfig } from '../../config';
import { dishImage, menuDemoHref, tableCards } from '../../content/tableMenu';
import { guestFeatures, restaurantConcepts, restaurantFaqs, teamFeatures } from '../../content/restaurantWebsites';

const pad = (n: number) => String(n).padStart(2, '0');
const lg = (id: string) => `/restaurant/dishes/${id}-lg.webp`;

/** WhatsApp enquiry that asks for what separates a group website from a single QR menu. */
const enquiryUrl = `https://wa.me/${contactConfig.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
  'Hello Four Pillars, I would like to discuss a restaurant website.\n\nBrand name:\nNumber of branches:\nFeatures needed (menu, reservations, delivery links, Arabic):',
)}`;

const featureArt = [
  { icon: QrCode, dish: 'spring-rolls' },
  { icon: MapPin, dish: 'chicken-chow-mein' },
  { icon: CalendarCheck, dish: 'lychee-soda' },
  { icon: Languages, dish: 'jasmine-tea' },
];

const venues = ['Restaurant groups', 'Cafés', 'Cloud kitchens', 'Brunch spots', 'Bakeries', 'Juice bars', 'Food halls'];
const stripDishes = ['har-gow', 'yuzu-lemonade', 'shrimp-fried-rice', 'mango-lassi', 'wonton-soup', 'peach-iced-tea', 'kung-pao-chicken'];

/** Hero dishes floating around the phone: position, size, tilt and timing. */
const floats = [
  { src: lg('har-gow'), cls: 'left-[-34%] top-[22%] w-[38%]', rot: '-8deg', dur: '7s', delay: '0s' },
  { src: lg('kung-pao-chicken'), cls: 'right-[-36%] top-[2%] w-[44%]', rot: '10deg', dur: '8s', delay: '-2s' },
  { src: lg('spring-rolls'), cls: 'left-[-38%] bottom-[4%] w-[42%]', rot: '6deg', dur: '9s', delay: '-4s' },
  { src: lg('yuzu-lemonade'), cls: 'right-[-24%] bottom-[2%] w-[28%]', rot: '-6deg', dur: '6.5s', delay: '-1s' },
  { src: lg('mango-lassi'), cls: 'right-[-30%] top-[44%] w-[22%]', rot: '8deg', dur: '7.5s', delay: '-3s' },
];

/**
 * Landing page for restaurant groups and multi-branch cafés:
 * /restaurant-website-design-dubai/. Linked from the homepage restaurant
 * section, the Services page and the footer.
 */
export default function RestaurantWebsitesPage() {
  return (
    <>
      <Hero />
      <VenueStrip />
      <Problem />
      <ConceptAndClient />
      <GuestFeatures />
      <TeamFeatures />
      <FoodBuilds />
      <QrDemo />
      <Faq />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-32 sm:px-10 sm:pt-40 lg:px-12 lg:pb-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45%_55%_at_78%_35%,rgba(214,96,48,0.35),transparent_70%),radial-gradient(40%_50%_at_10%_90%,rgba(201,161,90,0.16),transparent_70%),linear-gradient(180deg,#0b0807_0%,#000_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:25%_25%] [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-[1320px] items-center gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div>
          <p className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#e7a86b]/30 bg-[#e7a86b]/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-[#f3cfa6] sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e7a86b]" aria-hidden="true" />
            Restaurants &amp; cafés · Dubai
          </p>
          <h1 className="text-[clamp(2.7rem,6.2vw,5.8rem)] font-light uppercase leading-[0.92] tracking-[-0.03em] text-foreground">
            Website design for restaurant groups{' '}
            <span className="bg-gradient-to-r from-[#f3cfa6] via-[#e7a86b] to-[#d66030] bg-clip-text text-transparent">
              &amp; cafés in Dubai
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Four Pillars designs websites for Dubai restaurants and café groups, with mobile QR menus, reservation links
            and a dedicated page for every branch, in English and Arabic.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={enquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#e7a86b] px-7 py-3.5 text-sm font-medium text-black shadow-[0_14px_40px_rgba(231,168,107,0.35)] transition-transform hover:scale-[1.03]"
            >
              Discuss your restaurant website
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={menuDemoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-7 py-3.5 text-sm text-foreground backdrop-blur transition-colors hover:border-white/40"
            >
              <QrCode className="h-4 w-4" aria-hidden="true" />
              Test the QR menu yourself
            </a>
          </div>
        </div>

        {/* Phone with the live menu, dishes floating around it */}
        <div className="relative mx-auto w-full max-w-[520px] py-6">
          <div className="relative mx-auto aspect-[9/16] w-[58%] sm:w-[54%]">
            {floats.map((f) => (
              <img
                key={f.src}
                src={f.src}
                alt=""
                aria-hidden="true"
                width={260}
                height={260}
                fetchPriority="low"
                className={`dish-float pointer-events-none absolute z-20 h-auto drop-shadow-[0_24px_30px_rgba(0,0,0,0.6)] ${f.cls}`}
                style={{ ['--rot' as string]: f.rot, ['--dur' as string]: f.dur, ['--delay' as string]: f.delay }}
              />
            ))}
            <a
              href={menuDemoHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open the live QR menu as table 1"
              className="relative z-10 block h-full overflow-hidden rounded-[2.2rem] border border-white/20 bg-black p-2 shadow-[0_50px_100px_rgba(0,0,0,0.7)]"
            >
              <img
                src="/restaurant/menu-phone.webp"
                alt="The live QR menu on a phone: dish photos, prices and Table 1 filled in"
                width={390}
                height={694}
                className="h-full w-full rounded-[1.8rem] object-cover object-top"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function VenueStrip() {
  const items = [...venues, ...venues];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-[#0b0807] py-5" aria-hidden="true">
      <div className="dish-marquee flex w-max items-center gap-10">
        {items.map((v, i) => (
          <span key={`${v}-${i}`} className="flex items-center gap-10">
            <span className="whitespace-nowrap text-2xl font-light uppercase tracking-tight text-white/80 sm:text-3xl">{v}</span>
            <img src={dishImage(stripDishes[i % stripDishes.length])} alt="" width={56} height={56} loading="lazy" className="h-12 w-12 sm:h-14 sm:w-14" />
          </span>
        ))}
      </div>
    </div>
  );
}

function Problem() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-10 sm:py-28 lg:px-12">
      <img
        src={dishImage('wonton-soup')}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute -right-16 top-10 hidden w-72 rotate-12 opacity-80 drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)] lg:block"
      />
      <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-2 lg:gap-20 lg:pr-40">
        <h2 className="text-3xl font-light uppercase leading-tight tracking-tight text-foreground sm:text-5xl">
          Menus, hours and booking links change.{' '}
          <span className="text-[#e7a86b]">Your website should keep up.</span>
        </h2>
        <div className="space-y-5 text-base leading-relaxed text-dim sm:text-lg">
          <p>
            For a restaurant group, the hard part isn’t the homepage. It’s keeping every branch accurate: this week’s
            brunch menu, Ramadan hours at one location, a new delivery partner at another, prices that changed across
            the brand.
          </p>
          <p>
            We design restaurant websites around that reality, so guests always find the right menu, hours and booking
            link for the branch they’re visiting, and your team isn’t chasing outdated PDFs and links.
          </p>
        </div>
      </div>
    </section>
  );
}

function GuestFeatures() {
  return (
    <section aria-labelledby="guests-heading" className="px-6 pb-24 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-[1320px]">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50 sm:text-xs">On the guest’s phone</p>
        <h2 id="guests-heading" className="mb-12 text-4xl font-light uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          What your guests see <span className="text-white/40">when they look you up</span>
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {guestFeatures.map((f, i) => {
            const { icon: Icon, dish } = featureArt[i];
            return (
              <article
                key={f.title}
                className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-[linear-gradient(160deg,rgba(214,96,48,0.14),rgba(255,255,255,0.02)_45%,rgba(0,0,0,0)_100%)] p-7"
              >
                <img
                  src={dishImage(dish)}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="pointer-events-none absolute -bottom-12 -right-8 w-40 opacity-95 drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-6"
                />
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e7a86b]/15 text-[#f3cfa6]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs tracking-[0.22em] text-white/40">{pad(i + 1)}</span>
                </div>
                <h3 className="mt-8 text-2xl font-light text-foreground">{f.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-white/65">{f.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TeamFeatures() {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-[#0b0807] px-6 py-24 sm:px-10 lg:px-12">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_60%_at_0%_50%,rgba(214,96,48,0.18),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="relative">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50 sm:text-xs">For your marketing team</p>
          <h2 className="text-4xl font-light uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
            Built for groups <span className="text-white/40">with more than one branch</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-dim">
            We plan the structure before the design, so each branch and brand has its own place for the details that
            change most.
          </p>
          <div className="relative mt-10 hidden h-48 sm:block" aria-hidden="true">
            <img src={dishImage('shrimp-fried-rice')} alt="" loading="lazy" className="dish-float absolute left-0 top-0 w-44 drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]" style={{ ['--rot' as string]: '-6deg' }} />
            <img src={dishImage('peach-iced-tea')} alt="" loading="lazy" className="dish-float absolute left-40 top-6 w-28 drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]" style={{ ['--rot' as string]: '8deg', ['--delay' as string]: '-2s' }} />
            <img src={dishImage('har-gow')} alt="" loading="lazy" className="dish-float absolute left-64 top-0 w-40 drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]" style={{ ['--rot' as string]: '4deg', ['--delay' as string]: '-4s' }} />
          </div>
        </div>
        <ol className="grid gap-3 sm:grid-cols-2">
          {teamFeatures.map((item, i) => (
            <li
              key={item}
              className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur transition-colors hover:border-[#e7a86b]/40"
            >
              <span className="font-mono text-xs text-[#e7a86b]">{pad(i + 1)}</span>
              <span className="text-sm leading-relaxed text-white/80">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FoodBuilds() {
  return (
    <section aria-labelledby="builds-heading" className="pt-24">
      <div className="mb-4 px-6 sm:px-10 lg:px-12"><div className="mx-auto max-w-[1320px]">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50 sm:text-xs">Showcase / Food &amp; drink builds</p>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <h2 id="builds-heading" className="text-4xl font-light uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Made to make food <span className="text-[#e7a86b]">look as good as it tastes</span>
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-dim sm:text-base lg:text-right">
            Two of our concept builds. Scroll through them: the dishes and drinks assemble and change as you go.
          </p>
        </div>
      </div></div>
      <FreshBowl />
      <IcedMenu />
    </section>
  );
}

function ConceptAndClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (openIndex !== null && !d.open) d.showModal();
    if (openIndex === null && d.open) d.close();
  }, [openIndex]);

  const current = openIndex !== null ? restaurantConcepts[openIndex] : null;
  const featured = restaurantConcepts.slice(0, 8);
  const emberOakIndex = restaurantConcepts.findIndex((c) => c.id === 'ember-oak');
  const emberOak = restaurantConcepts[emberOakIndex >= 0 ? emberOakIndex : 0];

  return (
    <section aria-labelledby="restaurant-concepts-heading" className="px-6 pb-24 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-[1320px]">
        <header className="mb-12 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#f3cfa6] sm:text-xs">
              Concept designs · Restaurants &amp; cafés
            </p>
            <h2
              id="restaurant-concepts-heading"
              className="text-4xl font-light uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Tailored to every <span className="text-[#e7a86b]">dining concept</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-dim sm:text-base lg:text-right">
            From Khaleeji hospitality and wood-fired grills to late-night lounges and dumpling bars. Hover any window to
            scroll the homepage, or click to inspect the full layout.
          </p>
        </header>

        <ul className="-mx-6 mb-12 flex snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto px-6 pb-4 sm:-mx-10 sm:scroll-px-10 sm:px-10 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          {featured.map((concept, index) => (
            <li key={concept.id} className="w-[74vw] max-w-[330px] shrink-0 snap-start sm:w-[44vw] lg:w-auto lg:max-w-none">
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`View the full ${concept.name} restaurant concept design`}
                className="group block w-full text-left outline-none"
              >
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-[border-color,transform] duration-500 group-hover:-translate-y-1 group-hover:border-[#e7a86b]/50 group-focus-visible:border-[#e7a86b]">
                  <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3.5 py-2.5">
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                    <span className="ml-2 truncate rounded bg-white/[0.05] px-2 py-0.5 font-mono text-[9px] tracking-wide text-white/40">
                      {concept.domain}
                    </span>
                  </div>
                  <div className="concept-window relative aspect-[4/5] overflow-hidden">
                    <img
                      src={concept.thumb}
                      alt={`${concept.name} restaurant website concept: ${concept.cuisine}`}
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
                    <span className="font-mono text-[10px] tracking-[0.2em] text-[#e7a86b]">{pad(index + 1)}</span>
                    <h3 className="mt-1 text-lg font-light uppercase leading-tight tracking-tight text-foreground">
                      {concept.name}
                    </h3>
                    <p className="mt-1 text-xs text-dim">{concept.cuisine}</p>
                  </div>
                  <ArrowUpRight
                    className="mt-5 h-4 w-4 shrink-0 text-white/40 transition-colors group-hover:text-[#e7a86b]"
                    aria-hidden="true"
                  />
                </div>
              </button>
            </li>
          ))}
        </ul>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Ember & Oak: the page scrolls inside the window on hover */}
          <button
            type="button"
            onClick={() => setOpenIndex(emberOakIndex >= 0 ? emberOakIndex : 0)}
            className="group text-left outline-none"
            aria-label="View the full Ember & Oak concept design"
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c0c] shadow-[0_40px_80px_rgba(0,0,0,0.5)] transition-colors group-hover:border-white/25">
              <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="ml-3 rounded bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-white/40">
                  {emberOak.domain}
                </span>
              </div>
              <div className="concept-window relative aspect-[16/11] overflow-hidden">
                <img
                  src={emberOak.image}
                  alt="Ember & Oak specialty coffee website concept"
                  width={1024}
                  height={1536}
                  loading="lazy"
                  decoding="async"
                  className="concept-page absolute inset-x-0 top-0 h-auto w-full"
                />
              </div>
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#e7a86b]">
                  Concept design · Specialty coffee
                </p>
                <h3 className="mt-2 text-2xl font-light uppercase tracking-tight text-foreground">{emberOak.name}</h3>
                <p className="mt-1 text-sm text-dim">Hover to scroll the full homepage. Fictional brand.</p>
              </div>
              <ArrowUpRight className="mt-6 h-5 w-5 text-white/50 transition-colors group-hover:text-white" aria-hidden="true" />
            </div>
          </button>

          <div className="grid gap-6">
            <a
              href="https://cloudkitchensetup.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-3xl border border-white/10"
            >
              <img
                src="/portfolio/cloud-kitchen-setup.webp"
                alt="CKS by Business Lab website shown on a desktop monitor"
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="flex items-center justify-between gap-4 p-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
                    Client work · Food &amp; beverage
                  </p>
                  <h3 className="mt-2 text-xl font-light text-foreground">CKS by Business Lab</h3>
                </div>
                <ArrowUpRight className="h-5 w-5 text-white/60" aria-hidden="true" />
              </div>
            </a>
            <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[linear-gradient(160deg,rgba(214,96,48,0.18),rgba(0,0,0,0)_60%)] p-7">
              <p className="text-lg font-light leading-snug text-white/85">
                More motion builds for skincare, fashion and tech brands live on our showcase.
              </p>
              <div className="mt-6">
                <ArrowLink href="/showcase/">See the full showcase</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setOpenIndex(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpenIndex(null);
        }}
        aria-label={current ? `${current.name} concept design` : 'Concept design'}
        className="m-auto h-[92dvh] w-[min(92vw,760px)] max-w-none overflow-hidden rounded-2xl border border-white/15 bg-[#0b0b0b] p-0 text-foreground backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
              <div>
                <p className="text-sm uppercase tracking-wide">{current.name}</p>
                <p className="text-xs text-dim">{current.cuisine}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpenIndex(null)}
                aria-label="Close"
                autoFocus
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <img
                src={current.image}
                alt={`${current.name} full homepage concept`}
                width={1024}
                height={1536}
                className="block h-auto w-full"
              />
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}

function QrDemo() {
  return (
    <section aria-labelledby="try-heading" className="relative overflow-hidden border-y border-white/[0.06] bg-[#0b0807] px-6 py-24 sm:px-10 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_60%_at_90%_40%,rgba(214,96,48,0.22),transparent_70%)]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[#f3cfa6] sm:text-xs">Test it yourself</p>
          <h2 id="try-heading" className="text-4xl font-light uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
            Scan a table. <span className="text-[#e7a86b]">Order on WhatsApp.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-dim">
            These are real table cards for a live menu we built. Scan one with your phone camera, add a few dishes and
            press send: the order opens in WhatsApp with the table number already in it. No typing, no app.
          </p>
          <ol className="mt-8 grid max-w-md gap-3 text-sm text-white/80">
            {['Point your phone camera at a card', 'Add dishes from the menu', 'Send the order on WhatsApp, table included'].map((step, i) => (
              <li key={step} className="flex items-center gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e7a86b]/15 font-mono text-xs text-[#f3cfa6]">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <a
            href={menuDemoHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
          >
            On a computer? Open the menu
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <ul className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-6 px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
          {tableCards.map((t, i) => (
            <li key={t.code} className={`w-[62%] shrink-0 snap-start sm:w-auto ${i === 1 ? 'sm:-translate-y-6' : ''}`}>
              <a
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] transition-transform hover:-translate-y-1"
                aria-label={`Open the live menu as table ${t.table}`}
              >
                <img src={t.webp} alt={`QR code card for table ${t.table}`} width={450} height={619} loading="lazy" decoding="async" className="block h-auto w-full" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="px-6 py-24 sm:px-10 lg:px-12">
      <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 className="text-4xl font-light uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
            Common <span className="text-white/40">questions</span>
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href={enquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#e7a86b] px-7 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
            >
              Discuss your restaurant website
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="mt-6">
            <ArrowLink href="/website-design-dubai/">All website design services</ArrowLink>
          </div>
        </div>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {restaurantFaqs.map((faq, i) => (
            <details key={faq.question} className="group py-6" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg text-foreground [&::-webkit-details-marker]:hidden">
                {faq.question}
                <Plus className="h-5 w-5 shrink-0 text-[#e7a86b] transition-transform group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-dim">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
