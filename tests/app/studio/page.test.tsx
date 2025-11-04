import { cleanup, render, screen } from '@testing-library/react';
import type { ComponentProps, ElementType, ReactNode } from 'react';

import StudioPage, { metadata as studioMetadata } from '@/app/studio/page';
import { plansForUI } from '@/app/studio/offers';

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
  alt?: string;
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
  }: NextImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element -- Mocked component for tests only.
    <img alt={alt} {...props} />
  ),
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

type JsonObject = Record<string, unknown>;

const parseJsonObject = (payload: string | null): JsonObject | null => {
  if (!payload) {
    return null;
  }

  try {
    const parsed = JSON.parse(payload) as unknown;
    if (typeof parsed === 'object' && parsed !== null) {
      return parsed as JsonObject;
    }
  } catch {
    return null;
  }

  return null;
};

const toJsonObject = (value: unknown): JsonObject | null => {
  return typeof value === 'object' && value !== null ? (value as JsonObject) : null;
};

const toJsonObjectArray = (value: unknown): JsonObject[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map(toJsonObject).filter((item): item is JsonObject => item !== null);
};

const toString = (value: unknown) => (typeof value === 'string' ? value : null);

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
    expect(studioMetadata.title).toBe('Duonorth Studio');
    expect(studioMetadata.alternates?.canonical).toBe('/studio');
    expect(studioMetadata.openGraph?.url).toBe('/studio');
  });

  it('exposes structured offers for each pricing plan', async () => {
    await renderServerComponent(StudioPage);

    const schemaScript = document.querySelector('script[type="application/ld+json"]');
    expect(schemaScript).not.toBeNull();

    const schema = parseJsonObject(schemaScript?.textContent ?? null);
    expect(schema?.['@type']).toBe('ProfessionalService');

    const offers = toJsonObjectArray(schema?.makesOffer);
    expect(offers).toHaveLength(plansForUI.length + 1);

    offers.slice(0, plansForUI.length).forEach((offer, index) => {
      const plan = plansForUI[index];
      const itemOffered = toJsonObject(offer['itemOffered']);
      expect(toString(itemOffered?.['name'])).toBe(plan.seo?.serviceName ?? plan.tier);
      expect(toString(itemOffered?.['description'])).toBe(
        plan.seo?.schemaDescription ?? plan.description
      );
    });

    const customOffer = offers[offers.length - 1];
    expect(toString(customOffer?.['category'])).toBe('Custom');
  });
});
