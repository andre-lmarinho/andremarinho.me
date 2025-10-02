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

type BuildPageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  canonical?: string | null;
  noindex?: boolean;
};

const buildPageMetadata = ({
  title,
  description,
  path,
  canonical,
  noindex,
}: BuildPageMetadataOptions = {}): Metadata => {
  const resolvedTitle = title ?? defaultTitle;
  const resolvedDescription = description ?? defaultDescription;

  const resolvedCanonical =
    canonical === null
      ? undefined
      : canonical
        ? buildCanonical(canonical)
        : typeof path === 'string'
          ? buildCanonical(path)
          : buildCanonical();

  const metadata: Metadata = {
    title: resolvedTitle,
    description: resolvedDescription,
    openGraph: {
      ...defaultOpenGraph,
      title: resolvedTitle,
      description: resolvedDescription,
      url: resolvedCanonical ?? buildCanonical(path),
    },
    twitter: {
      ...defaultTwitter,
      title: resolvedTitle,
      description: resolvedDescription,
    },
  };

  if (resolvedCanonical) {
    metadata.alternates = { canonical: resolvedCanonical };
  }

  if (noindex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return metadata;
};

export type { BuildPageMetadataOptions };
export {
  buildCanonical,
  buildPageMetadata,
  defaultDescription,
  defaultOpenGraph,
  defaultTitle,
  defaultTwitter,
  openGraphImage,
  siteName,
  siteUrl,
  titleTemplate,
};
