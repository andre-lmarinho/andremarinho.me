import { SocialProfileJsonLd } from 'next-seo';
import { getSocialSameAs } from '@/config/social';
import { buildPageMetadata, siteUrl } from '@/config/metadata';

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
      <SocialProfileJsonLd
        type="Person"
        name="Andre Marinho"
        url={siteUrl}
        sameAs={getSocialSameAs()}
        useAppDir={true}
      />
      <Intro />
      <Online />
      <Work />
    </>
  );
}
