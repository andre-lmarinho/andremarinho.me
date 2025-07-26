import React from 'react';
import { projects } from '../../data/projects';

export default function ProjectCardList() {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.title} className="mb-12">
          <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-500/10 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg dark:lg:group-hover:bg-slate-800/50"></div>
            <div className="z-10 sm:order-2 sm:col-span-6">
              <h3 className="font-medium leading-snug">
                <a
                  className="group/link inline-flex items-baseline text-base font-medium leading-tight hover:text-[var(--color-accent-1)] focus-visible:text-[var(--color-accent-1)]"
                  href={project.siteLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${project.arialabel} (opens in a new tab)`}
                >
                  <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                  <span className="text-color-01 group-hover:text-[var(--color-accent-1)]">
                    {project.title}
                    <span className="inline-block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-color-01 ml-1 h-4 w-4 shrink-0 overflow-visible group-hover:text-[var(--color-accent-1)] group-focus-visible:text-[var(--color-accent-1)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        {/* Square (Fixed) */}
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />

                        {/* Arrows (Move Up and Right */}
                        <path
                          d="M15 3h6v6"
                          className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                        />
                        <path
                          d="M10 14L21 3"
                          className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                        />
                      </svg>
                    </span>
                  </span>
                </a>
              </h3>

              <p className="text-color-02 mt-2 text-sm leading-normal">{project.description}</p>

              <ul className="mt-2 flex flex-wrap" aria-label="Technologies used:">
                {project.stacks.map((tech) => (
                  <li key={tech} className="mr-1.5 mt-2">
                    <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-[var(--color-accent-1)]">
                      {tech}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <img
              alt={project.title}
              loading="lazy"
              width="200"
              height="48"
              decoding="async"
              data-nimg="1"
              className="aspect-video rounded border-2 border-slate-200/10 object-cover transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
              src={project.img}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
