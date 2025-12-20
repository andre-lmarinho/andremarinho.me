declare module '*.webp';

declare module '@vercel/analytics/next' {
  import type { ComponentType } from 'react';

  export const Analytics: ComponentType;
}

declare module '@vercel/speed-insights/next' {
  import type { ComponentType } from 'react';

  export const SpeedInsights: ComponentType;
}

declare module '@vercel/edge-config' {
  export type EdgeConfigValue = unknown;

  export function get<T = EdgeConfigValue>(key: string): Promise<T | null>;
}

declare module '*.mdx' {
  import type { ComponentType, PropsWithChildren } from 'react';

  const MDXComponent: ComponentType<PropsWithChildren<Record<string, unknown>>>;

  export type StoryHeader = {
    title: string;
    description: string;
    role: string;
    time: string;
    date: string;
    image: string;
  };

  export const header: StoryHeader;
  export const metadata: import('@/app/work/shared/types').WorkStoryMetadata;

  export default MDXComponent;
}
