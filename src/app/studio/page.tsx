import type { Metadata } from 'next';
import { ProductJsonLd } from '@/components/seo/ProductJsonLd';

import Hero from './components/Hero';
import HomeProjects from '../home/components/Projects';
import Copy from './components/Copy';
import Pricing from './components/Pricing';
import FinalCTA from './components/FinalCTA';

export const metadata: Metadata = {
  title: 'Duonorth Studio',
  alternates: {
    canonical: '/studio',
  },
  openGraph: {
    url: '/studio',
  },
};

export default function Studio() {
  return (
    <>
      <ProductJsonLd />
      <Hero />
      <HomeProjects />
      <Copy />
      <Pricing />
      <FinalCTA />
    </>
  );
}
