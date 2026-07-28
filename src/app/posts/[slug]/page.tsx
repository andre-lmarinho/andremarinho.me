import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MorphTitle from "@/components/ui/MorphTitle";
import { formatDate } from "@/lib/content";
import { getPost, getPosts } from "@/lib/posts";
import { postJsonLd } from "@/lib/seo";

// Only slugs returned by generateStaticParams are served; anything else 404s,
// which keeps unknown slugs from reaching the filesystem read.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} — André Marinho`,
    description: post.description,
    authors: [{ name: "André Marinho", url: "https://andremarinho.me" }],
    keywords: post.tags,
    alternates: { canonical: `/posts/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date || undefined,
      url: `/posts/${slug}`,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-6 pt-32 pb-20">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD built from in-repo markdown.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd(post)) }}
      />
      <MorphTitle
        as="h1"
        title={post.title}
        id={`post-${slug}`}
        className="text-4xl font-bold tracking-tight"
      />
      <p className="mt-3 text-xs text-muted">
        {post.date ? formatDate(post.date) : "Draft"}
      </p>
      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-surface-2 px-2 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div
        className="prose mt-10"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: markdown authored in-repo, no user input.
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
