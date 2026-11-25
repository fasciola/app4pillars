import { ArrowRight, CheckCircle2, Code2, Gauge, Search, ShoppingBag, Smartphone } from 'lucide-react';
import Portfolio from '../sections/Portfolio';
import PracticeCube from '../sections/PracticeCube';
import HeroBackgroundVideo from '../components/HeroBackgroundVideo';
import BusinessLabOffices from '../components/BusinessLabOffices';
import { websiteDesignDubaiFaqs } from '../content/websiteDesignDubaiFaqs';
import { processSteps, strengths } from '../content/site';

const services = [
  {
    icon: Code2,
    title: 'Website Design & Development',
    body: 'Custom responsive websites designed around your brand, customer journey and commercial goals, with clean production-ready front-end development.',
  },
  {
    icon: ShoppingBag,
    title: 'E-Commerce Website Design',
    body: 'Premium online stores with clear product discovery, mobile-first shopping journeys and conversion-focused checkout experiences for UAE customers.',
  },
  {
    icon: Search,
    title: 'SEO-Ready Website Structure',
    body: 'Search-friendly page architecture, metadata, structured content and technical foundations designed to help your website compete in Dubai search results.',
  },
  {
    icon: Gauge,
    title: 'Performance Optimization',
    body: 'Fast-loading experiences with optimized assets, responsive delivery and careful front-end engineering to improve usability and Core Web Vitals.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First UX',
    body: 'Layouts, navigation and calls to action designed for the way customers in the UAE browse, compare services and contact businesses on mobile devices.',
  },
  {
    icon: CheckCircle2,
    title: 'Conversion-Focused Design',
    body: 'Clear messaging, trust signals, landing-page structure and calls to action that turn website traffic into enquiries, leads and customers.',
  },
];


export default function WebsiteDesignDubai() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-black text-white">
        <HeroBackgroundVideo />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.60)_0%,rgba(0,0,0,0.40)_30%,rgba(0,0,0,0.16)_60%,rgba(0,0,0,0.30)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/35 via-black/12 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-20">
          <div className="min-h-[72vh] flex items-center">
            <div className="max-w-5xl text-left">
              <div className="inline-flex items-center gap-3 mb-7 rounded-full border border-white/15 bg-black/12 px-5 py-2 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-white/80" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] text-white/75">
                  Website Design Dubai · UAE
                </span>
              </div>

              <h1 className="font-light tracking-[-0.07em] leading-[0.88] text-[clamp(3.8rem,9vw,8rem)] text-white/95 whitespace-pre-line drop-shadow-[0_10px_35px_rgba(0,0,0,0.42)]">
                Website Design Dubai{`\n`}Built to Perform
              </h1>

              <p className="mt-7 max-w-2xl text-base sm:text-lg text-white/82 leading-relaxed drop-shadow-[0_4px_18px_rgba(0,0,0,0.40)]">
                Four Pillars creates premium, responsive and SEO-ready websites for businesses in Dubai and across the UAE. We combine strategy, design, development and performance to build digital experiences that look distinctive and generate enquiries.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row items-start gap-4">
                <button
                  onClick={() => scrollTo('start-a-project')}
                  className="liquid-glass-strong px-8 py-4 rounded-full text-foreground text-sm font-medium tracking-wide hover:scale-105 transition-transform duration-300 flex items-center gap-2 group"
                >
                  Start Your Website Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollTo('portfolio')}
                  className="px-8 py-4 rounded-full text-sm text-white/80 hover:text-white transition-colors border border-white/15 hover:border-white/30 bg-black/[0.08] backdrop-blur-sm"
                >
                  View Website Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="relative py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <p className="text-[10px] uppercase tracking-[0.28em] text-accent mb-4">Dubai Web Design Services</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-foreground tracking-tight mb-6">
              Website design for ambitious Dubai businesses
            </h2>
            <p className="text-dim leading-relaxed text-base sm:text-lg">
              A strong website has to do more than look modern. It should explain your offer clearly, build trust quickly, perform well on mobile and give search engines a clean structure to understand. Our website design service brings those requirements together in one focused digital experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, body }) => (
              <article key={title} className="liquid-glass rounded-2xl p-7 border border-white/[0.05]">
                <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center mb-6">
                  <Icon className="w-4 h-4 text-accent" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3 tracking-tight">{title}</h3>
                <p className="text-sm text-dim leading-relaxed">{body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-[1320px] flex flex-wrap gap-x-6 gap-y-2">
          <a
            href="/restaurant-website-design-dubai/"
            className="text-sm text-foreground underline underline-offset-4"
          >
            Website design for restaurants and café groups in Dubai
          </a>
          <a href="/website-design-ajman/" className="text-sm text-foreground underline underline-offset-4">
            Website design in Ajman
          </a>
          <a href="/website-design-abu-dhabi/" className="text-sm text-foreground underline underline-offset-4">
            Website design in Abu Dhabi
          </a>
        </div>
      </section>

      <section className="relative py-28 px-6 border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-16 items-start">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-accent mb-4">Why Four Pillars</p>
            <h2 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight mb-6">
              Dubai website design with strategy behind the visuals
            </h2>
            <p className="text-dim leading-relaxed">
              We design for the full customer journey: the first search result, the first impression, the mobile browsing experience, the proof a prospect needs and the final call to action. That means visual design is supported by structure, speed, SEO foundations and conversion thinking from the beginning.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {strengths.map((item) => (
              <div key={item} className="liquid-glass rounded-xl p-5 flex gap-3 items-start">
                <CheckCircle2 className="w-4 h-4 text-accent mt-1 shrink-0" />
                <p className="text-sm text-dim leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[10px] uppercase tracking-[0.28em] text-accent mb-4">Our Process</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-foreground tracking-tight mb-6">
              From idea to launch
            </h2>
            <p className="text-dim leading-relaxed">
              A structured process keeps the website aligned with your brand and business goals while reducing unnecessary revisions and technical surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map(({ number, title, body }) => (
              <article key={number} className="liquid-glass rounded-2xl p-7 min-h-[260px] flex flex-col">
                <span className="font-mono text-xs tracking-[0.22em] text-accent">{number}</span>
                <h3 className="text-2xl font-light text-foreground mt-8 mb-4">{title}</h3>
                <p className="text-sm text-dim leading-relaxed">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PracticeCube />

      <Portfolio />

      <BusinessLabOffices />

      <section className="relative py-28 px-6 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[10px] uppercase tracking-[0.28em] text-accent mb-4">Frequently Asked Questions</p>
            <h2 className="text-4xl sm:text-5xl font-light text-foreground tracking-tight">
              Website design in Dubai: common questions
            </h2>
          </div>

          <div className="space-y-4">
            {websiteDesignDubaiFaqs.map((faq) => (
              <article key={faq.question} className="liquid-glass rounded-2xl p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl text-foreground font-medium mb-3">{faq.question}</h3>
                <p className="text-sm sm:text-base text-dim leading-relaxed">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
