import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import MorphTitle from "@/components/transitions/MorphTitle";
import { formatDate } from "@/lib/content";
import { getPost, getPosts } from "@/lib/posts";
import { postJsonLd } from "@/lib/seo";

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
    <>
      <JsonLd data={postJsonLd(post)} />
      <article>
        <div className="mx-auto w-full max-w-3xl px-6 pt-36 pb-16 max-md:pt-32 lg:px-8">
          <MorphTitle
            as="h1"
            title={post.title}
            id={`post-${slug}`}
            className="text-balance text-4xl leading-[1.05] font-semibold tracking-[-0.02em] sm:text-5xl"
          />
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {post.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
            <time dateTime={post.date || undefined} className="text-muted">
              {post.date ? formatDate(post.date) : "Draft"}
            </time>
            <span className="text-border" aria-hidden="true">
              /
            </span>
            <span className="text-faint tabular-nums">
              {post.minutes} min read
            </span>
          </div>

          {post.tags.length > 0 ? (
            <p className="mt-4 text-xs leading-relaxed text-faint">
              {post.tags.join(" · ")}
            </p>
          ) : null}
        </div>

        <section className="mx-auto flex w-full max-w-3xl flex-col gap-y-6 px-6 py-16 lg:px-8">
          <div
            className="prose"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: markdown authored in-repo, no user input.
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </section>
      </article>
    </>
  );
}
