// src/data/projects.ts
import type { Project } from './types';

export const projects: Project[] = [
  {
    title: 'Turistar App',
    ariaLabel: 'Turistar travel planner',
    description: 'Interactive trip planner with drag-and-drop scheduling.',
    siteLink: 'https://travel-planner-orpin.vercel.app/',
    tag: 'Selected',
    stacks: ['Next.js', 'TypeScript'],
  },
  {
    title: 'Quiz Mini Game',
    ariaLabel: 'Trivia App quiz game',
    description: 'Live quiz experience with themed rounds and a responsive timer.',
    siteLink: 'https://andre-lmarinho.github.io/Trivia/',
    stacks: ['React', 'TypeScript'],
  },
  {
    title: 'Personal Portfolio',
    ariaLabel: 'Personal portfolio',
    description: 'Clean single-page portfolio with smooth motion and theming.',
    siteLink: '#',
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
