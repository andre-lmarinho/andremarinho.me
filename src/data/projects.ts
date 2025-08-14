// src/data/projects.ts
import type { Project } from './types';

export const projects: Project[] = [
  {
    title: 'Turistar',
    ariaLabel: 'Turistar travel planner',
    description: 'Interactive trip planner with drag-and-drop features. 🗺️',
    siteLink: 'https://travel-planner-orpin.vercel.app/',
    stacks: ['Next.js', 'TypeScript'],
  },
  {
    title: 'Quiz Game',
    ariaLabel: 'Trivia App quiz game',
    description: 'Live quiz game with themes and timer. ⏱️',
    siteLink: 'https://andre-lmarinho.github.io/Trivia/',
    stacks: ['React', 'TypeScript'],
  },
  {
    title: 'Personal Portfolio',
    ariaLabel: 'Personal portfolio',
    description: 'A clean and responsive single-page portfolio with smooth animations. 🚀',
    siteLink: '#',
    stacks: ['React', 'TypeScript'],
  },
  {
    title: 'Roltek',
    ariaLabel: 'Roltek industrial distribution website',
    description: 'Industrial distributor site for bearings, belts, and maintenance supplies.',
    siteLink: 'https://www.roltek.com.br/',
    stacks: ['WordPress', 'JavaScript'],
  },
  {
    title: 'TD Advocacia',
    ariaLabel: 'TD Advocacia & Consultoria Empresarial website',
    description: 'Corporate law & data protection firm website.',
    siteLink: 'https://doreaadv.com/',
    stacks: ['WordPress', 'JavaScript'],
  },
];
