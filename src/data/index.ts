export interface ContactLink {
  label: string;
  href: string;
  ariaLabel: string;
  icon?: 'github' | 'linkedin' | 'email';
}

export type NavigationLink = {
  text: string;
  href: `/${string}` | `https://${string}` | `http://${string}`;
};

export const navigationLinks: NavigationLink[] = [
  { text: 'Home', href: '/' },
  { text: 'Studio', href: '/studio' },
  { text: 'About', href: '/about' },
];

export const contactLinks: ContactLink[] = [
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
