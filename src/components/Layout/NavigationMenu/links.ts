type NavigationLink = {
  text: string;
  href: `/${string}`;
};

export const NAV_LINKS = {
  desktop: [
    { text: "Work", href: "/work" },
    { text: "About", href: "/about" },
  ],
  mobile: [
    { text: "Home", href: "/" },
    { text: "Work", href: "/work" },
    { text: "About", href: "/about" },
  ],
} as const satisfies Record<string, readonly NavigationLink[]>;
