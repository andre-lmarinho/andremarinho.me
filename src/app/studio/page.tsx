import { type Metadata } from 'next';

import HomeProjects from '../home/components/Projects';
import Copy from './components/Copy';
import FinalCTA from './components/FinalCTA';
import Hero from './components/Hero';
import Pricing from './components/Pricing';

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
      <Hero />
      <HomeProjects />
      <Copy />
      <Pricing />
      <FinalCTA />
    </>
  );
}
