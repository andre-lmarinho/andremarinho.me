import { createOpenGraphImage } from "@/lib/opengraph";
import { getPost, getPosts } from "@/lib/posts";

export function getStaticPaths() {
  return getPosts().map(({ slug }) => ({ params: { slug } }));
}

export function GET({ params }: { params: { slug?: string } }) {
  const post = params.slug ? getPost(params.slug) : null;
  if (!post) return new Response(null, { status: 404 });
  return createOpenGraphImage({
    title: post.title,
    description: post.description,
    path: `/posts/${post.slug}`,
  });
}
