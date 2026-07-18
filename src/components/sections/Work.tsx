"use client";

import Image from "next/image";
import type { Content } from "@/lib/content";

type Project = Content["work"]["projects"][number];

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card group block h-full overflow-hidden rounded-xl border border-border bg-surface shadow-lg transition-all duration-300 hover:border-accent hover:shadow-xl focus:outline-none focus-visible:border-accent"
    >
      <div className="overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={1600}
          height={900}
          className="aspect-video h-auto w-full transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="space-y-3 p-5">
        <h3 className="font-heading text-xl font-semibold text-foreground transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted">{project.body}</p>

        <div className="flex items-center gap-x-2 pt-1 text-xs">
          <div className="flex max-h-8 flex-wrap gap-2 overflow-hidden pt-2 text-xs">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              <path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3" />
            </svg>
            {project.chips.map((chip) => (
              <span
                key={chip}
                className="rounded bg-surface-2 px-2 py-1 font-semibold text-muted"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

export default function Work({ content }: { content: Content["work"] }) {
  return (
    <section id="work" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h2 className="flex items-center gap-3 font-heading text-2xl font-semibold md:text-3xl">
            {content.title}
          </h2>
        </div>

        <div className="project-grid grid grid-cols-1 gap-6 md:grid-cols-2">
          {content.projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
