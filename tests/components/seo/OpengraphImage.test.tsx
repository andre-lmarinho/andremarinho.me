import { render, screen } from '@testing-library/react';

import { OpengraphImage } from '@/components/OpengraphImage';

describe('OpengraphImage', () => {
  it('matches the expected structure for the default card', () => {
    const { container } = render(
      <OpengraphImage title="André Marinho" description="This is a description test." />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the scoped url when provided', () => {
    render(<OpengraphImage title="About me" description="Learn about Andre" url="about" />);

    expect(screen.getByText('andremarinho.me/about')).toBeInTheDocument();
  });
});
