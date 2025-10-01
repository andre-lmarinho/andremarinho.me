declare module 'next-seo' {
  import type { ComponentType } from 'react';

  export interface NextSeoProps {
    title?: string;
    description?: string;
    canonical?: string;
    noindex?: boolean;
    nofollow?: boolean;
    openGraph?: Record<string, unknown>;
    twitter?: Record<string, unknown>;
    additionalMetaTags?: Array<Record<string, unknown>>;
    additionalLinkTags?: Array<Record<string, unknown>>;
  }

  export interface DefaultSeoProps extends NextSeoProps {
    defaultTitle?: string;
    titleTemplate?: string;
  }

  export interface SocialProfileJsonLdProps {
    type: 'Person' | 'Organization';
    name: string;
    url: string;
    sameAs: string[];
  }

  export const DefaultSeo: ComponentType<DefaultSeoProps>;
  export const NextSeo: ComponentType<NextSeoProps>;
  export const SocialProfileJsonLd: ComponentType<SocialProfileJsonLdProps>;
}
