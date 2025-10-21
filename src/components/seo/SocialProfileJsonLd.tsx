import type { ProfilePageJsonLdProps } from 'next-seo';
import { ProfilePageJsonLd as NextSeoProfilePageJsonLd } from 'next-seo';

import { getSocialSameAs } from '@/config/social';

type PersonMainEntity = Extract<ProfilePageJsonLdProps['mainEntity'], { '@type': 'Person' }>;

type SocialProfileJsonLdProps = Omit<ProfilePageJsonLdProps, 'mainEntity'> & {
  sameAs?: PersonMainEntity['sameAs'];
};

export const SocialProfileJsonLd = ({ sameAs, ...props }: SocialProfileJsonLdProps) => {
  const mainEntity: PersonMainEntity = {
    '@type': 'Person',
    name: 'André Marinho',
    url: 'https://andremarinho.me',
    sameAs: sameAs ?? getSocialSameAs(),
  };

  return <NextSeoProfilePageJsonLd {...props} mainEntity={mainEntity} />;
};
