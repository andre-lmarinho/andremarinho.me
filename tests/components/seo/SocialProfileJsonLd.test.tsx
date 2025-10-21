import { render } from '@testing-library/react';

import { SocialProfileJsonLd } from '@/components/seo/SocialProfileJsonLd';
import { getSocialSameAs } from '@/config/social';

describe('SocialProfileJsonLd', () => {
  const readJson = (container: HTMLElement) => {
    const script = container.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');

    if (!script?.textContent) {
      throw new Error('Expected JSON-LD script to be rendered.');
    }

    return JSON.parse(script.textContent) as Record<string, unknown>;
  };

  it('renders the default profile page metadata', () => {
    const { container } = render(<SocialProfileJsonLd />);
    const jsonLd = readJson(container);

    expect(jsonLd).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: 'André Marinho',
        url: 'https://andremarinho.me',
        sameAs: getSocialSameAs(),
      },
    });
  });

  it('allows overriding the social links and forwards additional props', () => {
    const customSameAs = ['https://example.com/me'];
    const { container } = render(
      <SocialProfileJsonLd sameAs={customSameAs} scriptId="custom-profile-jsonld" />
    );
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script).toHaveAttribute('id', 'custom-profile-jsonld');

    const jsonLd = readJson(container);

    expect(jsonLd).toMatchObject({
      mainEntity: {
        sameAs: customSameAs,
      },
    });
  });
});
