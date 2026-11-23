import { useEffect, useRef } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { contactConfig } from '../config';
import { demoTables } from '../content/menuDemo';

const points = [
  'Scan the table QR code: no app to download',
  'Photos for every dish, laid out for phones',
  'Update dishes and prices any time, no reprinting',
  'English and Arabic, in your brand’s look',
];

const whatsappUrl = `https://wa.me/${contactConfig.phone.replace(/\+/g, '')}?text=${encodeURIComponent(
  'Hello Four Pillars, I would like a digital QR menu for my restaurant or café.',
)}`;

/**
 * Homepage section for restaurant and café QR menus. The vertical demo video
 * (about 450 KB, no sound) only starts downloading when the section comes near the
 * screen, and pauses when it leaves. Reduced-motion visitors see the still.
 */
export default function DigitalMenu() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) video.src = '/digital-menu.mp4';
          video.play()?.catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: '200px 0px', threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="digital-menu-heading"
      className="relative overflow-hidden border-b border-white/[0.06] px-6 py-20 sm:px-10 sm:py-24 lg:px-12"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(45%_60%_at_75%_50%,rgba(201,140,70,0.16),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
        <div>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50 sm:text-xs">
            Restaurants &amp; cafés / Digital menus
          </p>
          <h2
            id="digital-menu-heading"
            className="text-4xl font-light uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Your menu, <span className="text-white/45">one scan away</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-dim">
            We design QR code menus for restaurants and cafés that look as good as your dining room. Guests scan the code
            on the table and your full menu opens on their phone, instantly.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm leading-snug text-white/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
            >
              Get a menu for your venue
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="/contact/"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm text-foreground transition-colors hover:border-white/40"
            >
              Ask about pricing
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[340px] lg:max-w-[380px]">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-black shadow-[0_40px_90px_rgba(0,0,0,0.6)]">
            <video
              ref={videoRef}
              poster="/digital-menu-poster.webp"
              muted
              loop
              playsInline
              preload="none"
              disablePictureInPicture
              aria-label="Video: a guest scans the QR code on a restaurant table and the menu opens on their phone"
              className="block aspect-[416/736] h-auto w-full object-cover"
            />
          </div>
          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
            Scan · open · order
          </p>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-[1320px] border-t border-white/[0.08] pt-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/50 sm:text-xs">
              Try it / One code per table
            </p>
            <h3 className="text-2xl font-light uppercase leading-tight tracking-tight text-foreground sm:text-3xl">
              The table number <span className="text-white/45">fills itself in</span>
            </h3>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-dim sm:text-base">
              Every table gets its own QR code, so the menu already knows where the guest is sitting and nobody types a
              table number. Scan a card with your phone, or tap one to open the demo menu.
            </p>
          </div>

          <ul className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-6 px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
            {demoTables.map((t) => (
              <li key={t.code} className="w-[62%] shrink-0 snap-start sm:w-auto">
                <a
                  href={`/menu-demo/?t=${t.code}`}
                  className="group block overflow-hidden rounded-2xl border border-white/10 transition-transform hover:-translate-y-1"
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
                <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
                  <span>Table {t.table}</span>
                  <a href={t.png} download className="text-white/60 underline-offset-4 hover:text-white hover:underline">
                    Download
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
