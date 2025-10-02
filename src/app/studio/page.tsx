import { buildPageMetadata } from '@/config/metadata';
import HomeProjects from '../home/components/Projects';
import Copy from './components/Copy';
import FinalCTA from './components/FinalCTA';
import Hero from './components/Hero';
import Pricing from './components/Pricing';

export const metadata = buildPageMetadata({
  title: 'Duonorth Studio',
  path: '/studio',
});

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
