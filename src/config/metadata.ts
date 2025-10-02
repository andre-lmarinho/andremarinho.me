import type { Metadata } from 'next';

import siteConfig from '../../site.config.json';

const { siteUrl } = siteConfig;
const siteName = 'Andre Marinho';
const defaultTitle = 'Andre Marinho - Front-End Developer';
const titleTemplate = 'Andre Marinho - %s';
const defaultDescription =
  'I am a Front-End Developer based in Salvador. I create digital experiences that connect design, strategy and business growth.';

type OpenGraph = NonNullable<Metadata['openGraph']>;
type OpenGraphImage = NonNullable<OpenGraph['images']> extends (infer Item)[]
  ? Item
  : NonNullable<OpenGraph['images']>;

const openGraphImage: OpenGraphImage = {
  url: `${siteUrl}/opengraph-image`,
  alt: 'Andre Marinho',
  type: 'image/png',
};

const defaultOpenGraph: OpenGraph = {
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
