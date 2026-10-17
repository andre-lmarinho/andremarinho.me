import { getPost, getPosts } from "@/lib/posts";
import { siteName, siteUrl } from "@/lib/site";

export async function getStaticPaths() {
  return (await getPosts()).map(({ slug }) => ({ params: { slug } }));
}

export async function GET({ params }: { params: { slug?: string } }) {
  const { slug } = params;
  if (!slug) return new Response(null, { status: 404 });
  const post = await getPost(slug);
  if (!post) return new Response(null, { status: 404 });

  return new Response(
    `# ${post.title}\n\n> ${post.description}\n\nBy [${siteName}](${siteUrl}/about)\n\n${post.date ? `Published: ${post.date}\n\n` : ""}${post.body.trim()}\n`,
    {
      headers: {
        "content-type": "text/markdown; charset=utf-8",
        Link: `<${siteUrl}/posts/${slug}>; rel="canonical", <${siteUrl}/llms.txt>; rel="describedby"`,
      },
    },
  );
}
