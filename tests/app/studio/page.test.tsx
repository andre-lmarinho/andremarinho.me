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
  }: NextImageProps) => <img alt={alt} {...props} />,
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
  TextType: ({
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
  ScrollCopy: ({ className = '' }: ScrollCopyMockProps) => (
    <div className={className} data-testid="mock-scroll-copy">
      Duonorth is an independent studio.
    </div>
  ),
}));

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

const isProductSchema = (data: JsonObject | null): data is JsonObject => {
  if (!data) {
    return false;
  }

  const type = data['@type'];
  return typeof type === 'string' && type === 'Product';
};

const toJsonObject = (value: unknown): JsonObject | null => {
  return typeof value === 'object' && value !== null ? (value as JsonObject) : null;
};

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

  it('renders structured data describing the studio plans', async () => {
    await renderServerComponent(StudioPage);

    const scripts = Array.from(
      document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]')
    );
    const productSchemas = scripts
      .map((script) => parseJsonObject(script.textContent ?? null))
      .filter(isProductSchema);

    const schemaEntries = productSchemas
      .map((schema) => {
        const nameValue = schema.name;
        return typeof nameValue === 'string' ? ([nameValue, schema] as const) : null;
      })
      .filter((entry): entry is readonly [string, JsonObject] => entry !== null);

    const schemasByName = new Map(schemaEntries);

    expect(schemasByName.size).toBe(studioPricingPlans.length);

    studioPricingPlans.forEach((plan) => {
      const schemaName = `${studioName} ${plan.tier} plan`;
      const schema = schemasByName.get(schemaName);
      expect(schema).toBeDefined();
      if (!schema) {
        return;
      }

      const offers = toJsonObject(schema.offers);
      expect(offers).not.toBeNull();
      if (!offers) {
        return;
      }

      expect(offers.price).toBe(plan.price.value);
      expect(offers.priceCurrency).toBe(plan.price.currency);

      const seller = toJsonObject(offers.seller);
      expect(seller?.name).toBe(studioName);
    });
  });
});
