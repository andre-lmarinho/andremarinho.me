import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders external links', () => {
    render(<Footer />);
    expect(screen.getByLabelText(/Figma/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Vercel/)).toBeInTheDocument();
  });
});
