// src/data/projects.ts
import imgTravel from '@/images/Travel_app.webp';
import imgTrivia from '@/images/Trivia.webp';
import imgPortfolio from '@/images/Portfolio.webp';

export const projects = [
  {
    title: 'Turistar – Drag-and-Drop Travel Planner',
    arialabel: 'Turistar travel planner',
    description:
      'A minimalist travel itinerary planner. Users select a destination and date range to generate a starter plan, which they can customize freely by editing or dragging activities between days. Everything is stored locally, so the trip stays saved across sessions.',
    img: imgTravel,
    siteLink: 'https://travel-planner-orpin.vercel.app/',
    repoLink: 'https://github.com/andre-lmarinho/travel-planner',
    stacks: ['Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    title: 'Trivia App – Customizable Quiz Game',
    arialabel: 'Trivia App quiz game',
    description:
      'A fast, interactive quiz app. It pulls real-time questions from the OpenTDB API and lets users customize everything—from categories and difficulty to live-preview themes. Features include a built-in timer, result tracking, and smooth transitions with Framer Motion.',
    img: imgTrivia,
    siteLink: 'https://andre-lmarinho.github.io/Trivia/',
    repoLink: 'https://github.com/andre-lmarinho/Trivia/',
    stacks: ['React', 'TypeScript', 'Tailwind'],
  },
  {
    title: 'Personal Portfolio – andre-lmarinho.dev',
    arialabel: 'Personal portfolio',
    description:
      'A clean, responsive single-page site. Features include smooth scroll, animated backgrounds, dark/light mode toggle, dynamic metadata for SEO, and a scroll-aware navbar—all designed to showcase your projects and skills with style and performance.',
    img: imgPortfolio,
    siteLink: '#',
    repoLink: 'https://github.com/andre-lmarinho/Home',
    stacks: ['React', 'TypeScript', 'Tailwind'],
  },
];
