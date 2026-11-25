import { contactConfig, footerConfig } from '../config';
import { footerNav } from '../content/site';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import FooterBackgroundVideo from '../components/FooterBackgroundVideo';

/**
 * Closing block shared by every page: the "Start a Project" call to action
 * and the footer, over one continuous artwork layer. The Contact page passes
 * showCta={false} because its own content already is the call to action.
 */
export default function Contact({ showCta = true }: { showCta?: boolean }) {
  const whatsappUrl = `https://wa.me/${contactConfig.phone.replace(/\+/g, '')}`;

  return (
    <div className="relative isolate overflow-hidden">
      {/* One continuous artwork layer behind the contact CTA and footer. */}
      <FooterBackgroundVideo />
      {/* "Drift", the Blue Ocean bioluminescent creature, framing the CTA
          from one edge as a soft blended glow rather than a sharp cutout —
          carried through to the closing CTA on every page. ("Current" used
          to bleed in from the left here too, but it got lost behind the
          footer video — moved to the immersive capability section instead.) */}
      <img
        src="/motion/glass-creature-poster.webp"
        alt=""
        aria-hidden="true"
        className="absolute -right-[8%] bottom-0 -z-20 h-[115%] w-auto max-w-none opacity-[0.22] mix-blend-screen blur-[1px] sm:opacity-30"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_42%,rgba(53,216,240,0.16),transparent_38%),linear-gradient(90deg,rgba(6,12,26,0.6)_0%,rgba(6,12,26,0.32)_30%,rgba(6,12,26,0.16)_50%,rgba(6,12,26,0.32)_70%,rgba(6,12,26,0.6)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-24 -z-10 bg-gradient-to-b from-[#060c1a]/25 to-transparent" />

      {showCta && (
      <section id="start-a-project" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-foreground tracking-tight mb-6 drop-shadow-[0_6px_22px_rgba(0,0,0,0.45)]">
            {contactConfig.title}
          </h2>
          <p className="text-white/70 max-w-xl mx-auto leading-relaxed mb-12 drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]">
            {contactConfig.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass-strong inline-flex items-center gap-3 px-10 py-5 rounded-full text-foreground text-base font-medium tracking-wide hover:scale-105 transition-transform duration-300 group"
            >
              <svg className="relative z-10 w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="relative z-10">WhatsApp Us</span>
              <ArrowUpRight className="relative z-10 w-4 h-4 text-green-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={`mailto:${contactConfig.email}`}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-white/70 hover:text-white text-base font-medium tracking-wide border border-white/15 hover:border-white/25 bg-black/[0.08] backdrop-blur-sm hover:scale-105 transition-all duration-300 group"
            >
              <Mail className="w-5 h-5 text-accent" />
              <span>Email Us</span>
            </a>
          </div>

          {/* Contact details */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-white/65 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span className="font-mono tracking-wide">+971 56 707 4922</span>
            </a>
            <span className="hidden sm:block w-px h-4 bg-white/15" />
            <a href={`mailto:${contactConfig.email}`} className="flex items-center gap-2 text-sm text-white/65 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5 text-accent" />
              <span className="font-mono tracking-wide">{contactConfig.email}</span>
            </a>
          </div>
        </div>
      </section>
      )}

      {/* Footer shares the same background so the artwork continues to the bottom edge. */}
      <footer className={`relative px-6 py-12 ${showCta ? '' : 'pt-40'} border-t border-white/[0.08] bg-black/[0.05] backdrop-blur-[1px]`}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-0.5 h-4 bg-accent/60 rounded-full"
                />
              ))}
            </div>
            <span className="flex flex-col gap-1 text-center lg:text-left">
              <span className="text-xs text-white/55 tracking-wider lg:whitespace-nowrap">{footerConfig.copyright}</span>
              <span className="text-[11px] text-white/45 tracking-wider">
                Four Pillars Web Design is a brand of{' '}
                <a
                  href="https://businesslab.ae/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/20 underline-offset-2 hover:text-white/75 hover:decoration-white/50"
                >
                  Business Lab
                </a>
                .
              </span>
            </span>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-white/55">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-[10px] text-white/45 tracking-widest uppercase">
            {footerConfig.tagline}
          </p>
        </div>
      </footer>
    </div>
  );
}
