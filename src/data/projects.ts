// src/data/projects.ts
import imgProjeto from '/assets/images/Portfolio.webp';
import imgTrivia from '/assets/images/Trivia.webp';

export const projects = [
  {
    title: 'Trivia Quiz App',
    description:
      'An interactive, themeable trivia quiz app built with React, TypeScript, and Tailwind CSS, fetching real-time questions from the OpenTDB API.',
    img: imgTrivia,
    siteLink: 'https://andre-lmarinho.github.io/Trivia/',
    repoLink: 'https://github.com/andre-lmarinho/Trivia/',
    stacks: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'This Portfolio Site',
    description: 'Is this site that you are in to showcase my work.',
    img: imgProjeto,
    siteLink: 'https://andre-lmarinho.github.io/Homepage/',
    repoLink: 'https://github.com/andre-lmarinho/Homepage/',
    stacks: ['React', 'TypeScript', 'Tailwind CSS'],
  },
];
