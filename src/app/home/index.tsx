import { Hero } from './sections/Hero';
import { Work } from '../about/components/Work';
import { Projects } from './sections/Projects';

export const Home = () => {
  return (
    <>
      <Hero />
      <Projects />
      <Work />
    </>
  );
};
