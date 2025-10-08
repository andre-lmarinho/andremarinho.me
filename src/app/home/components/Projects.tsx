import Image from 'next/image';
import React from 'react';
import { SectionTitle } from '@/components/Heading';

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
  { name: 'php', icon: 'php', color: '474A8A' },
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
    ariaLabel: 'Travel planner',
    description: 'A travel planner for absolutely everyone.',
    siteLink: 'https://github.com/andre-lmarinho/travel-planner',
    tag: 'Selected',
    stacks: ['Next.js', 'TypeScript'],
  },
  {
    title: 'andremarinho.me',
    ariaLabel: 'andremarinho.me',
    description: 'The code behind this portfolio site.',
    siteLink: 'https://github.com/andre-lmarinho/andremarinho.me',
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
    title: 'doreaadv.com',
    ariaLabel: 'doreaadv.com',
    description: 'Corporate website with some custom php.',
    siteLink: 'https://doreaadv.com/',
    stacks: ['WordPress', 'JavaScript', 'php'],
  },
];

export default function Projects() {
  return (
    <section id="projects" aria-label="Projects">
      <SectionTitle>Projects</SectionTitle>
      <ul className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2">
        {projects.map((project) => {
          const isExternal = project.siteLink.startsWith('http');

          return (
            <li key={project.title} className="h-full">
              <a
                className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 px-5 py-4 transition-colors outline-none hover:bg-zinc-100 focus-visible:border-zinc-300 focus-visible:bg-zinc-100 active:bg-zinc-100 lg:group-hover/list:opacity-50 lg:hover:opacity-100 dark:border-zinc-800 dark:hover:bg-zinc-900 dark:focus-visible:border-zinc-700 dark:focus-visible:bg-zinc-900 dark:active:bg-zinc-900"
                href={project.siteLink}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noreferrer noopener' : undefined}
                aria-label={
                  isExternal ? `${project.ariaLabel} (opens in a new tab)` : project.ariaLabel
                }
              >
                <h3 className="leading-snug font-medium">
                  {project.title}
                  {project.tag && (
                    <span className="mb-2 ml-5 inline-block rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200">
                      {project.tag}
                    </span>
                  )}
                </h3>
                <p className="my-2 text-sm leading-normal text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
                <ul className="mt-auto flex flex-wrap" aria-label="Technologies used:">
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
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
