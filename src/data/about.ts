// src/data/about.ts

import { SiReact, SiTypescript, SiNextdotjs } from 'react-icons/si';

/**
 * Main About section text.
 * Each string in the array represents a separate paragraph.
 */
export const aboutParagraphs: string[] = [
  "Hi! I'm André, a front-end developer who likes to build responsive and intuitive user interfaces with React, TypeScript, and Next.js.",
  //"Clean, maintainable code and performance-driven innovation form the core of my work. Ensuring seamless experiences that look great and deliver measurable impact for your business.",
  //"Let's build something remarkable together."
];

/**
 * Highlight configuration for the About section.
 * 
 * - Keys represent paragraph indices.
 * - `alwaysActiveIndexes`: word positions (0-based) that are always highlighted.
 * - `highlightWord`: a specific cleaned, case-insensitive word to apply a special CSS class.
 */
export const highlightConfig: Record<number, { alwaysActiveIndexes?: number[]; highlightWord?: string }> = {
  0: { 
    alwaysActiveIndexes: [0, 1, 2], // Always highlight "Hi!", "I'm", "André,"
  },
  2: { 
    highlightWord: 'remarkable'      // Apply gradient to "remarkable"
  }
};

/**
 * Mapping of clean words to icons, colors, and hover animations.
 * 
 * - `icon`: React icon component
 * - `color`: brand color for the icon
 * - `hoverAnimation`: Tailwind classes for hover effects
 */
export const iconMap: Record<string, {
  icon: React.ElementType;
  color: string;
  hoverAnimation?: string;
  customMotionProps?: object;
}> = {
  react: {
    icon: SiReact,
    color: '#61DAFB',
    hoverAnimation: 'hover:scale-110 hover:rotate-[180deg] transition-all duration-300',
  },
  typescript: {
    icon: SiTypescript,
    color: '#3178C6',
    hoverAnimation: 'hover:scale-110 transition-all duration-300',
  },
  nextjs: {
    icon: SiNextdotjs,
    color: '#000000',
    hoverAnimation: 'hover:scale-110 transition-all duration-300',
  },
};
