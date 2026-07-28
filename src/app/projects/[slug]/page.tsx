import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import MorphTitle from "@/components/ui/MorphTitle";
import { formatDate } from "@/lib/content";
import { getProject, getProjects } from "@/lib/projects";
import { projectJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} — André Marinho`,
    description: project.description,
    keywords: project.tags,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
      url: `/projects/${slug}`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-6 pt-32 pb-20">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD built from in-repo markdown.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectJsonLd(project)),
        }}
      />
      {project.image && (
        <div className="mb-8 overflow-hidden rounded-lg">
          <Image
            src={project.image}
            alt={project.title}
            width={1600}
            height={900}
            className="aspect-video w-full object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            style={{ viewTransitionName: `project-image-${slug}` }}
            // Lazy would still be undecoded when the view transition snapshots
            // this page, so the card would morph into an empty box.
            priority
          />
        </div>
      )}

      <MorphTitle
        as="h1"
        title={project.title}
        id={`project-${slug}`}
        className="text-4xl font-bold tracking-tight"
      />

      <div className="mt-3 flex items-center gap-4">
        <p className="text-xs text-muted">
          {project.date ? formatDate(project.date) : "Draft"}
        </p>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent underline-offset-4 hover:underline"
          >
            Live Site →
          </a>
        )}
      </div>

      {project.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
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
        dangerouslySetInnerHTML={{ __html: project.html }}
      />
    </article>
  );
}
