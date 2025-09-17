// src/components/ui/ProjectCard.tsx

import React from 'react';
import { projects, techMap, getTechIconUrl } from '@/data';

export default function ProjectCard() {
  return (
    <ul className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2">
      {projects.map((project) => {
        const isExternal = project.siteLink.startsWith('http');
        return (
          <li key={project.title} className="h-full">
            <a
              className="flex h-full flex-col gap-2.5 overflow-hidden rounded-xl border border-zinc-200 px-5 py-4 outline-none transition-colors focus:border-zinc-300 focus-within:bg-zinc-100 hover:bg-zinc-100 dark:border-zinc-800 dark:focus:border-zinc-700 dark:focus-within:bg-zinc-900 dark:hover:bg-zinc-900"
              href={project.siteLink}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noreferrer noopener' : undefined}
              aria-label={
                isExternal ? `${project.ariaLabel} (opens in a new tab)` : project.ariaLabel
              }
            >
              <div className="group relative flex h-full flex-col gap-4 pb-1 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="sm:order-2 sm:col-span-6">
                  <h3 className="font-medium leading-snug">
                    {project.title}
                    {project.tag && (
                      <span className="mb-2 ml-5 inline-block rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200">
                        {project.tag}
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 text-sm leading-normal text-zinc-600 dark:text-zinc-400">
                    {project.description}
                  </p>
                  <ul className="mt-2 flex flex-wrap" aria-label="Technologies used:">
                    {project.stacks.map((stack) => {
                      const tech = techMap[stack];
                      return (
                        <li key={stack}>
                          <div className="flex items-center py-1 pr-3 text-sm leading-5">
                            {tech && (
                              <img
                                src={getTechIconUrl(tech)}
                                alt={`${tech.name} logo`}
                                className="mr-1 inline-block h-3 w-3"
                              />
                            )}
                            <span className="text-zinc-600 dark:text-zinc-400">{stack}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
