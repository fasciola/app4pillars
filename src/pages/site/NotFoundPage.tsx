import PageHero, { ArrowLink } from '../../components/PageHero';
import { primaryNav } from '../../content/site';

/** Shown for any unknown address (GitHub Pages serves it as 404.html). */
export default function NotFoundPage() {
  return (
    <PageHero
      eyebrow="404 / Page not found"
      title={
        <>
          This page <span className="text-white/45">does not exist</span>
        </>
      }
      intro="The link may be old or mistyped. Here is where you can go instead:"
    >
      <ArrowLink href="/">Home</ArrowLink>
      {primaryNav.map((item) => (
        <ArrowLink key={item.href} href={item.href}>
          {item.label}
        </ArrowLink>
      ))}
    </PageHero>
  );
}
