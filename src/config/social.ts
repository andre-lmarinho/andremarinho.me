type SocialLinkIcon = 'github' | 'linkedin' | 'email';

type SocialLink = {
  label: string;
  href: string;
  ariaLabel: string;
  icon?: SocialLinkIcon;
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/andre-lmarinho',
    ariaLabel: 'GitHub profile (opens in a new tab)',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/andre-marinho-3318ab1aa/',
    ariaLabel: 'LinkedIn profile (opens in a new tab)',
    icon: 'linkedin',
  },
  {
    label: 'Email',
    href: 'mailto:hey@andremarinho.me',
    ariaLabel: 'Send an email to hey@andremarinho.me',
    icon: 'email',
  },
];

const SOCIAL_PROFILE_URLS = SOCIAL_LINKS.filter(({ href }) => !href.startsWith('mailto:')).map(
  ({ href }) => href
);

const getSocialSameAs = (): string[] => [...SOCIAL_PROFILE_URLS];

export type { SocialLink, SocialLinkIcon };
export { SOCIAL_LINKS, getSocialSameAs };
