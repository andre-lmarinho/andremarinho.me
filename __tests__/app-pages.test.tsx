import { cleanup, render, screen } from '@testing-library/react';
import type { ComponentProps, ElementType } from 'react';

import HomePage, { metadata as homeMetadata } from '@/app/page';
import AboutPage, { metadata as aboutMetadata } from '@/app/about/page';
import StudioPage, { metadata as studioMetadata } from '@/app/studio/page';

afterEach(() => {
  cleanup();
});

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

type NextImageProps = ComponentProps<'img'> & {
  priority?: boolean;
  unoptimized?: boolean;
};

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority: _priority, unoptimized: _unoptimized, ...props }: NextImageProps) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

type TextTypeMockProps = {
  text: string | string[];
  as?: ElementType;
  className?: string;
};

type ScrollCopyMockProps = {
  className?: string;
};

jest.mock('@/app/studio/components/TextType', () => ({
  __esModule: true,
  default: ({
    text,
    as: Component = 'span',
    className = '',
    ...rest
  }: TextTypeMockProps & Record<string, unknown>) => {
    const content = Array.isArray(text) ? text[0] : text;
    return (
      <Component className={className} {...rest}>
        {content}
      </Component>
    );
  },
}));

jest.mock('@/app/studio/components/ScrollCopy', () => ({
  __esModule: true,
  default: ({ className = '' }: ScrollCopyMockProps) => (
    <div className={className} data-testid="mock-scroll-copy">
      Duonorth is an independent studio.
    </div>
  ),
}));

describe('App router pages', () => {
  describe('Home page', () => {
    it('renders the primary sections from the default export', () => {
      render(<HomePage />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Hey! I'm Andre Marinho");
      expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: 'Work' })).toBeInTheDocument();
    });

    it('exposes the canonical metadata for the homepage', () => {
      expect(homeMetadata.alternates?.canonical).toBe('https://andremarinho.me');
    });
  });

  describe('About page', () => {
    it('renders the about content from the default export', () => {
      render(<AboutPage />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About me');
      expect(screen.getByRole('heading', { level: 2, name: 'Work' })).toBeInTheDocument();
    });

    it('defines metadata for canonical navigation and Open Graph', () => {
      expect(aboutMetadata.title).toBe('About me');
      expect(aboutMetadata.alternates?.canonical).toBe('/about');
      expect(aboutMetadata.openGraph?.url).toBe('/about');
    });
  });

  describe('Studio page', () => {
    it('renders the studio marketing content without crashing', () => {
      render(<StudioPage />);

      const callLinks = screen.getAllByRole('link', { name: 'Book a call' });
      expect(callLinks.length).toBeGreaterThan(0);
      callLinks.forEach((link) => {
        expect(link).toHaveAttribute('href', 'https://wa.me/5571984770061');
      });
      expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument();
      expect(screen.getByTestId('mock-scroll-copy')).toBeInTheDocument();
    });

    it('exports metadata describing the studio landing page', () => {
      expect(studioMetadata.title).toBe('Duonorth Studio');
      expect(studioMetadata.alternates?.canonical).toBe('/studio');
      expect(studioMetadata.openGraph?.url).toBe('/studio');
    });
  });
});
