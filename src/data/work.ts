// src/data/work.ts
import duonorthLogo from '@/assets/images/work/duonorth.webp';
import type { WorkPlace } from './types';

export const workPlaces: WorkPlace[] = [
  {
    name: 'Duonorth Studio',
    website: '#',
    logo: duonorthLogo,
    roles: [
      {
        title: 'Frontend Developer',
        startYear: 2025,
        endYear: 'Now',
      },
      {
        title: 'Web and Wordpress Developer',
        startYear: 2020,
        endYear: 2024,
      },
      {
        title: 'Digital Marketing & Web Consultant',
        startYear: 2017,
        endYear: 2019,
      },
    ],
  },
];
