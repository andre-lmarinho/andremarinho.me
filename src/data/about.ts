// src/data/about.ts
import { SiReact, SiTypescript } from 'react-icons/si';

/**
 * Main About section text.
 * Each string in the array represents a separate paragraph.
 */
export const aboutParagraphs: string[] = [
  "Hi! I'm André, a front-end developer who bridges the gap between marketing strategy and technical execution.",
  "Specializing in responsive and intuitive user interfaces built with React, TypeScript, and enhanced by analytics, I create digital experiences designed to not only engage but strategically drive results.",
  "A believer in continuous learning and active contributor in global tech communities, I've completed Harvard's CS50 and continually sharpen my skills by staying at the forefront of emerging technologies.",
  "Clean, maintainable code and performance-driven innovation form the core of my work. Ensuring seamless experiences that look great and deliver measurable impact for your business.",
  "Let's build something remarkable together."
];

/**
 * Words that should always stay highlighted in the animation.
 * They remain permanently active (not affected by scroll position or interaction).
 */
export const alwaysActiveWords = ['hi', "i'm", 'andre'];

/**
 * Words that should display an icon next to them.
 * Each entry links a specific word to a visual icon and optional animations.
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
};