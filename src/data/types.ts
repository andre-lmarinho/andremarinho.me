// src/data/types.ts

export interface Project {
  title: string;
  ariaLabel: string;
  description: string;
  siteLink: string;
  stacks: string[];
}

export interface Tech {
  name: string;
  icon: string;
  color: string;
}
