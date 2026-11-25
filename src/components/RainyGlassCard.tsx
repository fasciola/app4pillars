import { lazy, Suspense, type ComponentType, type ReactNode } from 'react';

// Cast explicitly: under tsc's composite/declaration-emit build (`tsc -b`),
// React.lazy()'s inferred prop type can collapse to `{}` for a dynamically
// imported component, which then rejects the `contained` prop below even
// though RainOnGlass declares it. The plain `vite build` type-checks fine
// either way; this just keeps `npm run check` clean too.
const RainOnGlass = lazy(() => import('./RainOnGlass')) as unknown as ComponentType<{ contained?: boolean }>;

/**
 * A glassmorphic card with the site's rain-on-glass effect running behind it,
 * as if looking out through a rain-streaked office window at a procedural
 * night skyline. Used where a single card deserves a moment of cinematic
 * texture (office/location cards, feature callouts) instead of making rain
 * the background of an entire page.
 */
export default function RainyGlassCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`liquid-glass rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.45)] ${className}`}>
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Suspense fallback={<div className="h-full w-full bg-[#060608]" />}>
          <RainOnGlass contained />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
      </div>
      {children}
    </div>
  );
}
