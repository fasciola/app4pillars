// Shared site structure and long-form copy. Pages, the header, the footer,
// the prerender script and the sitemap all read from here, so a page added or
// renamed here shows up everywhere at once.

export interface NavItem {
  label: string;
  href: string;
}

/** Primary menu, left to right. "Start a project" is a separate button. */
export const primaryNav: NavItem[] = [
  { label: 'Services', href: '/services/' },
  { label: 'Work', href: '/work/' },
  { label: 'Showcase', href: '/showcase/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

/** Footer links: every page, including the Dubai landing page. */
export const footerNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'Website Design Dubai', href: '/website-design-dubai/' },
  { label: 'Work', href: '/work/' },
  { label: 'Showcase', href: '/showcase/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

/**
 * The six disciplines in full, for the Services page. Text carried over from
 * the previous standalone /services/ page.
 */
export const serviceDetails = [
  {
    id: 'website-design-development',
    tag: 'Design · Development',
    title: 'Website Design & Development',
    body: 'Premium responsive websites built around your brand, customer journey and commercial goals. We combine visual direction, UX, responsive engineering and conversion-focused structure.',
    points: [
      'Custom responsive website design',
      'UI/UX and interaction design',
      'Front-end development and integrations',
      'SEO-ready page architecture',
    ],
    image: '/expertise/cinematic.webp',
    link: { label: 'Website design in Dubai', href: '/website-design-dubai/' },
  },
  {
    id: 'e-commerce',
    tag: 'Commerce · Experience',
    title: 'E-Commerce',
    body: 'Online stores designed to make products easier to discover, trust and buy. We focus on product storytelling, mobile shopping journeys and clear checkout paths for UAE customers.',
    points: [
      'Storefront and catalogue design',
      'Product and collection UX',
      'Checkout and conversion optimization',
      'Payment and platform integration planning',
    ],
    image: '/expertise/ecommerce.webp',
  },
  {
    id: 'seo-performance',
    tag: 'Search · Performance',
    title: 'SEO & Performance',
    body: 'Technical foundations that help search engines understand your website and help customers reach it quickly. We improve crawlability, page structure, speed and Core Web Vitals.',
    points: [
      'Technical SEO foundations',
      'Metadata, schema and sitemap setup',
      'Core Web Vitals and asset optimization',
      'Search-focused landing page architecture',
    ],
    image: '/expertise/performance.webp',
  },
  {
    id: 'experience-strategy',
    tag: 'Journey · Strategy',
    title: 'Experience Strategy',
    body: 'We map how customers discover, evaluate and act on your offer, then design the content hierarchy, touchpoints and calls to action around that real decision journey.',
    points: ['Customer journey mapping', 'Information architecture', 'Content and CTA strategy', 'Landing page planning'],
    image: '/expertise/strategy.webp',
  },
  {
    id: 'brand-digital-design',
    tag: 'Brand · Digital',
    title: 'Brand & Digital Design',
    body: 'A distinctive digital presence starts with a coherent visual system. We define the visual direction and translate it across websites, campaigns and customer-facing assets.',
    points: [
      'Visual direction and brand systems',
      'Campaign and landing-page design',
      'Digital creative and content systems',
      'Design systems and reusable assets',
    ],
    image: '/expertise/brand.webp',
  },
  {
    id: 'growth-conversion',
    tag: 'Conversion · Growth',
    title: 'Growth & Conversion',
    body: 'Websites perform when traffic, messaging and conversion paths work together. We refine landing pages, calls to action, analytics and customer journeys to improve commercial performance.',
    points: [
      'Conversion-focused landing pages',
      'CTA and enquiry-flow optimization',
      'Analytics and measurement planning',
      'Continuous page improvement',
    ],
    image: '/expertise/conversion.webp',
  },
];

/** Shared by the homepage, Services, About and the Dubai landing page. */
export const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    body: 'We define your audience, services, positioning, competitors and the actions you want visitors to take.',
  },
  {
    number: '02',
    title: 'Structure & Design',
    body: 'We create the page hierarchy, content flow and visual direction before refining the responsive interface.',
  },
  {
    number: '03',
    title: 'Build & Optimize',
    body: 'We develop the experience, optimize performance and prepare the technical SEO foundations for launch.',
  },
  {
    number: '04',
    title: 'Launch & Improve',
    body: 'We publish, test the live experience and continue refining pages based on business priorities and real visitor behaviour.',
  },
];

/** The four pillars the studio is named after, as the site already describes them. */
export const pillars = [
  {
    title: 'Strategy',
    body: 'Who the site is for, what they need to see and the one action each page should lead to.',
  },
  {
    title: 'Design',
    body: 'A distinctive visual direction, carried consistently from the first screen to the last call to action.',
  },
  {
    title: 'Development',
    body: 'Clean, responsive front-end engineering that works on every screen and is ready to grow.',
  },
  {
    title: 'Performance',
    body: 'Fast pages, solid SEO foundations and conversion paths that turn visits into enquiries.',
  },
];

/** "Why Four Pillars" list, shared by About and the Dubai landing page. */
export const strengths = [
  'Responsive design for desktop, tablet and mobile',
  'SEO-friendly information architecture and metadata',
  'Clear enquiry and WhatsApp conversion paths',
  'Performance-conscious front-end implementation',
  'Design systems that stay consistent as the site grows',
  'Experience across luxury, services, healthcare, retail and e-commerce',
];

/** Concept builds on the Showcase page, also used for the homepage teaser. */
export const showcaseItems = [
  {
    id: 'skincare-example',
    title: 'Skincare brand',
    note: 'Layered product cut-outs that assemble as you scroll.',
    image: '/skincare/serum-bottle.webp',
    tint: 'from-[#5f6b4c]/50',
  },
  {
    id: 'fashion-example',
    title: 'Fashion brand',
    note: 'Looks step back in depth as the next one arrives.',
    image: '/fashion/model-blush.webp',
    tint: 'from-[#c9a3b0]/45',
  },
  {
    id: 'fresh-food-example',
    title: 'Fresh food brand',
    note: 'Bowls, citrus and leaves that roll into place.',
    image: '/freshfood/berry-bowl.webp',
    tint: 'from-[#f28c1b]/35',
  },
  {
    id: 'tech-example',
    title: 'Tech product',
    note: 'Colour, product and background change together.',
    image: '/tech/headphones-coral.webp',
    tint: 'from-[#e9825e]/45',
  },
  {
    id: 'iced-drinks-example',
    title: 'Iced drinks brand',
    note: 'A pinned hero where scrolling changes the drink.',
    image: '/coffee/latte.webp',
    tint: 'from-[#965c2c]/50',
  },
  {
    id: 'living-design',
    title: '3D betta fish',
    note: 'A real-time 3D fish swimming behind frosted glass.',
    image: null,
    tint: 'from-[#2d7dff]/35',
  },
];

/** Full-page homepage concepts shown near the top of the homepage. */
export const conceptDesigns = [
  {
    id: 'ember-oak',
    name: 'Ember & Oak',
    industry: 'Specialty coffee · Shop and cafés',
    domain: 'emberandoak.coffee',
    thumb: '/concepts/ember-oak-sm.webp',
    image: '/concepts/ember-oak.webp',
  },
  {
    id: 'aurelune-skin',
    name: 'Aurelune Skin',
    industry: 'Beauty · E-commerce storefront',
    domain: 'aureluneskin.com',
    thumb: '/concepts/aurelune-skin-sm.webp',
    image: '/concepts/aurelune-skin.webp',
  },
  {
    id: 'northvale-advisory',
    name: 'Northvale Advisory',
    industry: 'Consulting · Corporate website',
    domain: 'northvale.advisory',
    thumb: '/concepts/northvale-advisory-sm.webp',
    image: '/concepts/northvale-advisory.webp',
  },
  {
    id: 'neon-burrow',
    name: 'Neon Burrow',
    industry: 'Collectibles · Character brand',
    domain: 'neonburrow.shop',
    thumb: '/concepts/neon-burrow-sm.webp',
    image: '/concepts/neon-burrow.webp',
  },
];
