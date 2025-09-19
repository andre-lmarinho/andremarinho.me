import React from 'react';

import Work from '../about/components/Work';
import Hero from './components/Hero';
import Projects from './components/Projects';

const Home = () => {
  return (
    <>
      <Hero />
      <Projects />
      <Work />
    </>
  );
};

export default Home;
