import Image from 'next/image';
import React from 'react';

import cn from '@/utils/cn';

type TechMeta = {
  name: string;
  icon: string;
  color: string;
};

type ProjectMeta = {
  title: string;
  ariaLabel: string;
  description: string;
  siteLink: string;
  tag?: string;
  stacks: string[];
};

const techs: TechMeta[] = [
  { name: 'React', icon: 'react', color: '61DAFB' },
  { name: 'Next.js', icon: 'next.js', color: '000000' },
  { name: 'TypeScript', icon: 'typescript', color: '3178C6' },
  { name: 'JavaScript', icon: 'javascript', color: 'F7DF1E' },
  { name: 'WordPress', icon: 'wordpress', color: '21759B' },
];

const techMap: Record<string, TechMeta> = techs.reduce(
  (map, tech) => {
    map[tech.name] = tech;
    return map;
  },
  {} as Record<string, TechMeta>
);

const getTechIconUrl = ({ icon, color }: TechMeta) =>
  `https://cdn.simpleicons.org/${icon}/${color}`;

const projects: ProjectMeta[] = [
  {
    title: 'Travel planner',
    ariaLabel: 'Turistar travel planner',
    description: 'Interactive trip planner with drag-and-drop scheduling.',
    siteLink: 'https://travel-planner-orpin.vercel.app/',
    tag: 'Selected',
    stacks: ['Next.js', 'TypeScript'],
  },
  {
    title: 'Personal Portfolio',
    ariaLabel: 'Personal portfolio',
    description: 'Clean single-page portfolio with smooth motion and theming.',
    siteLink: '#',
    stacks: ['React', 'TypeScript'],
  },
  {
    title: 'Quiz Mini Game',
    ariaLabel: 'Trivia App quiz game',
    description: 'Live quiz experience with themed rounds and a responsive timer.',
    siteLink: 'https://andre-lmarinho.github.io/Trivia/',
    stacks: ['React', 'TypeScript'],
  },
  {
    title: 'TD Advocacia',
    ariaLabel: 'TD Advocacia & Consultoria Empresarial website',
    description: 'Corporate website for a law and data protection firm.',
    siteLink: 'https://doreaadv.com/',
    stacks: ['WordPress', 'JavaScript'],
  },
];

const cardLinkClassName = cn(
  'flex h-full flex-col gap-2.5 overflow-hidden rounded-xl border border-zinc-200 px-5 py-4 outline-none transition-colors',
  'hover:bg-zinc-100 active:bg-zinc-100 focus-visible:border-zinc-300 focus-visible:bg-zinc-100',
  'dark:border-zinc-800 dark:hover:bg-zinc-900 dark:active:bg-zinc-900 dark:focus-visible:border-zinc-700 dark:focus-visible:bg-zinc-900'
);

export default function Projects() {
  return (
    <section id="projects" aria-label="Projects">
      <h2>Projects</h2>
      <ul className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2">
        {projects.map((project) => {
          const isExternal = project.siteLink.startsWith('http');

          return (
            <li key={project.title} className="h-full">
              <a
                className={cardLinkClassName}
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
                                <Image
                                  src={getTechIconUrl(tech)}
                                  alt={`${tech.name} logo`}
                                  className="mr-1 inline-block h-3 w-3"
                                  width={12}
                                  height={12}
                                  sizes="12px"
                                  loading="lazy"
                                  unoptimized
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
    </section>
  );
}
