export const siteUrl = "https://andremarinho.me";
export const siteName = "André Marinho";
export const jobTitle = "Software Engineer";

export const siteDescription =
  "Software engineer in Salvador, Brazil. Full-stack web products with TypeScript, React, Next.js, Node.js and PostgreSQL.";

export const absoluteUrl = (path: string) => new URL(path, siteUrl).href;

export const email = "hey@andremarinho.me";

export const socials = [
  {
    label: "GitHub",
    href: "https://github.com/andre-lmarinho",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/andre-lmarinho",
    icon: "linkedin",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/andre.lmarinho/",
    icon: "instagram",
  },
] as const;
