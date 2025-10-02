import type { Metadata } from 'next';
import { SocialProfileJsonLd } from 'next-seo';
import { getSocialSameAs } from '@/config/social';
import { siteUrl } from '@/config/metadata';

import Intro from './components/Intro';
import Online from './components/Online';
import Work from './components/Work';

const aboutTitle = 'About me';
export const metadata: Metadata = {
  title: aboutTitle,
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    url: '/about',
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
