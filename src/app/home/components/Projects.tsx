import { fetchRepositories } from "@/utils/api/github";
import type { Repository } from "@/utils/api/github/mutators";

import { cn } from "@/utils/cn";

type ProjectProps = {
  project: Repository;
};

const Project = ({ project }: ProjectProps) => {
  return (
    <li className="h-full">
      <a
        className="flex h-full flex-col gap-2.5 overflow-hidden rounded-xl border border-zinc-200 px-4 py-3 transition-colors outline-none hover:bg-zinc-100 focus-visible:border-zinc-300 focus-visible:bg-zinc-100 active:bg-zinc-100 lg:group-hover/list:opacity-50 lg:hover:opacity-100 dark:border-zinc-800 dark:hover:bg-zinc-900 dark:focus-visible:border-zinc-700 dark:focus-visible:bg-zinc-900 dark:active:bg-zinc-900"
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.name} (opens in a new tab)`}>
        <h3 className="font-semibold">{project.name}</h3>
        <p className="text-sm opacity-70">{project.description}</p>

        <div className="flex items-center gap-2.5 text-sm font-mono">
          {project.language && (
            <div className="flex items-center gap-1.5">
              <div
                className={cn(
                  "h-2 w-2 rounded-full",
                  `language-project-${project.language.toLowerCase()}`
                )}></div>
              <span className="opacity-70">{project.language}</span>
            </div>
          )}
          {project.stars.value > 0 && (
            <div className="flex items-center gap-1.5">
              <svg
                className="p-[1.5px] opacity-70"
                viewBox="0 0 16 16"
                width="16"
                height="16"
                fill="currentColor"
                aria-hidden="true">
                <title>Stars</title>
                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
              </svg>
              <span className="opacity-70">{project.stars.format}</span>
            </div>
          )}
        </div>
      </a>
    </li>
  );
};

export const Projects = async () => {
  const projects = (await fetchRepositories()).sort((a, b) => b.stars.value - a.stars.value).slice(0, 6);

  return (
    <section id="projects" aria-label="Projects">
      <a
        className="group my-6 flex cursor-pointer items-center justify-between gap-3 rounded-xs"
        href="https://github.com/andre-lmarinho"
        target="_blank"
        rel="noopener noreferrer">
        <h2 className="m-0 underline-offset-4 group-hover:underline">Projects</h2>
        <span className="small-button">View all →</span>
      </a>
      <ul className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project) => (
          <Project key={project.name} project={project} />
        ))}
      </ul>
    </section>
  );
};
