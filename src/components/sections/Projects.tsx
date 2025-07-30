// src/components/sections/Projects.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components';
import { useMotion } from '@/context';
import { animations } from '@/utils';

export default function Projects() {
  const { shouldReduceMotion } = useMotion();

  return (
    <section id="projects" aria-label="Selected projects">
      <motion.h2 className="my-6 block text-lg font-bold" {...animations.H2(shouldReduceMotion)}>
        Selected Projects
      </motion.h2>

      <ProjectCard />
    </section>
  );
}
