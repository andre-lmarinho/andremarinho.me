import type { Metadata } from 'next';
import { buildCanonical, defaultDescription, defaultOpenGraph, defaultTwitter } from '@/config/metadata';
import HomeProjects from '../home/components/Projects';
import Copy from './components/Copy';
import FinalCTA from './components/FinalCTA';
import Hero from './components/Hero';
import Pricing from './components/Pricing';

const studioTitle = 'Duonorth Studio';
const canonicalUrl = buildCanonical('/studio');

export const metadata: Metadata = {
  title: studioTitle,
  description: defaultDescription,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    ...defaultOpenGraph,
    title: studioTitle,
    description: defaultDescription,
    url: canonicalUrl,
  },
  twitter: {
    ...defaultTwitter,
    title: studioTitle,
    description: defaultDescription,
  },
};

export default function Studio() {
  return (
    <>
      <Hero />
      <HomeProjects />
      <Copy />
      <Pricing />
      <FinalCTA />
    </>
  );
}
