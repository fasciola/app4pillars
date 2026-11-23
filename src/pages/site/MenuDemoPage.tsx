import { useEffect, useState } from 'react';
import { BellRing, Check } from 'lucide-react';
import { demoMenu, demoTables, tableForCode } from '../../content/menuDemo';

type Lang = 'en' | 'ar';
const TABLE_KEY = 'fp-demo-table';

/**
 * The page the demo table QR codes open: /menu-demo/?t=<code>. It turns the
 * code into a table number, remembers it for the visit, and shows a fictional
 * café's menu the way a guest would browse it on a phone.
 *
 * The code is read after the page loads because the prerendered HTML is the
 * same for every table.
 */
export default function MenuDemoPage() {
  const [table, setTable] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [lang, setLang] = useState<Lang>('en');
  const [active, setActive] = useState(demoMenu[0].id);
  const [called, setCalled] = useState(false);

  useEffect(() => {
    const fromUrl = tableForCode(new URLSearchParams(window.location.search).get('t'));
    let saved: string | null = null;
    try {
      if (fromUrl) sessionStorage.setItem(TABLE_KEY, fromUrl);
      saved = sessionStorage.getItem(TABLE_KEY);
    } catch {
      /* storage unavailable: use the URL only */
    }
    setTable(fromUrl ?? saved);
    setReady(true);
  }, []);

  const ar = lang === 'ar';
  const t = (en: string, arText: string) => (ar ? arText : en);

  return (
    <main className="px-4 pb-24 pt-28 sm:px-6 sm:pt-32">
      <div
        dir={ar ? 'rtl' : 'ltr'}
        className="mx-auto w-full max-w-[460px] overflow-hidden rounded-[2rem] border border-white/12 bg-[#0e0e0f] shadow-[0_40px_90px_rgba(0,0,0,0.55)]"
      >
        {/* Header */}
        <div className="border-b border-white/[0.08] px-6 pb-5 pt-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className={ar ? 'text-sm text-[#c9a96e]' : 'font-mono text-[10px] uppercase tracking-[0.25em] text-[#c9a96e]'}>
                {t('Four Pillars Demo Café', 'مقهى فور بيلارز التجريبي')}
              </p>
              <h1 className="mt-2 text-3xl font-light text-foreground">{t('Menu', 'القائمة')}</h1>
            </div>
            <button
              type="button"
              onClick={() => setLang(ar ? 'en' : 'ar')}
              className="rounded-full border border-white/20 px-4 py-1.5 text-xs text-white/80 transition-colors hover:border-white/40"
              aria-label={ar ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              {ar ? 'English' : 'عربي'}
            </button>
          </div>

          <div className="mt-5 min-h-[44px]" aria-live="polite">
            {ready && table && (
              <div className="inline-flex items-center gap-2 rounded-full bg-[#c9a96e]/15 px-4 py-2 text-sm text-[#e8d3a8]">
                <Check className="h-4 w-4" aria-hidden="true" />
                {t(`Table ${table}`, `طاولة ${table}`)}
                <span className="text-white/45">· {t('added automatically', 'أضيفت تلقائياً')}</span>
              </div>
            )}
            {ready && !table && (
              <p className="text-sm leading-relaxed text-white/60">
                {t('No table selected. Open the menu from a table card:', 'لم يتم تحديد طاولة. افتح القائمة من بطاقة الطاولة:')}{' '}
                {demoTables.map((d, i) => (
                  <span key={d.code}>
                    {i > 0 && ' · '}
                    <a href={`/menu-demo/?t=${d.code}`} className="text-white underline underline-offset-4">
                      {t(`Table ${d.table}`, `طاولة ${d.table}`)}
                    </a>
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>

        {/* Category tabs */}
        <nav aria-label={t('Menu sections', 'أقسام القائمة')} className="sticky top-0 z-10 border-b border-white/[0.08] bg-[#0e0e0f]/95 backdrop-blur">
          <ul className="flex gap-2 overflow-x-auto px-6 py-3">
            {demoMenu.map((c) => (
              <li key={c.id} className="shrink-0">
                <a
                  href={`#menu-${c.id}`}
                  onClick={() => setActive(c.id)}
                  className={`block rounded-full px-4 py-1.5 text-sm transition-colors ${
                    active === c.id ? 'bg-white text-black' : 'border border-white/15 text-white/75 hover:border-white/35'
                  }`}
                >
                  {ar ? c.ar : c.en}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Dishes */}
        <div className="px-6 pb-8">
          {demoMenu.map((c) => (
            <section key={c.id} id={`menu-${c.id}`} className="scroll-mt-16 pt-7">
              <h2 className={ar ? 'text-sm text-white/45' : 'font-mono text-[11px] uppercase tracking-[0.25em] text-white/45'}>{ar ? c.ar : c.en}</h2>
              <ul className="mt-3 divide-y divide-white/[0.07]">
                {c.dishes.map((d) => (
                  <li key={d.en} className="flex items-start justify-between gap-4 py-4">
                    <div className="min-w-0">
                      <p className="text-base text-foreground">{ar ? d.ar : d.en}</p>
                      <p className="mt-1 text-sm leading-snug text-white/50">{ar ? d.descAr : d.descEn}</p>
                    </div>
                    <p className="shrink-0 text-sm text-[#e8d3a8]">
                      {t(`AED ${d.price}`, `${d.price} درهم`)}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Call waiter (demo) */}
        <div className="border-t border-white/[0.08] px-6 py-5">
          <button
            type="button"
            disabled={!table}
            onClick={() => setCalled(true)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-opacity disabled:opacity-40"
          >
            <BellRing className="h-4 w-4" aria-hidden="true" />
            {called && table
              ? t(`Waiter called to table ${table}`, `تم استدعاء النادل إلى طاولة ${table}`)
              : t('Call waiter', 'استدعاء النادل')}
          </button>
          <p className="mt-4 text-center text-xs leading-relaxed text-white/40">
            {t(
              'Demo by Four Pillars. The café is fictional and no request is sent.',
              'عرض تجريبي من فور بيلارز. المقهى خيالي ولا يتم إرسال أي طلب.',
            )}
          </p>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-[460px] text-center text-sm text-white/55">
        Want a menu like this for your venue?{' '}
        <a href="/contact/" className="text-white underline underline-offset-4">
          Talk to Four Pillars
        </a>
      </p>
    </main>
  );
}
