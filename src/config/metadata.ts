import type { Metadata } from 'next';

const siteUrl = 'https://andremarinho.me';
const siteName = 'Andre Marinho';
const defaultTitle = 'Andre Marinho - Front-End Developer';
const titleTemplate = 'Andre Marinho - %s';
const defaultDescription =
  'I am a Front-End Developer based in Salvador. I create digital experiences that connect design, strategy and business growth.';

const openGraphImage: NonNullable<NonNullable<Metadata['openGraph']>['images']>[number] = {
  url: `${siteUrl}/images/Me.webp`,
  alt: 'Andre Marinho',
};

const defaultOpenGraph: NonNullable<Metadata['openGraph']> = {
  type: 'website',
  siteName,
  images: [openGraphImage],
};

const defaultTwitter: NonNullable<Metadata['twitter']> = {
  card: 'summary_large_image',
};

const buildCanonical = (path = ''): string => {
  if (!path) {
    return siteUrl;
  }

  if (path.startsWith('http')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${siteUrl}${normalizedPath}`;
};
export {
  buildCanonical,
  defaultDescription,
  defaultOpenGraph,
  defaultTitle,
  defaultTwitter,
  openGraphImage,
  siteName,
  siteUrl,
  titleTemplate,
};
