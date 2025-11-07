import Image from 'next/image';
import React from 'react';

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
    title: 'doreaadv.com',
    ariaLabel: 'doreaadv.com',
    description: 'Tailored WordPress powered by a custom plugin and JS.',
    siteLink: 'https://doreaadv.com/',
    stacks: ['php', 'JavaScript'],
  },
];

export const Projects = () => {
  return (
    <section id="projects" aria-label="Projects">
      <a
        className="group my-6 flex cursor-pointer items-center justify-between gap-3 rounded-xs"
        href="https://github.com/andre-lmarinho"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className="m-0 underline-offset-4 group-hover:underline">Selected Projects</h2>
        <span className="cursor-pointer rounded-lg border bg-white px-2 py-[3px] text-center text-xs dark:border-neutral-700 dark:bg-neutral-900">
          View all →
        </span>
      </a>
      <ul className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-3">
        {projects.map((project) => {
          return (
            <li key={project.title} className="h-full">
              <a
                className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 px-5 py-4 transition-colors outline-none hover:bg-zinc-100 focus-visible:border-zinc-300 focus-visible:bg-zinc-100 active:bg-zinc-100 lg:group-hover/list:opacity-50 lg:hover:opacity-100 dark:border-zinc-800 dark:hover:bg-zinc-900 dark:focus-visible:border-zinc-700 dark:focus-visible:bg-zinc-900 dark:active:bg-zinc-900"
                href={project.siteLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.ariaLabel} (opens in a new tab)`}
              >
                <h3 className="leading-snug font-medium">{project.title}</h3>
                <p className="text-muted my-2 text-sm leading-normal">{project.description}</p>
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
                          <span className="text-muted">{stack}</span>
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
};
