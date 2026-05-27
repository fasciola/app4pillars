export type BackgroundMode = 'solid' | 'silk' | 'moonlit' | 'rain';

export interface SiteConfig {
  title: string
  description: string
  language: string
}

export interface HeaderConfig {
  brandMark: string
  navServices: string
  navPortfolio: string
  navContact: string
  loginLabel: string
  logoutLabel: string
}

export interface BackgroundOption {
  id: BackgroundMode
  label: string
}

export interface SolidColorOption {
  color: string
  label: string
}

export interface BackgroundConfig {
  defaultMode: BackgroundMode
  defaultSolidColor: string
  options: BackgroundOption[]
  solidColors: SolidColorOption[]
}

export interface HeroConfig {
  headline: string
  subheadline: string
  ctaPrimary: string
  ctaSecondary: string
}

export interface ServicesConfig {
  title: string
  subtitle: string
  items: {
    title: string
    description: string
    icon: string
    image: string
  }[]
}

export interface PortfolioConfig {
  title: string
  subtitle: string
}

export interface ContactConfig {
  title: string
  subtitle: string
  email: string
  phone: string
  cta: string
}

export interface FooterConfig {
  copyright: string
  tagline: string
}

export const siteConfig: SiteConfig = {
  title: "Four Pillars Web Design",
  description: "Luxury web design studio crafting cinematic digital experiences. We build high-performance, conversion-optimized websites for premium brands.",
  language: "en",
}

export const headerConfig: HeaderConfig = {
  brandMark: "FOUR PILLARS",
  navServices: "Services",
  navPortfolio: "Portfolio",
  navContact: "Contact",
  loginLabel: "Login",
  logoutLabel: "Logout",
}

export const backgroundConfig: BackgroundConfig = {
  defaultMode: 'rain',
  defaultSolidColor: '#000000',
  options: [
    { id: 'moonlit', label: "Moonlit" },
    { id: 'silk', label: "Silk" },
    { id: 'rain', label: "Rain" },
    { id: 'solid', label: "Solid" },
  ],
  solidColors: [
    { color: '#000000', label: "Obsidian" },
    { color: '#1a1a2e', label: "Midnight" },
    { color: '#1a1308', label: "Amber" },
    { color: '#0d1f0d', label: "Forest" },
  ],
}

export const heroConfig: HeroConfig = {
  headline: "We Craft Digital\nMasterpieces",
  subheadline: "Luxury web design studio building cinematic, high-performance experiences for discerning brands. Where artistry meets engineering.",
  ctaPrimary: "Explore Our Work",
  ctaSecondary: "Our Services",
}

export const servicesConfig: ServicesConfig = {
  title: "Expertise",
  subtitle: "Six disciplines. One unified vision. Every project is crafted across our four pillars: Design, Strategy, Performance, and Growth.",
  items: [
    {
      title: "Cinematic Web Design",
      description: "Immersive, visually stunning websites that tell your brand story through motion, typography, and spatial design. Every pixel is intentional.",
      icon: "Palette",
      image: "./service-cinematic.jpg",
    },
    {
      title: "Experience Strategy",
      description: "User-centered design thinking that maps customer journeys, identifies touchpoints, and creates seamless interactions that delight and convert.",
      icon: "Compass",
      image: "./service-strategy.jpg",
    },
    {
      title: "Next-Gen Performance",
      description: "Sub-second load times, perfect Lighthouse scores, and fluid 60fps animations. Technical excellence as a foundation, not an afterthought.",
      icon: "Zap",
      image: "./service-performance.jpg",
    },
    {
      title: "Brand Guardianship",
      description: "We protect and elevate your brand identity across every digital touchpoint. Consistent, premium, and unmistakably yours.",
      icon: "Shield",
      image: "./service-brand.jpg",
    },
    {
      title: "E-Commerce Luxury",
      description: "High-conversion shopping experiences for premium brands. From product presentation to checkout flow, every step feels effortless and elegant.",
      icon: "ShoppingBag",
      image: "./service-ecommerce.jpg",
    },
    {
      title: "Conversion Optimization",
      description: "Data-driven refinement of user flows, CTAs, and landing pages. We turn visitors into customers through psychology and precision.",
      icon: "TrendingUp",
      image: "./service-conversion.jpg",
    },
  ],
}

export const portfolioConfig: PortfolioConfig = {
  title: "Selected Works",
  subtitle: "Seven projects that define our craft. Each one a collaboration with visionary brands pushing the boundaries of their industries.",
}

export const contactConfig: ContactConfig = {
  title: "Start a Project",
  subtitle: "Ready to elevate your digital presence? Let's discuss how Four Pillars can transform your brand's online experience.",
  email: "faisal.alamir@4pillarsweb.online",
  phone: "+971567074922",
  cta: "Get in Touch",
}

export const footerConfig: FooterConfig = {
  copyright: "© 2025 Four Pillars Web Design. All rights reserved.",
  tagline: "Crafted with precision. Built to perform.",
}

// Portfolio projects data
export const projects = [
  {
    title: "LUMIÈRE NOIRE",
    category: "Retail / Lifestyle",
    tagline: "Scented Rituals & Elegance",
    url: "https://boisterous-sable-18bb0c.netlify.app/",
    image: "./project-olivara.jpg"
  },
  {
    title: "NOIR ATLAS",
    category: "Brand Concept",
    tagline: "Cinematic Digital Depth",
    url: "https://moonlit-maamoul-cfcdd5.netlify.app/",
    image: "./project-noir-atlas.jpg"
  },
  {
    title: "AURUM AUTOMOTIVE",
    category: "Automotive",
    tagline: "Premier Showroom Experience",
    url: "https://car-care-hub.netlify.app/",
    image: "./project-carcare.jpg"
  },
  {
    title: "ELITE ESTATES",
    category: "Real Estate",
    tagline: "High-End Dubai Penthouses",
    url: "https://deft-sundae-510258.netlify.app/",
    image: "./project-elite-estates.jpg"
  },
  {
    title: "AURUM GEMS",
    category: "Retail / Luxury",
    tagline: "Timeless Fine Jewelry",
    url: "https://papaya-vacherin-fee6b2.netlify.app/",
    image: "./project-eclat.jpg"
  },
  {
    title: "ASIM VISION",
    category: "Healthcare / Technology",
    tagline: "Advanced Vision Care Solutions",
    url: "https://asemvision.com/",
    image: "./project-asim-vision.jpg"
  },
  {
    title: "ROYAL DAN PERFUMES",
    category: "Luxury Retail / Fragrance",
    tagline: "Premium Arabian Fragrances",
    url: "https://royaldanperfumes.com/",
    image: "./project-royal-dan.jpg"
  }
];
