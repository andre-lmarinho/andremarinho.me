'use client';

import { Seo } from '@/components/seo/Seo';
import { buildCanonical } from '@/config/seo';

import Intro from './components/Intro';
import Online from './components/Online';
import Work from './components/Work';

export default function About() {
  const title = 'About me';
  const canonicalUrl = buildCanonical('/about');

  return (
    <>
      <Seo title={title} canonical={canonicalUrl} openGraph={{ url: canonicalUrl, title }} />
      <Intro />
      <Online />
      <Work />
    </>
  );
}
