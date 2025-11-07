type Currency = 'USD' | 'BRL';
type AvailabilityURL =
  | 'https://schema.org/InStock'
  | 'https://schema.org/LimitedAvailability'
  | 'https://schema.org/PreOrder';

type StudioPricingPlan = {
  tier: string;
  slug: string;
  description: string;
  price: {
    display: string;
    value: string; // numeric string for schema
    currency: Currency;
    billingType: 'one-time';
  };
  features: string[];
  seo?: {
    serviceName?: string; // defaults to tier
    schemaDescription?: string; // defaults to description
    availability?: AvailabilityURL;
    url?: string; // e.g. '/studio#website'
    category?: string; // e.g. 'Website'
  };
};

const plans: StudioPricingPlan[] = [
  {
    tier: 'Website',
    slug: 'website',
    description: 'For companies that want a new approach on their website.',
    price: { display: '$1,000', value: '1000', currency: 'USD', billingType: 'one-time' },
    features: ['Landing page', 'UI/UX Design', 'Front-end development'],
    seo: {
      serviceName: 'Website design & build',
      schemaDescription: 'Design and implementation of a modern, performant marketing website.',
      availability: 'https://schema.org/InStock',
      url: '/studio#website',
      category: 'Website',
    },
  },
  {
    tier: 'Growth',
    slug: 'growth',
    description: 'For early-stage companies aiming to transform their idea into a product.',
    price: { display: '$3,000', value: '3000', currency: 'USD', billingType: 'one-time' },
    features: ['End-to-end MVP', 'Product design', 'Full-stack development'],
    seo: {
      serviceName: 'MVP design & development',
      schemaDescription: 'Discovery, UX/UI and engineering to launch a first version quickly.',
      availability: 'https://schema.org/InStock',
      url: '/studio#growth',
      category: 'MVP',
    },
  },
];

/** Single source of truth for the "Custom" block (UI + SEO) */
type CustomConfig = {
  name: string;
  titleForUI: string;
  description: string;
  currency: Currency;
  availability: AvailabilityURL;
  category: string;
  anchorId: string; // used to build /studio#custom
  url?: string; // optional override
  minPrice?: string; // optional range
  maxPrice?: string;
};

const customConfig: CustomConfig = {
  name: 'Custom engagement',
  titleForUI: 'Custom',
  description: 'Tailored scope based on your needs. Get in touch for a quote.',
  currency: 'USD',
  availability: 'https://schema.org/InStock',
  category: 'Custom',
  anchorId: 'custom',
  minPrice: '1500',
  // maxPrice: '10000',
};

const customHref = (basePath = '/studio') => `${basePath}#${customConfig.anchorId}`;

const absolutize = (base: string, path?: string) =>
  !path ? undefined : path.startsWith('http') ? path : new URL(path, base).toString();

const planToOffer = (plan: StudioPricingPlan, baseUrl: string) => {
  const serviceName = plan.seo?.serviceName ?? plan.tier;
  const schemaDescription = plan.seo?.schemaDescription ?? plan.description;

  if (!/^\d+(\.\d+)?$/.test(plan.price.value)) {
    throw new Error(`[offers] Plan "${plan.tier}" price.value must be a numeric string.`);
  }

  return {
    '@type': 'Offer',
    availability: plan.seo?.availability ?? 'https://schema.org/InStock',
    priceCurrency: plan.price.currency,
    price: plan.price.value,
    url: absolutize(baseUrl, plan.seo?.url) ?? absolutize(baseUrl, `/studio#${plan.slug}`),
    category: plan.seo?.category ?? plan.tier,
    itemOffered: {
      '@type': 'Service',
      name: serviceName,
      description: schemaDescription,
    },
  };
};

const customToOffer = (baseUrl: string) => {
  const url = customConfig.url ?? customHref('/studio');

  const offer: Record<string, unknown> = {
    '@type': 'Offer',
    availability: customConfig.availability,
    priceCurrency: customConfig.currency,
    url: absolutize(baseUrl, url),
    category: customConfig.category,
    itemOffered: {
      '@type': 'Service',
      name: customConfig.name,
      description: customConfig.description,
    },
  };

  if (customConfig.minPrice || customConfig.maxPrice) {
    const { minPrice, maxPrice } = customConfig;
    if (minPrice && !/^\d+(\.\d+)?$/.test(minPrice))
      throw new Error('[offers] custom.minPrice must be numeric.');
    if (maxPrice && !/^\d+(\.\d+)?$/.test(maxPrice))
      throw new Error('[offers] custom.maxPrice must be numeric.');

    offer.priceSpecification = {
      '@type': 'PriceSpecification',
      priceCurrency: customConfig.currency,
      ...(minPrice ? { minPrice } : {}),
      ...(maxPrice ? { maxPrice } : {}),
    };
  }

  return offer;
};

export const plansForUI = plans;

/** Centralized UI shape for the Custom block */
export const customForUI = {
  title: customConfig.titleForUI,
  description: customConfig.description,
  href: customHref('/studio'), // '/studio#custom'
  anchorId: customConfig.anchorId,
};

export const buildOffers = (baseUrl: string) => {
  if (!/^https?:\/\//.test(baseUrl)) throw new Error('[offers] baseUrl must be absolute.');
  return [...plans.map((p) => planToOffer(p, baseUrl)), customToOffer(baseUrl)];
};

export const buildProfessionalServiceJsonLd = (params: {
  baseUrl: string;
  name: string;
  description: string;
  path: string;
  imagePath?: string;
  areaServed?: string;
  serviceType?: string[];
  provider: { name: string; jobTitle: string; urlPath?: string; sameAs?: string[] };
}) => {
  const {
    baseUrl,
    name,
    description,
    path,
    imagePath = '/studio/opengraph-image',
    areaServed = 'Worldwide',
    serviceType = ['Product strategy', 'UX/UI design', 'Front-end development'],
    provider,
  } = params;

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name,
    description,
    url: absolutize(baseUrl, path),
    image: absolutize(baseUrl, imagePath),
    areaServed,
    serviceType,
    provider: {
      '@type': 'Person',
      name: provider.name,
      jobTitle: provider.jobTitle,
      url: absolutize(baseUrl, provider.urlPath ?? '/'),
      ...(provider.sameAs?.length ? { sameAs: provider.sameAs } : {}),
    },
    makesOffer: buildOffers(baseUrl),
  };
};
