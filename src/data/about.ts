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
 * Highlight configuration for the About section.
 * 
 * - The object keys represent the paragraph index.
 * - `alwaysActiveIndexes` is an array of word positions (zero-based) within the paragraph that should always remain highlighted, regardless of scroll position.
 * - `highlightWord` is a specific word (cleaned and case-insensitive) within the paragraph that should receive a custom CSS class (e.g., "gradient-text").
 * 
 * Example:
 * 
 * {
 *   0: { alwaysActiveIndexes: [0, 1, 2] }, // Always highlight the first three words of paragraph 0
 *   4: { highlightWord: 'remarkable' }    // Apply special CSS to the word 'remarkable' in paragraph 4
 * }
 * 
 * Notes:
 * - Word positions start at 0 and should be counted after splitting the paragraph by spaces.
 * - The highlightWord is automatically cleaned (accents and punctuation removed, and compared in lowercase).
 * - You can combine both `alwaysActiveIndexes` and `highlightWord` in the same paragraph if needed.
 */
export const highlightConfig: Record<number, { alwaysActiveIndexes?: number[]; highlightWord?: string }> = {
  0: { 
    alwaysActiveIndexes: [0, 1, 2] 
  },
  4: { 
    highlightWord: 'remarkable'
  }
};


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