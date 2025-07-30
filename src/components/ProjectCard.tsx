// src/components/ui/ProjectCard.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { projects, techs } from '@/data';
import { useMotion } from '@/context';
import { animations } from '@/utils';

export default function ProjectCard() {
  const { shouldReduceMotion } = useMotion();
  return (
    <motion.ul
      className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2"
      {...animations.ProjectList(shouldReduceMotion)}
    >
      {projects.map((project) => (
        <motion.li
          key={project.title}
          className="border-neutral-150 outline-hidden grid gap-2.5 overflow-hidden rounded-xl border px-5 py-4 transition-all focus-within:bg-neutral-100 hover:bg-neutral-100 focus:border-neutral-300 dark:border-neutral-800 dark:focus-within:bg-neutral-900 dark:hover:bg-neutral-900 dark:focus:border-neutral-700"
          {...animations.ProjectCard(shouldReduceMotion)}
        >
          <div className="group relative grid h-full gap-4 pb-1 transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-100/10 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg dark:lg:group-hover:bg-slate-800/50"></div>
            <div className="z-10 sm:order-2 sm:col-span-6">
              <h3 className="font-medium leading-snug">
                <a
                  className="group/link inline-flex items-baseline font-medium leading-tight hover:text-[var(--color-accent)] focus-visible:text-[var(--color-accent)]"
                  href={project.siteLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${project.arialabel} (opens in a new tab)`}
                >
                  <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                  <span className="text-[var(--text-primary)] group-hover:text-[var(--color-accent)]">
                    {project.title}
                    <span className="inline-block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-color-01 ml-1 h-4 w-4 shrink-0 overflow-visible group-hover:text-[var(--color-accent)] group-focus-visible:text-[var(--color-accent)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
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
              <p className="mt-2 text-sm leading-normal text-[var(--text-muted)]">
                {project.description}
              </p>
              <motion.ul
                className="mt-2 flex flex-wrap"
                aria-label="Technologies used:"
                {...animations.ProjectTechList(shouldReduceMotion)}
              >
                {project.stacks.map((stack) => {
                  const tech = techs.find((t) => t.name === stack);
                  return (
                    <motion.li key={stack} {...animations.ProjectTechItem(shouldReduceMotion)}>
                      <div className="flex items-center py-1 pr-3 text-sm leading-5 text-[var(--text-muted)]">
                        {tech && (
                          <img
                            src={`https://cdn.simpleicons.org/${tech.icon}/${tech.color}`}
                            alt={`${tech.name} logo`}
                            className="mr-1 inline-block h-3 w-3"
                          />
                        )}
                        <span>{stack}</span>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}
