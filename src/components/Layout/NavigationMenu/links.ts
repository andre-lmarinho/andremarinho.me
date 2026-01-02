type NavigationLink = {
  text: string;
  href: `/${string}`;
};

export const NAV_LINKS = {
  desktop: [
    { text: "Studio", href: "/studio" },
    { text: "About", href: "/about" },
  ],
  mobile: [
    { text: "Home", href: "/" },
    { text: "Studio", href: "/studio" },
    { text: "About", href: "/about" },
  ],
} as const satisfies Record<string, readonly NavigationLink[]>;
