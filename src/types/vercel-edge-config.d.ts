declare module '@vercel/edge-config' {
  export type EdgeConfigValue = unknown;

  export function get<T = EdgeConfigValue>(key: string): Promise<T | null>;
}
