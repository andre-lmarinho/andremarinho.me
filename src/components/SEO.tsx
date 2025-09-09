// src/components/SEO.tsx

import React from 'react';
import { Helmet } from 'react-helmet-async';

type SEOTypes = 'website' | 'article' | 'profile';

interface SEOProps {
  title: string;
  description: string;
  url?: string; // Canonical URL
  image?: string; // Absolute or path relative to url
  type?: SEOTypes;
  siteName?: string;
  locale?: string; // e.g., en_US
  twitterCard?: 'summary' | 'summary_large_image';
  twitterSite?: string; // e.g., @site
  twitterCreator?: string; // e.g., @creator
  noindex?: boolean;
  publishedTime?: string; // ISO date for article
  modifiedTime?: string; // ISO date for article
  schema?: Record<string, unknown> | Record<string, unknown>[]; // Additional JSON-LD
}

export default function SEO({
  title,
  description,
  url = 'https://andremarinho.vercel.app/',
  image,
  type = 'website',
  siteName = 'André Marinho',
  locale = 'en_US',
  twitterCard = 'summary_large_image',
  twitterSite,
  twitterCreator,
  noindex = false,
  publishedTime,
  modifiedTime,
  schema,
}: SEOProps) {
  const imageAbs = image
    ? image.startsWith('http')
      ? image
      : new URL(image, url).toString()
    : undefined;

  const robots = noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    name: siteName,
    description,
  };

  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'André Marinho',
    url,
    jobTitle: 'Front-End Developer',
    sameAs: ['https://github.com/andre-marinho', 'https://linkedin.com/in/andre-marinho-3318ab1aa'],
  };

  const articleLd =
    type === 'article' && (publishedTime || modifiedTime)
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: title,
          description,
          url,
          datePublished: publishedTime,
          dateModified: modifiedTime || publishedTime,
          author: {
            '@type': 'Person',
            name: 'André Marinho',
            url,
          },
        }
      : undefined;

  const jsonLd = Array.isArray(schema)
    ? [websiteLd, personLd, ...(articleLd ? [articleLd] : []), ...schema]
    : [websiteLd, personLd, ...(articleLd ? [articleLd] : []), ...(schema ? [schema] : [])];

  return (
    <Helmet>
      {/* Title and basic */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      {imageAbs && <meta property="og:image" content={imageAbs} />}
      {imageAbs && <meta property="og:image:alt" content={`${title} — ${siteName}`} />}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {twitterSite && <meta name="twitter:site" content={twitterSite} />}
      {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
      {imageAbs && <meta name="twitter:image" content={imageAbs} />}

      {/* App & theme colors */}
      <meta name="application-name" content={siteName} />
      <meta name="apple-mobile-web-app-title" content={siteName} />

      {/* Structured data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
