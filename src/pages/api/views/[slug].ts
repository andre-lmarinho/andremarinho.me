import type { APIRoute } from "astro";
import { getPost } from "@/lib/posts";
import { siteUrl } from "@/lib/site";
import { getPostViews, incrementPostViews } from "@/lib/views.server";

export const prerender = false;

export const POST: APIRoute = async ({ params, request, url }) => {
  const headers = { "Cache-Control": "no-store" };
  const slug = params.slug;
  try {
    if (!slug || !(await getPost(slug)))
      return new Response(null, { status: 404, headers });
    if (process.env.VERCEL_ENV !== "production" || url.origin !== siteUrl) {
      const views = await getPostViews();
      return Response.json(
        { views: { [slug]: views[slug] ?? 0 } },
        { headers },
      );
    }
    const origin = request.headers.get("Origin");
    if (origin && origin !== siteUrl)
      return new Response(null, { status: 403, headers });
    const count = await incrementPostViews(slug);
    return Response.json({ views: { [slug]: count } }, { headers });
  } catch {
    console.error("Failed to load post views");
    return Response.json(
      { error: "Views unavailable" },
      { status: 503, headers },
    );
  }
};
