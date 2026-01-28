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
