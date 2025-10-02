declare module 'next-seo' {
  import type { ComponentType } from 'react';

  export interface SocialProfileJsonLdProps {
    type: 'Person' | 'Organization';
    name: string;
    url: string;
    sameAs: string[];
    useAppDir?: boolean;
  }

  export const SocialProfileJsonLd: ComponentType<SocialProfileJsonLdProps>;
}
