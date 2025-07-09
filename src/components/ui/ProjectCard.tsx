import React from 'react';
import { projects } from '../../data/projects';
import { ExternalLinkIcon } from '@/components/icons';

export default function ProjectCardList() {
  return (
    <ul>
      {projects.map((project) => (
        <li key={project.title} className="mb-12">
          <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
            <div
              className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block 
            lg:group-hover:bg-slate-500/10 dark:lg:group-hover:bg-slate-800/50 
            lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"
            ></div>

            <div className="z-10 sm:order-2 sm:col-span-6">
              <h3 className="font-medium leading-snug">
                <a
                  className="inline-flex items-baseline font-medium leading-tight hover:text-[var(--color-accent-1)] focus-visible:text-[var(--color-accent-1)]  group/link text-base"
                  href={project.siteLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${project.arialabel} (opens in a new tab)`}
                >
                  <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                  <span className="text-color-01 group-hover:text-[var(--color-accent-1)]">
                    {project.title}
                    <span className="inline-block">
                      <ExternalLinkIcon />
                    </span>
                  </span>
                </a>
              </h3>

              <p className="mt-2 text-sm text-color-02 leading-normal">{project.description}</p>

              <ul className="mt-2 flex flex-wrap" aria-label="Technologies used:">
                {project.stacks.map((tech) => (
                  <li key={tech} className="mr-1.5 mt-2">
                    <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-[var(--color-accent-1)] ">
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
              className="aspect-video object-cover rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
              src={project.img}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
