import { getPost, getPosts } from "@/lib/posts";
import { siteName, siteUrl } from "@/lib/seo";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return new Response(null, { status: 404 });

  return new Response(
    `# ${post.title}\n\n> ${post.description}\n\nBy [${siteName}](${siteUrl}/about)\n\n${post.body.trim()}\n`,
    {
      headers: {
        "content-type": "text/markdown; charset=utf-8",
        Link: `<${siteUrl}/posts/${slug}>; rel="canonical", <${siteUrl}/llms.txt>; rel="describedby"`,
      },
    },
  );
}
