// src/components/sections/Projects.tsx

import React from 'react';
import { ProjectCard } from '@/components';

export default function Projects() {
  return (
    <section id="projects" aria-label="Selected projects">
      <h2 className="my-6 block text-lg font-bold">Projects</h2>
      <ProjectCard />
    </section>
  );
}
