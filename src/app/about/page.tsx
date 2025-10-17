import type { Metadata } from 'next';
import { SocialProfileJsonLd } from '@/components/seo/SocialProfileJsonLd';

import { Intro } from './components/Intro';
import { Online } from './components/Online';
import { Work } from './components/Work';

export const metadata: Metadata = {
  title: 'About me',
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
      <SocialProfileJsonLd />
      <Intro />
      <Online />
      <Work />
    </>
  );
}
