import type { Metadata } from 'next';

import { Home } from './home';

export const metadata: Metadata = {
  alternates: { canonical: 'https://andremarinho.me' },
};

export default function Index() {
  const SocialProfileJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: 'André Marinho',
      url: 'https://andremarinho.me/',
      image: 'https://andremarinho.me/images/Me.jpeg',
      sameAs: [
        'https://github.com/andre-lmarinho',
        'https://www.linkedin.com/in/andre-marinho-3318ab1aa',
      ],
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
