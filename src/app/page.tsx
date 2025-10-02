import type { Metadata } from 'next';
import { SocialProfileJsonLd } from 'next-seo';
import { getSocialSameAs } from '@/config/social';
import {
  buildCanonical,
  defaultDescription,
  defaultOpenGraph,
  defaultTitle,
  defaultTwitter,
  siteUrl,
} from '@/config/metadata';
import Home from './home';

const canonicalUrl = buildCanonical();

export const metadata: Metadata = {
  alternates: { canonical: canonicalUrl },
  openGraph: {
    ...defaultOpenGraph,
    title: defaultTitle,
    description: defaultDescription,
    url: canonicalUrl,
  },
  twitter: {
    ...defaultTwitter,
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function Index() {
  return (
    <>
      <SocialProfileJsonLd
        type="Person"
        name="Andre Marinho"
        url={siteUrl}
        sameAs={getSocialSameAs()}
        useAppDir={true}
      />
      <Home />
    </>
  );
}
