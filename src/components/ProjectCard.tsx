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
        <motion.li key={project.title} {...animations.ProjectCard(shouldReduceMotion)}>
          <a
            className="border-neutral-150 outline-hidden grid gap-2.5 overflow-hidden rounded-xl border px-5 py-4 focus-within:bg-neutral-100 hover:bg-neutral-100 focus:border-neutral-300 dark:border-neutral-800 dark:focus-within:bg-neutral-900 dark:hover:bg-neutral-900 dark:focus:border-neutral-700"
            href={project.siteLink}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${project.arialabel} (opens in a new tab)`}
          >
            <div className="group relative grid h-full gap-4 pb-1 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
              <div className="sm:order-2 sm:col-span-6">
                <h3 className="font-medium leading-snug">{project.title}</h3>

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
                        <div className="flex items-center py-1 pr-3 text-sm leading-5">
                          {tech && (
                            <img
                              src={`https://cdn.simpleicons.org/${tech.icon}/${tech.color}`}
                              alt={`${tech.name} logo`}
                              className="mr-1 inline-block h-3 w-3"
                            />
                          )}
                          <span className="text-[var(--text-muted)]">{stack}</span>
                        </div>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </div>
            </div>
          </a>
        </motion.li>
      ))}
    </motion.ul>
  );
}
