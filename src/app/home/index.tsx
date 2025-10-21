import React from 'react';

import { Hero } from './components/Hero';
import { Work } from '../about/components/Work';
import { Projects } from './components/Projects';

export const Home = () => {
  return (
    <>
      <Hero />
      <Projects />
      <Work />
    </>
  );
};
