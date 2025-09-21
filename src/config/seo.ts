import type { Metadata } from 'next';
import type { DefaultSeoProps } from 'next-seo';

export const siteUrl = 'https://andremarinho.me';

const defaultTitle = 'Andre Marinho - Front-End Developer';
const titleTemplate = 'Andre Marinho - %s';
const defaultDescription =
  'I am a Front-End Developer based in Salvador. I create digital experiences that connect design, strategy and business growth.';

export const buildCanonical = (path = ''): string => {
  if (!path) {
    return siteUrl;
  }

  if (path.startsWith('http')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${siteUrl}${normalizedPath}`;
};

const defaultOpenGraph = {
  type: 'website',
  url: siteUrl,
  siteName: 'Andre Marinho',
  images: [
    {
      url: `${siteUrl}/images/Me.webp`,
      alt: 'Andre Marinho',
    },
  ],
};

const defaultTwitter = {
  card: 'summary_large_image' as const,
};

export const defaultSeoConfig: DefaultSeoProps = {
  defaultTitle,
  titleTemplate,
  description: defaultDescription,
  canonical: siteUrl,
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon/favicon.ico',
    },
    {
      rel: 'shortcut icon',
      href: '/favicon/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/favicon/apple-icon.png',
    },
    {
      rel: 'icon',
      href: '/favicon/icon.png',
      type: 'image/png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
  openGraph: defaultOpenGraph,
  twitter: {
    cardType: defaultTwitter.card,
  },
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: titleTemplate,
  },
  description: defaultDescription,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    ...defaultTwitter,
    title: defaultTitle,
    description: defaultDescription,
  },
  icons: {
    icon: [{ url: '/favicon/favicon.ico' }, { url: '/favicon/icon.png', type: 'image/png' }],
    shortcut: ['/favicon/favicon.ico'],
    apple: ['/favicon/apple-icon.png'],
  },
  manifest: '/site.webmanifest',
};

type PageMetadataOverrides = {
  title?: string;
  description?: string;
  path?: string;
  canonical?: string | null;
  openGraph?: Metadata['openGraph'];
  twitter?: Metadata['twitter'];
  noindex?: boolean;
};

const resolveCanonical = (path?: string, canonical?: string | null): string | undefined => {
  if (canonical === null) {
    return undefined;
  }

  if (canonical) {
    return buildCanonical(canonical);
  }

  if (typeof path === 'string' && path.length > 0) {
    return buildCanonical(path);
  }

  return buildCanonical();
};

export const buildPageMetadata = ({
  title,
  description,
  path,
  canonical,
  openGraph,
  twitter,
  noindex,
}: PageMetadataOverrides = {}): Metadata => {
  const resolvedTitle = title ?? defaultTitle;
  const resolvedDescription = description ?? defaultDescription;
  const resolvedCanonical = resolveCanonical(path, canonical);

  const pageMetadata: Metadata = {
    title: resolvedTitle,
    description: resolvedDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      ...openGraph,
      url: resolvedCanonical ?? defaultOpenGraph.url,
      title: openGraph?.title ?? resolvedTitle,
      description: openGraph?.description ?? resolvedDescription,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...twitter,
      title: twitter?.title ?? resolvedTitle,
      description: twitter?.description ?? resolvedDescription,
    },
  };

  if (resolvedCanonical) {
    pageMetadata.alternates = {
      canonical: resolvedCanonical,
    };
  }

  if (noindex) {
    pageMetadata.robots = {
      index: false,
      follow: false,
    };
  }

  return pageMetadata;
};
