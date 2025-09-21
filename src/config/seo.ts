import type { DefaultSeoProps } from 'next-seo';

export const siteUrl = 'https://andremarinho.me';

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

export const defaultSeoConfig: DefaultSeoProps = {
  defaultTitle: 'Andre Marinho - Front-End Developer',
  titleTemplate: 'Andre Marinho - %s',
  description:
    'I am a Front-End Developer based in Salvador. I create digital experiences that connect design, strategy and business growth.',
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
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Andre Marinho',
    images: [
      {
        url: `${siteUrl}/images/Me.webp`,
        alt: 'Andre Marinho',
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
};
