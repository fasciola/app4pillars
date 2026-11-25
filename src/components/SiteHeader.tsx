import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { primaryNav } from '../content/site';

/**
 * Site-wide header. Every item is a real link to its own page, so the menu is
 * crawlable and works without JavaScript. `currentPath` highlights the page
 * you are on.
 */
export default function SiteHeader({ currentPath }: { currentPath: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isCurrent = (href: string) => currentPath === href;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled || open ? 'border-b border-white/[0.06] bg-black/70 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="px-6 sm:px-10 lg:px-12">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between">
        <a href="/" className="flex items-center" aria-label="Four Pillars Web Design home">
          <img src="/logo-wordmark.webp" alt="Four Pillars Web Design" width={174} height={28} className="h-6 w-auto sm:h-7" />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={isCurrent(item.href) ? 'page' : undefined}
              className={`relative rounded-md px-4 py-2 text-[13px] tracking-wide transition-colors ${
                isCurrent(item.href) ? 'text-foreground' : 'text-white/60 hover:text-foreground'
              }`}
            >
              {item.label}
              {isCurrent(item.href) && <span className="absolute inset-x-4 -bottom-0.5 h-px bg-accent" aria-hidden="true" />}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/contact/"
            className="hidden items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-[12px] font-medium tracking-wide text-foreground transition-colors hover:border-white/40 hover:bg-white/5 sm:inline-flex"
          >
            Start a project
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center text-white/70 transition-colors hover:text-white lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/[0.06] bg-black/95 px-6 pb-10 pt-6 lg:hidden"
        >
          <ul className="grid gap-1">
            {[{ label: 'Home', href: '/' }, ...primaryNav].map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                  className={`flex items-baseline gap-4 border-b border-white/[0.06] py-4 text-3xl font-light uppercase tracking-tight ${
                    isCurrent(item.href) ? 'text-foreground' : 'text-white/60'
                  }`}
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-accent">{String(index + 1).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/contact/"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm text-foreground"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </nav>
      )}
    </header>
  );
}
