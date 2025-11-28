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
