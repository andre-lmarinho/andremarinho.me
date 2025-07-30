// src/components/sections/Projects.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '@/components';
import { useMotion } from '@/context';

export default function Projects() {
  const { shouldReduceMotion } = useMotion();

  return (
    <section id="projects" aria-label="Selected projects">
      <motion.h2
        className="my-6 block text-lg font-bold"
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -6 }}
        whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: shouldReduceMotion ? 0.15 : 0.16 }}
      >
        Selected Projects
      </motion.h2>

      <ProjectCard />
    </section>
  );
}
