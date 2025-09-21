import { buildPageMetadata } from '@/config/seo';

import Intro from './components/Intro';
import Online from './components/Online';
import Work from './components/Work';

export const metadata = buildPageMetadata({
  title: 'About me',
  path: '/about',
});

export default function About() {
  return (
    <>
      <Intro />
      <Online />
      <Work />
    </>
  );
}
