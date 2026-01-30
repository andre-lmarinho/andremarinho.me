export type NavigationLink = {
  text: string;
  href: `/${string}`;
  target?: "_blank";
};

const desktopLinks = [
  { text: "Resume", href: "/resume/EN-Andre-Marinho-Resume.pdf", target: "_blank" },
  { text: "Work", href: "/work" },
  { text: "About", href: "/about" },
] as const satisfies readonly NavigationLink[];

export const NAV_LINKS = {
  desktop: desktopLinks,
  all: [{ text: "Home", href: "/" }, ...desktopLinks] as const satisfies readonly NavigationLink[],
} as const;
