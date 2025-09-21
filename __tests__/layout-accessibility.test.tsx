import { render, screen } from '@testing-library/react';
import React from 'react';

import Layout from '@/components/layout';
import { ThemeProvider } from '@/context';

describe('Layout accessibility', () => {
  it('renders a skip link to the main content region', () => {
    render(
      <ThemeProvider>
        <Layout>
          <p>Example content</p>
        </Layout>
      </ThemeProvider>
    );

    const skipLink = screen.getByRole('link', { name: /skip to main content/i });

    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main');
  });
});
