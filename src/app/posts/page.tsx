import type { Metadata } from "next";
import PostList from "@/components/content/PostList";
import PageTitle from "@/components/PageTitle";
import { getPosts } from "@/lib/posts";

export const description =
  "Notes on building software with intention: the decisions behind it, what breaks, what I learn, and what I would do differently.";

export const metadata: Metadata = {
  title: "Posts — André Marinho",
  description,
  alternates: { canonical: "/posts" },
  openGraph: {
    title: "Posts — André Marinho",
    description,
    type: "website",
    url: "/posts",
  },
};

export default function PostsPage() {
  const posts = getPosts();

  return (
    <section className="mx-auto w-full max-w-3xl px-6 pt-36 pb-16 max-md:pt-32 lg:px-8">
      <PageTitle>Posts</PageTitle>
      <PostList posts={posts} titleAs="h2" />
    </section>
  );
}
