import { CONTACT_EMAIL } from "@/configs/contact";

export type SocialLink = {
  label: string;
  href: string;
  display?: string;
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/andre-lmarinho" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/andre-marinho-3318ab1aa",
  },
];

export const socialLinkUrls = socialLinks.map(({ href }) => href);

export const emailLink: SocialLink = {
  label: "Email",
  href: `mailto:${CONTACT_EMAIL}`,
  display: CONTACT_EMAIL,
};

export const onlineLinks: SocialLink[] = [...socialLinks, emailLink];
