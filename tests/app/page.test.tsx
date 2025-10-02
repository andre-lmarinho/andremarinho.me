import { cleanup, render, screen } from '@testing-library/react';
import type { ComponentProps, ElementType, ReactNode } from 'react';

import HomePage, { metadata as homeMetadata } from '@/app/page';
import { buildCanonical } from '@/config/metadata';

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
