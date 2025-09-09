// src/data/projects.ts
import type { Project } from './types';

export const projects: Project[] = [
  {
    title: 'Turistar App',
    ariaLabel: 'Turistar travel planner',
    description: 'Interactive trip planner with drag-and-drop features. 🚀',
    siteLink: 'https://travel-planner-orpin.vercel.app/',
    tag: 'Selected',
    stacks: ['Next.js', 'TypeScript'],
  },
  {
    title: 'Quiz Mini Game',
    ariaLabel: 'Trivia App quiz game',
    description: 'Live quiz game with themes and timer. ⏱️',
    siteLink: 'https://andre-lmarinho.github.io/Trivia/',
    stacks: ['React', 'TypeScript'],
  },
  {
    title: 'Personal Portfolio',
    ariaLabel: 'Personal portfolio',
    description: 'A clean and responsive single-page portfolio with smooth animations. 🎯',
    siteLink: '#',
    stacks: ['React', 'TypeScript'],
  },
  {
    title: 'TD Advocacia',
    ariaLabel: 'TD Advocacia & Consultoria Empresarial website',
    description: 'Corporate law & data protection firm website.',
    siteLink: 'https://doreaadv.com/',
    stacks: ['WordPress', 'JavaScript'],
  },
];

