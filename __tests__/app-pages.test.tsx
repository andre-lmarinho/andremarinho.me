import { cleanup, render, screen } from '@testing-library/react';
import type { ComponentProps, ElementType, ReactNode } from 'react';

import HomePage, { metadata as homeMetadata } from '@/app/page';
import AboutPage, { metadata as aboutMetadata } from '@/app/about/page';
import StudioPage, { metadata as studioMetadata } from '@/app/studio/page';
import { buildCanonical } from '@/config/seo';

afterEach(() => {
  cleanup();
});

const renderServerComponent = async (Component: () => ReactNode | Promise<ReactNode>) => {
  const element = await Component();
  render(<>{element}</>);
};

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
    it('renders the primary sections from the default export', async () => {
      await renderServerComponent(HomePage);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Hey! I'm Andre Marinho");
      expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: 'Work' })).toBeInTheDocument();
    });

    it('exposes the canonical metadata for the homepage', () => {
      expect(homeMetadata).toMatchObject({
        alternates: { canonical: buildCanonical() },
        openGraph: expect.objectContaining({ url: buildCanonical() }),
      });
    });
  });

  describe('About page', () => {
    it('renders the about content from the default export', async () => {
      await renderServerComponent(AboutPage);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About me');
      expect(screen.getByRole('heading', { level: 2, name: 'Work' })).toBeInTheDocument();
    });

    it('defines metadata for canonical navigation and Open Graph', () => {
      expect(aboutMetadata).toMatchObject({
        title: 'About me',
        alternates: { canonical: buildCanonical('/about') },
        openGraph: expect.objectContaining({
          url: buildCanonical('/about'),
          title: 'About me',
        }),
      });
    });
  });

  describe('Studio page', () => {
    it('renders the studio marketing content without crashing', async () => {
      await renderServerComponent(StudioPage);

      const callLinks = screen.getAllByRole('link', { name: 'Book a call' });
      expect(callLinks.length).toBeGreaterThan(0);
      callLinks.forEach((link) => {
        expect(link).toHaveAttribute('href', 'https://wa.me/5571984770061');
      });
      expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument();
      expect(screen.getByTestId('mock-scroll-copy')).toBeInTheDocument();
    });

    it('exports metadata describing the studio landing page', () => {
      expect(studioMetadata).toMatchObject({
        title: 'Duonorth Studio',
        alternates: { canonical: buildCanonical('/studio') },
        openGraph: expect.objectContaining({
          url: buildCanonical('/studio'),
          title: 'Duonorth Studio',
        }),
      });
    });
  });
});
