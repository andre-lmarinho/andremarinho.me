import { GitHub, Instagram, Linkedin } from "@/components/ui/icon";

export const profile = {
  place: "Salvador, Brazil",
  timeZone: "America/Bahia",
  name: "André Marinho",
  role: "Full-Stack Developer",
  paragraphs: [
    "React, Next.js and TypeScript on the front, Node with tRPC and PostgreSQL behind it. I work on products that run in production, with automated tests, CI, and the architecture decisions written down for whoever comes next.",
    "Before code, eight years founding and running my own digital agency, scoping software other people built. I build it myself now, end to end.",
  ],
} as const;

export const email = "hey@andremarinho.me";

export const socials = [
  { label: "GitHub", href: "https://github.com/andre-lmarinho", icon: GitHub },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/andre-lmarinho",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/andre.lmarinho/",
    icon: Instagram,
  },
] as const;

export const colophon = "Written from scratch in Next.js and Tailwind.";
export const sourceUrl = "https://github.com/andre-lmarinho/me";
