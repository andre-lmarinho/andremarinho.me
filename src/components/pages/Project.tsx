import Markdown from "@/components/content/Markdown";
import PostList from "@/components/content/PostList";
import JsonLd from "@/components/JsonLd";
import Image from "@/components/ResponsiveImage";
import MorphTitle from "@/components/transitions/MorphTitle";
import { formatDate } from "@/lib/content";
import { getPosts } from "@/lib/posts";
import { getProject } from "@/lib/projects";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/seo";

export default function ProjectPage({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  const posts = getPosts().filter((post) => post.project === slug);

  return (
    <>
      <JsonLd data={projectJsonLd(project)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${slug}` },
        ])}
      />
      <article className="mx-auto w-full max-w-3xl px-6 py-16 lg:px-8">
        <section>
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
              {project.date ? `Published ${formatDate(project.date)}` : "Draft"}
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
                  View project →
                </a>
              </>
            ) : null}
          </div>

          {project.tags.length > 0 ? (
            <p className="mt-4 text-xs leading-relaxed text-faint">
              {project.tags.join(" · ")}
            </p>
          ) : null}

          <div aria-hidden="true" className="mt-8 h-px w-full bg-border" />
        </section>

        <section className="pt-10">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              width={1600}
              height={900}
              className="mb-12 aspect-video w-full rounded-lg border border-border object-cover"
              sizes="(min-width: 1024px) 704px, (min-width: 768px) 720px, calc(100vw - 48px)"
              style={{ viewTransitionName: `project-image-${slug}` }}
              loading="eager"
              fetchPriority="high"
            />
          ) : null}

          <Markdown>{project.body}</Markdown>
        </section>
        {posts.length > 0 ? (
          <aside
            aria-labelledby="related-notes"
            className="mt-12 border-t border-border pt-6"
          >
            <h2 id="related-notes" className="text-sm font-medium text-muted">
              Related notes
            </h2>
            <PostList posts={posts} />
          </aside>
        ) : null}
      </article>
    </>
  );
}
