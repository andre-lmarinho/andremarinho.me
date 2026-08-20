import Link from "next/link";
import PostViews from "@/components/content/PostViews";
import MorphTitle from "@/components/transitions/MorphTitle";
import { formatShortDate } from "@/lib/content";
import type { Post } from "@/lib/posts";

// h3 under the home page's section heading, h2 when the index page's title is
// all that sits above it.
export default function PostList({
  posts,
  titleAs = "h3",
}: {
  posts: Post[];
  titleAs?: "h2" | "h3";
}) {
  return (
    <ol className="content-list flex flex-col mt-6">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/posts/${post.slug}`}
            className="content-row group -mx-3 block rounded-md px-3 py-5"
          >
            <div className="grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-[7rem_minmax(0,1fr)]">
              <time
                dateTime={post.date || undefined}
                className="text-xs leading-6 text-muted sm:text-right"
              >
                {post.date ? formatShortDate(post.date) : "Draft"}
              </time>

              <div>
                <div className="flex items-baseline justify-between gap-x-4">
                  <MorphTitle
                    as={titleAs}
                    title={post.title}
                    id={`post-${post.slug}`}
                    className="content-title text-base leading-6 font-medium transition-colors group-hover:text-accent"
                  />
                  <span
                    title="Post views counted by Abacus"
                    className="shrink-0 text-xs text-faint tabular-nums"
                  >
                    <PostViews slug={post.slug} />
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {post.description}
                </p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}
