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
  image?: string;
  links?: WorkStoryLink[];
};
