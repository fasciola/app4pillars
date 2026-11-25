import { lazy, Suspense, type ReactNode } from 'react';

const FlowField = lazy(() => import('./FlowField'));
const MoonlitRipple = lazy(() => import('./MoonlitRipple'));

/**
 * Opening block for inner pages: eyebrow, the page's single H1, an intro line
 * and optional actions, over a quiet dark gradient with the site's fine grid.
 * `atmosphere` scopes one of the site's ambient canvas effects to just this
 * section (never the whole page) for a touch of cinematic movement.
 */
export default function PageHero({
  eyebrow,
  title,
  intro,
  children,
  aside,
  atmosphere,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  atmosphere?: 'silk' | 'moonlit';
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] px-6 pb-20 pt-36 sm:px-10 sm:pb-24 sm:pt-44 lg:px-12">
      {atmosphere && (
        <div className="absolute inset-0 -z-20 opacity-[0.38]" aria-hidden="true">
          <Suspense fallback={null}>
            {atmosphere === 'silk' ? <FlowField contained /> : <MoonlitRipple contained />}
          </Suspense>
        </div>
      )}
      <div
        className={`pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_85%_0%,rgba(95,140,255,0.12),transparent_70%),radial-gradient(50%_60%_at_0%_100%,rgba(201,161,90,0.08),transparent_70%)] ${atmosphere ? 'bg-black/40' : ''}`}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:25%_25%] [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="max-w-4xl">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 sm:text-xs">{eyebrow}</p>
          <h1 className="text-[clamp(2.8rem,7vw,6.2rem)] font-light uppercase leading-[0.92] tracking-[-0.03em] text-foreground">
            {title}
          </h1>
          <div className="mt-8 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">{intro}</div>
          {children && <div className="mt-10 flex flex-wrap items-center gap-4">{children}</div>}
        </div>
        {aside && <div className="lg:max-w-xs">{aside}</div>}
      </div>
    </section>
  );
}

/** Shared section header used inside pages, matching the portfolio header. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  id,
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  action?: ReactNode;
}) {
  return (
    <header className="mb-12 grid gap-6 border-b border-white/10 pb-10 lg:mb-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
      <div>
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50 sm:text-xs">{eyebrow}</p>
        <h2
          id={id}
          className="text-4xl font-light uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          {title}
        </h2>
      </div>
      {(intro || action) && (
        <div className="max-w-md lg:text-right">
          {intro && <p className="text-sm leading-relaxed text-dim sm:text-base">{intro}</p>}
          {action && <div className="mt-4">{action}</div>}
        </div>
      )}
    </header>
  );
}

/** Text link with an arrow, for "see all" style actions. */
export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground"
    >
      <span className="border-b border-white/30 pb-1 transition-colors group-hover:border-white">{children}</span>
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}
