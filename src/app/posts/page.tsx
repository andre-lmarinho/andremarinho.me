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
    <div className="overflow-x-clip">
      <PageIntro
        title="Posts"
        description="Notes on what I build, how it breaks, and what I learn from it."
      />

      <section>
        <div className="mx-auto w-full max-w-3xl px-6 py-20 max-md:py-16 lg:px-8">
          {posts.length > 0 ? (
            <PostList posts={posts} headingLevel="h3" />
          ) : (
            <p className="text-muted">No posts yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
