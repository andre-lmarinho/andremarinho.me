import { SocialProfileJsonLd } from 'next-seo';
import { PageSeo } from '@/components/seo/PageSeo';
import { getSocialSameAs } from '@/config/social';
import { siteUrl } from '@/config/seo';

import Intro from './components/Intro';
import Online from './components/Online';
import Work from './components/Work';

export default function About() {
  return (
    <>
      <PageSeo title="About me" path="/about" />
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
