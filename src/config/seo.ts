import type { DefaultSeoProps, NextSeoProps } from 'next-seo';

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
    cardType: 'summary_large_image',
  },
};

type PageSeoOverrides = {
  title?: string;
  description?: string;
  path?: string;
  canonical?: string | null;
  openGraph?: NextSeoProps['openGraph'];
  twitter?: NextSeoProps['twitter'];
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

export type { PageSeoOverrides };

export const buildPageSeo = ({
  title,
  description,
  path,
  canonical,
  openGraph,
  twitter,
  noindex,
}: PageSeoOverrides = {}): NextSeoProps => {
  const resolvedTitle = title ?? defaultTitle;
  const resolvedDescription = description ?? defaultDescription;
  const resolvedCanonical = resolveCanonical(path, canonical);

  const seoConfig: NextSeoProps = {
    title: resolvedTitle,
    description: resolvedDescription,
    canonical: resolvedCanonical,
    openGraph: {
      ...defaultSeoConfig.openGraph,
      ...openGraph,
      url: resolvedCanonical ?? defaultOpenGraph.url,
      title: openGraph?.title ?? resolvedTitle,
      description: openGraph?.description ?? resolvedDescription,
    },
    twitter: {
      ...defaultSeoConfig.twitter,
      ...twitter,
    },
  };

  if (noindex) {
    seoConfig.noindex = true;
    seoConfig.nofollow = true;
  }

  return seoConfig;
};
