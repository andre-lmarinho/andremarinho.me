// src/data/projects.ts
import type { Project } from './types';

export const projects: Project[] = [
  {
    title: 'Turistar',
    arialabel: 'Turistar travel planner',
    description: 'Interactive trip planner with drag-and-drop features. 🗺️',
    siteLink: 'https://travel-planner-orpin.vercel.app/',
    stacks: ['Next.js', 'TypeScript'],
  },
  {
    title: 'Quiz Game',
    arialabel: 'Trivia App quiz game',
    description: 'Live quiz game with themes and timer. ⏱️',
    siteLink: 'https://andre-lmarinho.github.io/Trivia/',
    stacks: ['React', 'TypeScript'],
  },
  {
    title: 'Personal Portfolio',
    arialabel: 'Personal portfolio',
    description: 'A clean and responsive single-page portfolio with smooth animations. 🚀',
    siteLink: '#',
    stacks: ['React', 'TypeScript'],
  },
];
