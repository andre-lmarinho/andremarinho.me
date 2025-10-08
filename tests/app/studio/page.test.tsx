import { cleanup, render, screen } from '@testing-library/react';
import type { ComponentProps, ElementType, ReactNode } from 'react';

import StudioPage, { metadata as studioMetadata } from '@/app/studio/page';
import { studioPricingPlans } from '@/app/studio/components/Pricing';
import { studioName } from '@/config/metadata';

afterEach(() => {
  cleanup();
});

const renderServerComponent = async (Component: () => ReactNode | Promise<ReactNode>) => {
  const element = await Component();
  render(<>{element}</>);
};

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/studio'),
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

describe('Studio page', () => {
  it('renders the studio marketing content without crashing', async () => {
    await renderServerComponent(StudioPage);

    const callLinks = screen.getAllByRole('link', { name: 'Book a call' });
    expect(callLinks.length).toBeGreaterThan(0);
    callLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', 'https://wa.me/5571984770061');
    });

    expect(
      screen.getByRole('heading', { level: 2, name: 'Selected Projects' })
    ).toBeInTheDocument();
    expect(screen.getByTestId('mock-scroll-copy')).toBeInTheDocument();
  });

  it('exports metadata describing the studio landing page', () => {
    expect(studioMetadata).toMatchObject({
      title: 'Duonorth Studio',
      alternates: { canonical: '/studio' },
      openGraph: expect.objectContaining({
        url: '/studio',
      }),
    });
  });

  it('renders structured data describing the studio plans', async () => {
    await renderServerComponent(StudioPage);

    const scripts = Array.from(
      document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]')
    );
    const productSchemas = scripts
      .map((script) => {
        try {
          return JSON.parse(script.textContent ?? '{}');
        } catch (error) {
          return {};
        }
      })
      .filter((data) => data['@type'] === 'Product');

    expect(productSchemas).toHaveLength(studioPricingPlans.length);
    studioPricingPlans.forEach((plan) => {
      expect(productSchemas).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: `${studioName} ${plan.tier} plan`,
            offers: expect.objectContaining({
              price: plan.price.value,
              priceCurrency: plan.price.currency,
              seller: expect.objectContaining({
                name: studioName,
              }),
            }),
          }),
        ])
      );
    });
  });
});
