export const CONTACT_EMAIL = "hey@andremarinho.me";

export const SITE_URL = "https://andremarinho.me";
export const SITE_NAME = "André Marinho";

export const SOCIAL_GIT = "https://github.com/andre-lmarinho";
export const SOCIAL_IN = "https://www.linkedin.com/in/andre-lmarinho/";

export type WorkPlace = {
  name: string;
  website: string;
  logo: string;
  roles: {
    title: string;
    period: string;
  }[];
};

export const workPlaces: WorkPlace[] = [
  {
    name: "Duonorth Studio",
    website: "https://studio.andremarinho.me",
    logo: "/images/work/duonorth.webp",
    roles: [
      { title: "Front End Engineer", period: "2025 - Now" },
      { title: "WordPress Developer", period: "2020 - 2024" },
      { title: "Digital Marketing & Web Consultant", period: "2017 - 2019" },
    ],
  },
];

export const currentJob = {
  label: "Duonorth",
  href: workPlaces[0].website,
};

export type SocialLink = {
  label: string;
  href: string;
  display?: string;
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: SOCIAL_GIT },
  { label: "LinkedIn", href: SOCIAL_IN },
];

export const socialLinkUrls = socialLinks.map(({ href }) => href);

export const emailLink: SocialLink = {
  label: "Email",
  href: `mailto:${CONTACT_EMAIL}`,
  display: CONTACT_EMAIL,
};

export const onlineLinks: SocialLink[] = [...socialLinks, emailLink];
