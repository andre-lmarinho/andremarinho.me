'use client';

import { Seo } from '@/components/seo/Seo';
import { buildCanonical } from '@/config/seo';

import HomeProjects from '../home/components/Projects';
import Copy from './components/Copy';
import FinalCTA from './components/FinalCTA';
import Hero from './components/Hero';
import Pricing from './components/Pricing';

export default function Studio() {
  const title = 'Duonorth Studio';
  const canonicalUrl = buildCanonical('/studio');

  return (
    <>
      <Seo title={title} canonical={canonicalUrl} openGraph={{ url: canonicalUrl, title }} />
      <Hero />
      <HomeProjects />
      <Copy />
      <Pricing />
      <FinalCTA />
    </>
  );
}
