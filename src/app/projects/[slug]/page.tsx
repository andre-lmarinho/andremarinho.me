import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import MorphTitle from "@/components/animations/MorphTitle";
import JsonLd from "@/components/JsonLd";
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
    <>
      <JsonLd data={projectJsonLd(project)} />
      <article>
        <div className="mx-auto w-full max-w-3xl px-6 pt-36 pb-16 max-md:pt-32 lg:px-8">
          <MorphTitle
            as="h1"
            title={project.title}
            id={`project-${slug}`}
            className="text-balance text-4xl leading-[1.05] font-semibold tracking-[-0.02em] sm:text-5xl"
          />
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
            <time dateTime={project.date || undefined} className="text-muted">
              {project.date ? formatDate(project.date) : "Draft"}
            </time>
            {project.link ? (
              <>
                <span className="text-border" aria-hidden="true">
                  /
                </span>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  Live site →
                </a>
              </>
            ) : null}
          </div>

          {project.tags.length > 0 ? (
            <p className="mt-4 text-xs leading-relaxed text-faint">
              {project.tags.join(" · ")}
            </p>
          ) : null}
        </div>

        <section className="mx-auto flex w-full max-w-3xl flex-col gap-y-6 px-6 py-16 lg:px-8">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              width={1600}
              height={900}
              className="aspect-video w-full rounded-lg border border-border object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              style={{ viewTransitionName: `project-image-${slug}` }}
              priority
            />
          ) : null}

          <div
            className={`prose ${project.image ? "mt-12" : ""}`}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: markdown authored in-repo, no user input.
            dangerouslySetInnerHTML={{ __html: project.html }}
          />
        </section>
      </article>
    </>
  );
}
