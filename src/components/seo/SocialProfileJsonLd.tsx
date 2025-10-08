import type { ComponentProps } from 'react';
import { SocialProfileJsonLd as NextSeoSocialProfileJsonLd } from 'next-seo';
import { siteName, siteUrl } from '@/config/metadata';
import { getSocialSameAs } from '@/config/social';

type NextSeoSocialProfileJsonLdProps = ComponentProps<typeof NextSeoSocialProfileJsonLd>;

type SocialProfileJsonLdProps = Omit<
  NextSeoSocialProfileJsonLdProps,
  'useAppDir' | 'type' | 'url' | 'sameAs' | 'name'
> & {
  name?: NextSeoSocialProfileJsonLdProps['name'];
  type?: NextSeoSocialProfileJsonLdProps['type'];
  url?: NextSeoSocialProfileJsonLdProps['url'];
  sameAs?: NextSeoSocialProfileJsonLdProps['sameAs'];
};

const SocialProfileJsonLd = ({
  name = siteName,
  type,
  url,
  sameAs,
  ...props
}: SocialProfileJsonLdProps) => {
  return (
    <NextSeoSocialProfileJsonLd
      {...props}
      name={name}
      type={type ?? 'Person'}
      url={url ?? siteUrl}
      sameAs={sameAs ?? getSocialSameAs()}
      useAppDir
    />
  );
};

export { SocialProfileJsonLd };
