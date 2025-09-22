declare module 'next-seo' {
  import type { ComponentType } from 'react';

  export interface DefaultSeoProps {
    defaultTitle?: string;
    titleTemplate?: string;
    title?: string;
    description?: string;
    canonical?: string;
    openGraph?: Record<string, unknown>;
    twitter?: Record<string, unknown>;
    additionalMetaTags?: Array<Record<string, unknown>>;
    additionalLinkTags?: Array<Record<string, unknown>>;
  }

  export const DefaultSeo: ComponentType<DefaultSeoProps>;
  export const NextSeo: ComponentType<DefaultSeoProps>;
}
