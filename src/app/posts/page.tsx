import type { Metadata } from "next";
import Link from "next/link";
import { formatDate } from "@/lib/content";
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
    <div className="mx-auto w-full max-w-3xl px-6 pt-32 pb-20">
      <h1 className="mb-12 font-heading text-4xl font-bold tracking-tight">
        Posts
      </h1>

      {posts.length === 0 ? (
        <p className="text-muted">No posts yet.</p>
      ) : (
        <ul className="space-y-10 -mx-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/posts/${post.slug}`}
                className="group block hover:bg-surface rounded-lg p-2"
              >
                <h2 className="font-heading text-2xl font-semibold transition-colors group-hover:text-accent">
                  {post.title}
                </h2>
                <p className="mt-1 font-mono text-xs text-muted">
                  {post.date ? formatDate(post.date) : "Draft"}
                </p>
                <p className="mt-3 text-muted">{post.description}</p>
                {post.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-surface-2 px-2 py-1 font-mono text-xs text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
