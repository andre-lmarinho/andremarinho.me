declare module '*.webp';

declare module '@vercel/analytics/next' {
  import type { ComponentType } from 'react';

  export const Analytics: ComponentType;
}

declare module '@vercel/speed-insights/next' {
  import type { ComponentType } from 'react';

  export const SpeedInsights: ComponentType;
}
