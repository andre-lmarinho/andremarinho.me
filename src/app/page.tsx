import type { Metadata } from 'next';

import { Home } from './home';
import { socialLinkUrls } from '@/configs/social-links';
import { SITE_NAME, SITE_URL } from '@/configs/site';

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

export default function Index() {
  const SocialProfileJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/images/Me.jpeg`,
      sameAs: socialLinkUrls,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SocialProfileJsonLd) }}
      />
      <Home />
    </>
  );
}
