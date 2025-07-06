// src/data/projects.ts
import imgTravel from '/assets/images/Travel_app.webp';
import imgTrivia from '/assets/images/Trivia.webp';

export const projects = [
  {
    title: 'Trivia Quiz App',
    description:
      'An interactive, themeable trivia fetching real-time questions from the OpenTDB API.',
    img: imgTrivia,
    siteLink: 'https://andre-lmarinho.github.io/Trivia/',
    repoLink: 'https://github.com/andre-lmarinho/Trivia/',
    stacks: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Travel Planner',
    description: 'We handle the plan, you enjoy your adventure.',
    img: imgTravel,
    siteLink: 'https://travel-planner-orpin.vercel.app/',
    repoLink: 'https://github.com/andre-lmarinho/travel-planner',
    stacks: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  },
];
