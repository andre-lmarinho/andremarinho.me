type SocialIcon = 'github' | 'linkedin' | 'email';

type WebLink = {
  kind: 'web';
  label: string;
  href: `https://${string}`;
  ariaLabel?: string;
  icon?: Exclude<SocialIcon, 'email'>;
};

type MailLink = {
  kind: 'email';
  label: string;
  href: `mailto:${string}`;
  ariaLabel?: string;
  icon?: 'email';
};

type SocialLink = Readonly<WebLink | MailLink>;

export const SOCIAL_LINKS = [
  {
    kind: 'web',
    label: 'GitHub',
    href: 'https://github.com/andre-lmarinho',
    icon: 'github',
  },
  {
    kind: 'web',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/andre-marinho-3318ab1aa/',
    icon: 'linkedin',
  },
  {
    kind: 'email',
    label: 'Email',
    href: 'mailto:hey@andremarinho.me',
    icon: 'email',
  },
] as const satisfies ReadonlyArray<SocialLink>;

export const getSocialSameAs = (): string[] =>
  SOCIAL_LINKS.filter((l) => l.kind === 'web').map((l) => l.href);
