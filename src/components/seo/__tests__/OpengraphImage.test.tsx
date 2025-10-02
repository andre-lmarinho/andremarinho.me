import { render, screen } from '@testing-library/react';

import OpengraphImage from '@/components/seo/OpengraphImage';

describe('OpengraphImage', () => {
  it('matches the expected structure for the default card', () => {
    const { container } = render(
      <OpengraphImage
        title="Andre Marinho - Front-End Developer"
        description="I am a Front-End Developer based in Salvador. I create digital experiences that connect design, strategy and business growth."
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the scoped url when provided', () => {
    render(
      <OpengraphImage
        title="About me"
        description="Learn about Andre"
        url="about"
      />,
    );

    expect(screen.getByText('andremarinho.me/about')).toBeInTheDocument();
  });
});
