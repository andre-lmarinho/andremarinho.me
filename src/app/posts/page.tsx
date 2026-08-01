import type { Metadata } from "next";
import PostList from "@/components/content/PostList";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Posts — André Marinho",
  description:
    "Notes on what I build, how it breaks, and what I would do differently.",
  alternates: { canonical: "/posts" },
};

export default function PostsPage() {
  const posts = getPosts();

  return (
    <section className="mx-auto w-full max-w-3xl px-6 pt-36 pb-16 max-md:pt-32 lg:px-8">
      <h1 className="text-4xl leading-[1.05] font-semibold tracking-[-0.02em] sm:text-5xl">
        Posts
      </h1>
      <PostList posts={posts} />
    </section>
  );
}
