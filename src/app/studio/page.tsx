import { PageSeo } from '@/components/seo/PageSeo';

import HomeProjects from '../home/components/Projects';
import Copy from './components/Copy';
import FinalCTA from './components/FinalCTA';
import Hero from './components/Hero';
import Pricing from './components/Pricing';

export default function Studio() {
  return (
    <>
      <PageSeo title="Duonorth Studio" path="/studio" />
      <Hero />
      <HomeProjects />
      <Copy />
      <Pricing />
      <FinalCTA />
    </>
  );
}
