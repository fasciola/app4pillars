import { useState } from 'react';
import { Palette, Compass, Zap, Shield, ShoppingBag, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { servicesConfig } from '../config';

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Compass,
  Zap,
  Shield,
  ShoppingBag,
  TrendingUp,
};

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Expertise as a row of expanding panels. On large screens all six services
 * sit side by side as tall slices; the one you hover, focus or tap opens up to
 * show its artwork and description while the others shrink to a number and a
 * vertical title. Below the lg breakpoint the panels become a plain stack of
 * cards, each with its own image and text, so nothing depends on hover.
 */
export default function Services() {
  const [active, setActive] = useState(0);
  const items = servicesConfig.items;

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative z-10 px-6 py-24 sm:px-10 sm:py-28 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-[1320px]">
        <header className="mb-12 grid gap-6 border-b border-white/10 pb-10 lg:mb-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50 sm:text-xs">
              Services / What we do
            </p>
            <h2
              id="services-heading"
              className="text-4xl font-light uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl lg:text-7xl"
            >
              {servicesConfig.title}
            </h2>
          </div>
          <div className="max-w-md lg:text-right">
            <p className="text-sm leading-relaxed text-dim sm:text-base">{servicesConfig.subtitle}</p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40 sm:text-xs">
              {pad(items.length)} disciplines
            </p>
          </div>
        </header>

        {/* Large screens: expanding panels */}
        <ul className="hidden h-[clamp(30rem,62vh,38rem)] gap-3 lg:flex" aria-label="Services">
          {items.map((service, index) => {
            const Icon = iconMap[service.icon];
            const isActive = index === active;
            return (
              <li
                key={service.title}
                className="relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-[flex-grow,border-color] duration-700 [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"
                style={{ flexGrow: isActive ? 5.2 : 1, flexBasis: 0 }}
                onPointerEnter={(event) => {
                  if (event.pointerType !== 'touch') setActive(index);
                }}
              >
                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={`service-panel-${index}`}
                  onClick={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className="absolute inset-0 z-20 cursor-pointer rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/60"
                >
                  <span className="sr-only">{service.title}</span>
                </button>

                <img
                  src={service.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 h-full w-full object-cover transition-[transform,filter,opacity] duration-700 ease-out motion-reduce:transition-none ${
                    isActive ? 'scale-100 opacity-100 saturate-100' : 'scale-110 opacity-45 saturate-50'
                  }`}
                />
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
                    isActive
                      ? 'bg-gradient-to-t from-black via-black/55 to-black/5'
                      : 'bg-gradient-to-t from-black/90 via-black/60 to-black/40'
                  }`}
                />

                {/* Top row: number + icon */}
                <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-5">
                  <span
                    className={`font-mono text-[11px] tracking-[0.2em] transition-colors duration-500 ${
                      isActive ? 'text-accent' : 'text-white/55'
                    }`}
                  >
                    {pad(index + 1)}
                  </span>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-500 ${
                      isActive ? 'border-white/30 bg-black/30 opacity-100' : 'border-white/15 bg-black/20 opacity-0'
                    }`}
                  >
                    {Icon && <Icon className="h-4 w-4 text-white/90" aria-hidden="true" />}
                  </span>
                </div>

                {/* Collapsed: vertical title */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute bottom-6 left-1/2 z-10 origin-center -translate-x-1/2 whitespace-nowrap text-sm font-light uppercase tracking-[0.18em] text-white/80 transition-opacity duration-300 [writing-mode:vertical-rl] rotate-180 ${
                    isActive ? 'opacity-0' : 'opacity-100 delay-200'
                  }`}
                >
                  {service.title}
                </span>

                {/* Expanded: title + description */}
                <div
                  id={`service-panel-${index}`}
                  className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 p-7 transition-[opacity,transform] duration-500 xl:p-9 ${
                    isActive ? 'translate-y-0 opacity-100 delay-200' : 'translate-y-4 opacity-0'
                  }`}
                  aria-hidden={!isActive}
                >
                  <h3 className="min-w-[22rem] text-3xl font-light uppercase leading-none tracking-tight text-foreground xl:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-md min-w-[22rem] text-sm leading-relaxed text-white/75 xl:text-base">
                    {service.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Phones and tablets: stacked cards */}
        <ol className="grid gap-5 sm:grid-cols-2 lg:hidden">
          {items.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <li
                key={service.title}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={service.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  <span className="absolute left-4 top-4 font-mono text-[11px] tracking-[0.2em] text-accent">
                    {pad(index + 1)}
                  </span>
                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/30 backdrop-blur-sm">
                    {Icon && <Icon className="h-4 w-4 text-white/90" aria-hidden="true" />}
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  {/* role=heading keeps this a heading for screen readers on small screens
                      without repeating the six <h3>s of the desktop panels in the HTML. */}
                  <p
                    role="heading"
                    aria-level={3}
                    className="text-xl font-light uppercase leading-tight tracking-tight text-foreground"
                  >
                    {service.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-dim">{service.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
