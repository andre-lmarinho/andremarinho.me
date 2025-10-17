import { render, screen } from '@testing-library/react';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

import { NavigationLink as MenuLinks } from '@/components/NavigationLink';

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

  it('filters the homepage link on desktop and marks the active entry', () => {
    usePathnameMock.mockImplementation(() => '/studio/case');

    render(<MenuLinks variant="desktop" />);

    expect(screen.queryByRole('link', { name: 'Home' })).not.toBeInTheDocument();

    const studioLink = screen.getByRole('link', { name: 'Studio' });
    expect(studioLink).toHaveAttribute('data-active', 'true');
    expect(studioLink).toHaveAttribute('aria-current', 'page');

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toHaveAttribute('data-active', 'false');
    expect(aboutLink).not.toHaveAttribute('aria-current');
  });

  it('flags all items as indeterminate on mobile when no route matches', () => {
    usePathnameMock.mockImplementation(() => '/contact');

    render(<MenuLinks variant="mobile" />);

    ['Home', 'Studio', 'About'].forEach((name) => {
      const link = screen.getByRole('link', { name });
      expect(link).toHaveAttribute('data-active', 'indeterminate');
      expect(link).not.toHaveAttribute('aria-current');
    });
  });

  it('does not apply state attributes on the not-found variant', () => {
    usePathnameMock.mockImplementation(() => '/studio');

    render(<MenuLinks variant="notFound" />);

    ['Home', 'Studio', 'About'].forEach((name) => {
      const link = screen.getByRole('link', { name });
      expect(link.getAttribute('data-active')).toBeNull();
      expect(link).not.toHaveAttribute('aria-current');
    });
  });
});
