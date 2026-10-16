import { getPosts } from "@/lib/posts";
import { getProjects } from "@/lib/projects";
import { siteUrl } from "@/lib/seo";

export function GET() {
  const paths = [
    "",
    "/about",
    "/posts",
    "/projects",
    ...getPosts().map(({ slug }) => `/posts/${slug}`),
    ...getProjects().map(({ slug }) => `/projects/${slug}`),
  ];
  const escapeXml = (value: string) =>
    value.replace(/[<>&"']/g, (char) => `&#${char.charCodeAt(0)};`);
  const urls = paths
    .map((path) => `<url><loc>${escapeXml(`${siteUrl}${path}`)}</loc></url>`)
    .join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    {
      headers: { "content-type": "application/xml; charset=utf-8" },
    },
  );
}
