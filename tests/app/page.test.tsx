import { cleanup, render, screen } from '@testing-library/react';
import type { ComponentProps, ElementType, ReactNode } from 'react';

import HomePage, { metadata as homeMetadata } from '@/app/page';

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
  default: ({
    priority: _priority,
    unoptimized: _unoptimized,
    alt = '',
    ...props
  }: NextImageProps) => {
    // eslint-disable-next-line @next/next/no-img-element -- Mocked component for tests only.
    return <img alt={alt} {...props} />;
  },
}));

type TextTypeMockProps = {
  text: string | string[];
  as?: ElementType;
  className?: string;
  initialText?: string;
};

type ScrollFadeTextMockProps = {
  className?: string;
};

jest.mock('@/app/studio/components/effects/TypeText', () => {
  const TypeText = ({ text, as: Component = 'span', className = '' }: TextTypeMockProps) => {
    const content = Array.isArray(text) ? text[0] : text;
    return <Component className={className}>{content}</Component>;
  };

  return {
    __esModule: true,
    TypeText,
    default: TypeText,
  };
});

jest.mock('@/app/studio/components/effects/ScrollFadeText', () => {
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

describe('Home page', () => {
  it('renders the primary sections from the default export', async () => {
    await renderServerComponent(HomePage);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Hey! I'm André Marinho");
    expect(
      screen.getByRole('heading', { level: 2, name: 'Selected Projects' })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Work' })).toBeInTheDocument();
  });

  it('exposes the canonical metadata for the homepage', () => {
    expect(homeMetadata).toMatchObject({
      alternates: { canonical: 'https://andremarinho.me' },
    });
  });
});
