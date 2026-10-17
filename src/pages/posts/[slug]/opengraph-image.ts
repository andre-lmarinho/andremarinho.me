import { createOpenGraphImage } from "@/lib/opengraph";
import { getPost, getPosts } from "@/lib/posts";

export async function getStaticPaths() {
  return (await getPosts()).map(({ slug }) => ({ params: { slug } }));
}

export async function GET({ params }: { params: { slug?: string } }) {
  const post = params.slug ? await getPost(params.slug) : null;
  if (!post) return new Response(null, { status: 404 });
  return createOpenGraphImage({
    title: post.title,
    description: post.description,
    path: `/posts/${post.slug}`,
  });
}
