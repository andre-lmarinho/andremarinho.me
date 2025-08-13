// src/data/techs.ts
import type { Tech } from './types';

export const techs: Tech[] = [
  { name: 'React', icon: 'react', color: '61DAFB' },
  { name: 'Next.js', icon: 'next.js', color: '000000' },
  { name: 'TypeScript', icon: 'typescript', color: '3178C6' },
  { name: 'Tailwind', icon: 'tailwindcss', color: '06B6D4' },
  { name: 'HTML5', icon: 'html5', color: 'E34F26' },
  { name: 'CSS3', icon: 'css', color: '1572B6' },
  { name: 'JavaScript', icon: 'javascript', color: 'F7DF1E' },
  { name: 'Bootstrap', icon: 'bootstrap', color: '7952B3' },
  { name: 'Node.js', icon: 'nodedotjs', color: '339933' },
  { name: 'SQL', icon: 'mysql', color: '4479A1' },
  { name: 'WordPress', icon: 'wordpress', color: '21759B' },
];

export const techMap: Record<string, Tech> = techs.reduce(
  (map, tech) => {
    map[tech.name] = tech;
    return map;
  },
  {} as Record<string, Tech>
);

export const getTechIconUrl = ({ icon, color }: Tech) =>
  `https://cdn.simpleicons.org/${icon}/${color}`;
