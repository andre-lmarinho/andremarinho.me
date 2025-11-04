import { cleanup, render, screen } from '@testing-library/react';
import type { ComponentProps, ElementType, ReactNode } from 'react';

import AboutPage, { metadata as aboutMetadata } from '@/app/about/page';

afterEach(() => {
  cleanup();
});

const renderServerComponent = async (Component: () => ReactNode | Promise<ReactNode>) => {
  const element = await Component();
  render(<>{element}</>);
};

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/about'),
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

type ScrollFadeTextMockProps = {
  className?: string;
};

jest.mock('@/components/effects/TypeText', () => {
  const TypeText = ({
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
  };

  return {
    __esModule: true,
    TypeText,
    default: TypeText,
  };
});

jest.mock('@/components/effects/ScrollFadeText', () => {
  const ScrollFadeText = ({ className = '' }: ScrollFadeTextMockProps) => (
    <div className={className} data-testid="mock-scroll-copy">
      Duonorth is an independent studio.
    </div>
  );

  return {
    __esModule: true,
    ScrollFadeText,
    default: ScrollFadeText,
  };
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
      alternates: { canonical: '/about' },
      openGraph: expect.objectContaining({
        url: '/about',
      }),
    });
  });
});
