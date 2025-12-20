import { render, screen } from '@testing-library/react';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

import { MenuLinks } from '@/components/Layout/NavigationMenu/NavigationLink';
import { NAV_LINKS } from '@/components/Layout/NavigationMenu/links';

type NextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function MockLink({ href, children, ...rest }: NextLinkProps) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

const usePathnameMock = jest.fn<string | null, []>(() => '/');

jest.mock('next/navigation', () => ({
  usePathname: () => usePathnameMock(),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: MockLink,
}));

describe('MenuLinks', () => {
  beforeEach(() => {
    usePathnameMock.mockReset();
    usePathnameMock.mockImplementation(() => '/');
  });

  it('renders desktop links and marks the active entry', () => {
    usePathnameMock.mockImplementation(() => '/studio/case');

    render(<MenuLinks links={NAV_LINKS.desktop} />);

    expect(screen.queryByRole('link', { name: 'Home' })).not.toBeInTheDocument();

    const studioLink = screen.getByRole('link', { name: 'Studio' });
    expect(studioLink).toHaveAttribute('aria-current', 'page');

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).not.toHaveAttribute('aria-current');
  });

  it('does not set aria-current when no route matches', () => {
    usePathnameMock.mockImplementation(() => '/contact');

    render(<MenuLinks links={NAV_LINKS.mobile} isHamburger />);

    ['Home', 'Studio', 'About'].forEach((name) => {
      const link = screen.getByRole('link', { name });
      expect(link).not.toHaveAttribute('aria-current');
    });
  });
});
