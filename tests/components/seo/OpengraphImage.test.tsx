import { render, screen } from '@testing-library/react';

import { OpengraphImage, getAvatarImageSrc } from '@/components/OpengraphImage';

describe('OpengraphImage', () => {
  let avatarSrc: string;

  beforeAll(async () => {
    avatarSrc = await getAvatarImageSrc();
  });

  it('renders the default card with the local avatar image', () => {
    const { container } = render(
      <OpengraphImage
        title="André Marinho"
        description="This is a description test."
        avatarSrc={avatarSrc}
      />
    );

    expect(screen.getByText('André Marinho')).toBeInTheDocument();
    expect(screen.getByText('This is a description test.')).toBeInTheDocument();

    const avatar = container.querySelector('img');
    expect(avatar).toHaveAttribute('src', expect.stringMatching(/^data:image\/jpeg;base64,/));
  });

  it('renders the scoped url when provided', () => {
    render(
      <OpengraphImage
        title="About me"
        description="Learn about Andre"
        url="about"
        avatarSrc={avatarSrc}
      />
    );

    expect(screen.getByText('andremarinho.me/about')).toBeInTheDocument();
  });
});
