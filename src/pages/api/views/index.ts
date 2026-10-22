import type { APIRoute } from "astro";
import { getPostViews } from "@/lib/views.server";

export const prerender = false;

export const GET: APIRoute = async () => {
  const headers = { "Cache-Control": "no-store" };
  try {
    return Response.json({ views: await getPostViews() }, { headers });
  } catch {
    console.error("Failed to read post views");
    return Response.json(
      { error: "Views unavailable" },
      { status: 503, headers },
    );
  }
};
