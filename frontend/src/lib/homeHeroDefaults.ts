/** Current live homepage hero defaults — seed/CMS baseline matches this. */
export type HomeHeroSlide = {
  id: number | string;
  order: number;
  isActive: boolean;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  image?: string;
  video?: string;
};

export type HomeHeroContent = {
  backgroundVideo: string;
  posterImage: string;
  intervalMs: number;
  slides: HomeHeroSlide[];
};

export const DEFAULT_HOME_HERO: HomeHeroContent = {
  backgroundVideo: '/sajan_hero.mp4',
  posterImage: '/EVENT.png',
  intervalMs: 6000,
  slides: [
    {
      id: 1,
      order: 1,
      isActive: true,
      headline: "India’s Biggest Memory & Family Transformation Experience",
      subheadline:
        'One stage. Thousands of lives. A system designed to transform how families think, learn, and grow together.',
      ctaText: 'Join Now',
      ctaLink: 'https://sol.sajanshah.com',
      image: '/EVENT.png',
    },
    {
      id: 2,
      order: 2,
      isActive: true,
      headline: 'Transform From Home. No Travel Required.',
      subheadline:
        'Join India’s most powerful student-parent webinar and experience real breakthroughs in focus, confidence, and results.',
      ctaText: 'Reserve Your Seat',
      ctaLink: 'https://webinar.sajanshah.com',
      image: '/webinar.png',
    },
    {
      id: 3,
      order: 3,
      isActive: true,
      headline: 'Upgrade Your Life With Proven Systems',
      subheadline:
        'Access powerful programs designed to improve thinking, performance, and personal growth - step by step.',
      ctaText: 'Explore Programs',
      ctaLink: '/products',
      image: '/You vs You.png',
    },
    {
      id: 4,
      order: 4,
      isActive: true,
      headline: 'Live to Inspire. Lead to Serve.',
      subheadline:
        'Be part of a movement focused on creating real impact through education, awareness, and human transformation.',
      ctaText: 'Join the Initiative',
      ctaLink: 'https://unitedfirst.in',
      image: '/united first.png',
    },
  ],
};

export function normalizeHomeHeroContent(raw?: Partial<HomeHeroContent> | null): HomeHeroContent {
  const slidesIn = Array.isArray(raw?.slides) ? raw!.slides! : [];
  const slides =
    slidesIn.length > 0
      ? slidesIn.map((s, i) => ({
          id: s.id ?? i + 1,
          order: typeof s.order === 'number' ? s.order : i + 1,
          isActive: s.isActive !== false,
          headline: s.headline || '',
          subheadline: s.subheadline || '',
          ctaText: s.ctaText || '',
          ctaLink: s.ctaLink || '',
          image: s.image || '',
          video: s.video || '',
        }))
      : DEFAULT_HOME_HERO.slides.map((s) => ({ ...s }));

  return {
    backgroundVideo: raw?.backgroundVideo || DEFAULT_HOME_HERO.backgroundVideo,
    posterImage: raw?.posterImage || DEFAULT_HOME_HERO.posterImage,
    intervalMs:
      typeof raw?.intervalMs === 'number' && raw.intervalMs > 0
        ? raw.intervalMs
        : DEFAULT_HOME_HERO.intervalMs,
    slides,
  };
}

export function getActiveHomeHeroSlides(content?: Partial<HomeHeroContent> | null): HomeHeroSlide[] {
  const normalized = normalizeHomeHeroContent(content);
  const active = normalized.slides
    .filter((s) => s.isActive !== false)
    .sort((a, b) => a.order - b.order);
  return active.length > 0 ? active : DEFAULT_HOME_HERO.slides;
}
