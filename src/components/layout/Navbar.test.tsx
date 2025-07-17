import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NavBar } from '@/components';
import { ThemeProvider } from '@/context';

function Wrapper() {
  return (
    <ThemeProvider>
      <NavBar />
    </ThemeProvider>
  );
}

describe('Navbar dark mode toggle', () => {
  const style = document.createElement('style');
  style.innerHTML = `
    .hidden{display:none;}
    .dark .dark\\:block{display:block !important;}
    .dark .dark\\:hidden{display:none !important;}
  `;

  beforeEach(() => {
    document.head.appendChild(style);
    document.documentElement.classList.remove('dark');
  });

  afterEach(() => {
    if (style.parentNode) {
      style.parentNode.removeChild(style);
    }
  });

  it('toggles icons and dark class', async () => {
    const { container, getByLabelText } = render(<Wrapper />);

    const button = getByLabelText('Toggle dark mode');
    const moon = container.querySelector('svg.lucide-moon') as SVGElement;
    const sun = container.querySelector('svg.lucide-sun') as SVGElement;

    expect(window.getComputedStyle(moon).display).not.toBe('none');
    expect(window.getComputedStyle(sun).display).toBe('none');

    await userEvent.click(button);

    expect(document.documentElement.classList.contains('dark')).toBe(true);

    expect(window.getComputedStyle(moon).display).toBe('none');
    expect(window.getComputedStyle(sun).display).not.toBe('none');

    await userEvent.click(button);

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
