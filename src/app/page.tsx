import { SocialProfileJsonLd } from 'next-seo';
import { getSocialSameAs } from '@/config/social';
import { buildPageMetadata, siteUrl } from '@/config/metadata';
import Home from './home';

export const metadata = buildPageMetadata();

export default function Index() {
  return (
    <>
      <SocialProfileJsonLd
        type="Person"
        name="Andre Marinho"
        url={siteUrl}
        sameAs={getSocialSameAs()}
        useAppDir={true}
      />
      <Home />
    </>
  );
}
