declare module '@vercel/edge-config' {
  export type EdgeConfigValue = unknown;
  export const get: <T = EdgeConfigValue>(key: string) => Promise<T | null>;
}
