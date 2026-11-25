/**
 * Faceted gem centerpiece for the homepage's "immersive" capability section —
 * a pure CSS/SVG construct (no WebGL/Three.js) that reads as a floating,
 * light-catching 3D object: a faceted crystal that spins on its own axis,
 * bobs gently, and has three small shapes orbiting it, all wrapped in a
 * bioluminescent glow. This matches the site's existing house style for "3D"
 * effects (PracticeCube's CSS-transform cube, FlowField's shader canvas) —
 * everything here is CSS animation and inline SVG, so it costs nothing at
 * the network layer and is cheap to run on any device. All animation is
 * disabled under prefers-reduced-motion (see index.css).
 */
export default function ImmersiveGem() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]" aria-hidden="true">
      {/* Ambient glow behind the gem */}
      <div
        className="absolute inset-[8%] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(53,216,240,0.35) 0%, rgba(168,120,255,0.18) 55%, transparent 75%)',
        }}
      />

      {/* Three small shapes orbiting the gem at different speeds/radii */}
      <div className="gem-orbit gem-orbit--a absolute inset-0">
        <span className="gem-chip gem-chip--ring" />
      </div>
      <div className="gem-orbit gem-orbit--b absolute inset-0">
        <span className="gem-chip gem-chip--cube" />
      </div>
      <div className="gem-orbit gem-orbit--c absolute inset-0">
        <span className="gem-chip gem-chip--dot" />
      </div>

      {/* The gem: floats up and down, and separately spins on its Y axis */}
      <div className="gem-float absolute inset-0 flex items-center justify-center">
        <div className="gem-spin-stage">
          <div className="gem-spin">
            <svg viewBox="0 0 200 200" className="h-[58%] w-[58%] drop-shadow-[0_0_45px_rgba(53,216,240,0.5)]">
              <defs>
                <linearGradient id="gemA" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#bdeeff" />
                  <stop offset="100%" stopColor="#35d8f0" />
                </linearGradient>
                <linearGradient id="gemB" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#35d8f0" />
                  <stop offset="100%" stopColor="#1d7f94" />
                </linearGradient>
                <linearGradient id="gemC" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#a878ff" />
                  <stop offset="100%" stopColor="#5a3fa8" />
                </linearGradient>
                <linearGradient id="gemD" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e7d7ff" />
                  <stop offset="100%" stopColor="#a878ff" />
                </linearGradient>
              </defs>
              {/* Top facets (crown) */}
              <polygon points="100,15 158,100 129,129.4" fill="url(#gemA)" />
              <polygon points="100,15 129,129.4 71,129.4" fill="url(#gemD)" opacity="0.92" />
              <polygon points="100,15 71,129.4 42,100" fill="url(#gemA)" opacity="0.8" />
              <polygon points="100,15 42,100 71,70.6" fill="url(#gemC)" />
              <polygon points="100,15 71,70.6 129,70.6" fill="url(#gemD)" />
              <polygon points="100,15 129,70.6 158,100" fill="url(#gemC)" opacity="0.88" />
              {/* Bottom facets (pavilion) */}
              <polygon points="100,185 158,100 129,129.4" fill="url(#gemB)" />
              <polygon points="100,185 129,129.4 71,129.4" fill="url(#gemC)" opacity="0.85" />
              <polygon points="100,185 71,129.4 42,100" fill="url(#gemB)" opacity="0.75" />
              <polygon points="100,185 42,100 71,70.6" fill="url(#gemA)" opacity="0.7" />
              <polygon points="100,185 71,70.6 129,70.6" fill="url(#gemC)" opacity="0.8" />
              <polygon points="100,185 129,70.6 158,100" fill="url(#gemA)" opacity="0.6" />
              {/* Facet edges, for the cut-gem read */}
              <g stroke="rgba(255,255,255,0.4)" strokeWidth="0.75" fill="none">
                <polygon points="158,100 129,129.4 71,129.4 42,100 71,70.6 129,70.6 158,100" />
                <line x1="100" y1="15" x2="158" y2="100" />
                <line x1="100" y1="15" x2="129" y2="129.4" />
                <line x1="100" y1="15" x2="71" y2="129.4" />
                <line x1="100" y1="15" x2="42" y2="100" />
                <line x1="100" y1="15" x2="71" y2="70.6" />
                <line x1="100" y1="15" x2="129" y2="70.6" />
                <line x1="100" y1="185" x2="158" y2="100" />
                <line x1="100" y1="185" x2="129" y2="129.4" />
                <line x1="100" y1="185" x2="71" y2="129.4" />
                <line x1="100" y1="185" x2="42" y2="100" />
                <line x1="100" y1="185" x2="71" y2="70.6" />
                <line x1="100" y1="185" x2="129" y2="70.6" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
