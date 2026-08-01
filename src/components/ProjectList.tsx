import Image from "next/image";
import MorphTitle from "@/components/transitions/MorphTitle";
import TransitionLink from "@/components/transitions/TransitionLink";
import type { Project } from "@/lib/projects";

export default function ProjectList({
  projects,
  classifier = "year",
}: {
  projects: Project[];
  classifier?: "kind" | "year";
}) {
  return (
    <ol className="content-list flex flex-col mt-6">
      {projects.map((project) => (
        <li key={project.slug} className="content-reveal">
          <TransitionLink
            href={`/projects/${project.slug}`}
            className="content-row group relative block rounded-md py-5"
          >
            <div className="grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-[7rem_minmax(0,1fr)]">
              <p className="text-xs leading-6 text-muted sm:text-right">
                {classifier === "kind"
                  ? project.kind || "project"
                  : project.date
                    ? project.date.slice(0, 4)
                    : "draft"}
              </p>

              <div>
                <MorphTitle
                  as="h3"
                  title={project.title}
                  id={`project-${project.slug}`}
                  className="content-title text-base leading-6 font-medium transition-colors group-hover:text-accent"
                />
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                {project.tags.length > 0 ? (
                  <p className="mt-2.5 text-xs text-faint">
                    {project.tags.slice(0, 6).join("  ·  ")}
                  </p>
                ) : null}
              </div>
            </div>

            {project.image ? (
              <span
                aria-hidden="true"
                className="project-peek pointer-events-none absolute top-1/2 left-full ml-8 hidden w-54 xl:block"
              >
                <Image
                  src={project.image}
                  alt=""
                  width={432}
                  height={243}
                  sizes="216px"
                  style={{
                    viewTransitionName: `project-image-${project.slug}`,
                  }}
                  className="w-full rounded-lg border border-border shadow-[4px_6px_25px_rgba(0,0,0,0.56)]"
                />
              </span>
            ) : null}
          </TransitionLink>
        </li>
      ))}
    </ol>
  );
}
