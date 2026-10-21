import { Redis } from "@upstash/redis";

const redis = (readOnly = false) => {
  const url = process.env.KV_REST_API_URL ?? import.meta.env.KV_REST_API_URL;
  const token = readOnly
    ? (process.env.KV_REST_API_READ_ONLY_TOKEN ??
      import.meta.env.KV_REST_API_READ_ONLY_TOKEN)
    : (process.env.KV_REST_API_TOKEN ?? import.meta.env.KV_REST_API_TOKEN);
  if (!url || !token) throw new Error("Missing Redis configuration");
  return new Redis({
    url,
    token,
    retry: false,
  });
};

export const getPostViews = async () =>
  (await redis(true).hgetall<Record<string, number>>("views")) ?? {};

export const incrementPostViews = (slug: string) =>
  redis().hincrby("views", slug, 1);
