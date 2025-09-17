// src/data/types.ts

export interface Project {
  title: string;
  ariaLabel: string;
  description: string;
  siteLink: string;
  stacks: string[];
  tag?: string;
}

export interface Tech {
  name: string;
  icon: string;
  color: string;
}

export interface WorkRole {
  title: string;
  startYear: number;
  endYear?: number | 'Now';
}

export interface WorkPlace {
  name: string;
  website: string;
  logo: string;
  roles: WorkRole[];
}
