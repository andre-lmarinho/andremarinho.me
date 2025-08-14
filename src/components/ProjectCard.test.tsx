import { render, screen } from '@testing-library/react';
import ProjectCard from './ProjectCard';

describe('ProjectCard', () => {
  it('renders a link when siteLink exists', () => {
    render(<ProjectCard />);
    const link = screen.getByRole('link', {
      name: /Turistar travel planner/i,
    });
    expect(link.getAttribute('href')).toBe('https://travel-planner-orpin.vercel.app/');
  });

  it('renders a disabled container when siteLink is missing', () => {
    render(<ProjectCard />);
    const title = screen.getByText('Personal Portfolio');
    expect(title.closest('a')).toBeNull();
    const container = title.closest('div[aria-disabled="true"]');
    expect(container).not.toBeNull();
    expect(container?.getAttribute('aria-disabled')).toBe('true');
  });
});
