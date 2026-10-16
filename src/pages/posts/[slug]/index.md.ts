import { getPost, getPosts } from "@/lib/posts";
import { siteName, siteUrl } from "@/lib/seo";

export function getStaticPaths() {
  return getPosts().map(({ slug }) => ({ params: { slug } }));
}

export function GET({ params }: { params: { slug?: string } }) {
  const { slug } = params;
  if (!slug) return new Response(null, { status: 404 });
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
