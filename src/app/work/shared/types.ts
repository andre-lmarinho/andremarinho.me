import type { StaticImageData } from 'next/image';

export type WorkStoryLink = {
  label: string;
  href: string;
};

export type WorkStoryMetadata = {
  title: string;
  description: string;
  role: string;
  time: string;
  date: string;
  image?: StaticImageData | string;
  links?: WorkStoryLink[];
};
