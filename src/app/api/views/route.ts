import { Redis } from "@upstash/redis";

const url = process.env.KV_REST_API_URL;
const token = process.env.KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

export async function POST() {
  const by = process.env.NODE_ENV === "development" ? 0 : 1;
  const views = await redis?.hincrby("views", "site", by);

  return Response.json(views ?? null, {
    headers: { "cache-control": "no-store" },
  });
}
