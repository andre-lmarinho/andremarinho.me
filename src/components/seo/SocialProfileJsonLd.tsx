import type { ComponentProps } from 'react';
import { SocialProfileJsonLd as NextSeoSocialProfileJsonLd } from 'next-seo';
import { getSocialSameAs } from '@/config/social';

type NextSeoSocialProfileJsonLdProps = ComponentProps<typeof NextSeoSocialProfileJsonLd>;

type SocialProfileJsonLdProps = Omit<
  NextSeoSocialProfileJsonLdProps,
  'useAppDir' | 'type' | 'url' | 'sameAs' | 'name'
> & {
  sameAs?: NextSeoSocialProfileJsonLdProps['sameAs'];
};

export const SocialProfileJsonLd = ({ sameAs, ...props }: SocialProfileJsonLdProps) => {
  return (
    <NextSeoSocialProfileJsonLd
      {...props}
      name={'André Marinho'}
      type={'Person'}
      url={'https://andremarinho.me'}
      sameAs={sameAs ?? getSocialSameAs()}
      useAppDir
    />
  );
};
