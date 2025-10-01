import { SocialProfileJsonLd } from 'next-seo';
import { PageSeo } from '@/components/seo/PageSeo';
import { getSocialSameAs } from '@/config/social';
import { siteUrl } from '@/config/seo';
import Home from './home';

export default function Index() {
  return (
    <>
      <PageSeo />
      <SocialProfileJsonLd
        type="Person"
        name="Andre Marinho"
        url={siteUrl}
        sameAs={getSocialSameAs()}
      />
      <Home />
    </>
  );
}
