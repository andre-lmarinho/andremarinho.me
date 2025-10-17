declare module '*.webp';

declare module '@vercel/analytics/next' {
  import type { ComponentType } from 'react';

  export const Analytics: ComponentType;
}

declare module '@vercel/speed-insights/next' {
  import type { ComponentType } from 'react';

  export const SpeedInsights: ComponentType;
}

declare module 'next-themes' {
  import type { ComponentType, ReactNode } from 'react';

  export type Theme = string;

  export interface ThemeProviderProps {
    attribute?: string;
    defaultTheme?: Theme;
    enableSystem?: boolean;
    storageKey?: string;
    themes?: Theme[];
    value?: Theme;
    forcedTheme?: Theme;
    enableColorScheme?: boolean;
    children?: ReactNode;
  }

  export interface UseThemeProps {
    themes: Theme[];
    resolvedTheme?: Theme;
    forcedTheme?: Theme;
    systemTheme?: Theme;
    setTheme(theme: Theme): void;
    setForcedTheme?(theme?: Theme): void;
  }

  export const ThemeProvider: ComponentType<ThemeProviderProps>;

  export function useTheme(): UseThemeProps;
}
