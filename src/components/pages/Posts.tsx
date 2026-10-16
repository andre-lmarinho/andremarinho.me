import PostList from "@/components/content/PostList";
import PageTitle from "@/components/PageTitle";
import { getPosts } from "@/lib/posts";

export default function PostsPage() {
  const posts = getPosts();

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 lg:px-8">
      <PageTitle>Posts</PageTitle>
      <PostList posts={posts} titleAs="h2" />
    </section>
  );
}
