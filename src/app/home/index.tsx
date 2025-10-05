import React from 'react';

import { SocialProfileJsonLd } from '@/components/seo/SocialProfileJsonLd';

import Hero from './components/Hero';
import Work from '../about/components/Work';
import Projects from './components/Projects';

const Home = () => {
  return (
    <>
      <SocialProfileJsonLd />
      <Hero />
      <Projects />
      <Work />
    </>
  );
};

export default Home;
