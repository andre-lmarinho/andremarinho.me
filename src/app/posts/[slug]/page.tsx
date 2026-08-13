import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostViews from "@/components/content/PostViews";
import JsonLd from "@/components/JsonLd";
import MorphTitle from "@/components/transitions/MorphTitle";
import { formatDate } from "@/lib/content";
import { getPost, getPosts } from "@/lib/posts";
import { breadcrumbJsonLd, postJsonLd } from "@/lib/seo";

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
    alternates: { canonical: `/posts/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date || undefined,
      authors: ["André Marinho"],
      tags: post.tags,
      url: `/posts/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
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
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Posts", path: "/posts" },
          { name: post.title, path: `/posts/${slug}` },
        ])}
      />
      <article>
        <div className="mx-auto w-full max-w-3xl px-6 pt-36 max-md:pt-32 lg:px-8">
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
            <span className="text-border" aria-hidden="true">
              /
            </span>
            <span
              title="Post views counted by Abacus"
              className="text-faint tabular-nums"
            >
              <PostViews slug={slug} increment />
            </span>
          </div>

          {post.tags.length > 0 ? (
            <p className="mt-4 text-xs leading-relaxed text-faint">
              {post.tags.join(" · ")}
            </p>
          ) : null}

          <div aria-hidden="true" className="mt-8 h-px w-full bg-border" />
        </div>

        <section className="mx-auto flex w-full max-w-3xl flex-col gap-y-6 px-6 pt-10 pb-16 lg:px-8">
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
