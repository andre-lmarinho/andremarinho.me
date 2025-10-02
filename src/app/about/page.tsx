import type { Metadata } from 'next';
import { SocialProfileJsonLd } from 'next-seo';
import { getSocialSameAs } from '@/config/social';
import {
  buildCanonical,
  defaultDescription,
  defaultOpenGraph,
  defaultTwitter,
  siteUrl,
} from '@/config/metadata';

import Intro from './components/Intro';
import Online from './components/Online';
import Work from './components/Work';

const aboutTitle = 'About me';
const canonicalUrl = buildCanonical('/about');

export const metadata: Metadata = {
  title: aboutTitle,
  description: defaultDescription,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: aboutTitle,
    description: defaultDescription,
    url: canonicalUrl,
  },
  twitter: {
    ...defaultTwitter,
    title: aboutTitle,
    description: defaultDescription,
  },
};

export default function About() {
  return (
    <>
      <SocialProfileJsonLd
        type="Person"
        name="Andre Marinho"
        url={siteUrl}
        sameAs={getSocialSameAs()}
        useAppDir={true}
      />
      <Intro />
      <Online />
      <Work />
    </>
  );
}
