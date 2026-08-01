import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import PostList from "@/components/PostList";
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
    <>
      <PageIntro
        title="Posts"
        description="Notes on what I build, how it breaks, and what I learn from it."
      />

      <section className="mx-auto flex w-full max-w-3xl flex-col gap-y-6 px-6 py-16 lg:px-8">
        <PostList posts={posts} />
      </section>
    </>
  );
}
