import type { Metadata } from 'next';

import { Hero } from './components/Hero';
import { Projects } from '../home/components/Projects';
import { Copy } from './components/Copy';
import { Pricing } from './components/Pricing';
import { FinalCTA } from './components/FinalCTA';

import { buildProfessionalServiceJsonLd } from './offers';

const BASE_URL = 'https://andremarinho.me';

const title = 'Duonorth Studio';
const description =
  'Product strategy, design and engineering support to launch, scale and iterate outstanding digital experiences.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Duonorth Studio',
    'product strategy',
    'product design',
    'front-end development',
    'design systems',
    'product partner',
  ],
  alternates: {
    canonical: '/studio',
  },
  openGraph: {
    title: `${title} | Product Design & Engineering Partner`,
    description,
    url: '/studio',
    type: 'website',
    images: [
      {
        url: '/studio/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Duonorth Studio – Product design and engineering services',
      },
    ],
  },
  twitter: {
    title: `${title} | Product Design & Engineering Partner`,
    description,
    images: ['/studio/opengraph-image'],
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  category: 'technology',
};

const structuredData = buildProfessionalServiceJsonLd({
  baseUrl: BASE_URL,
  name: 'Duonorth Studio',
  description:
    'Product strategy, design and engineering support to launch, scale and iterate outstanding digital experiences.',
  path: '/studio',
  imagePath: '/studio/opengraph-image',
  provider: {
    name: 'André Marinho',
    jobTitle: 'Front-End Developer',
    sameAs: [
      'https://github.com/andre-lmarinho',
      'https://www.linkedin.com/in/andre-marinho-3318ab1aa',
    ],
  },
});

export default function Studio() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <Projects />
      <Copy />
      <Pricing />
      <FinalCTA />
    </>
  );
}
