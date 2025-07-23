import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
    localStorage.setItem('darkMode', 'false');
  });

  afterEach(() => {
    if (style.parentNode) {
      style.parentNode.removeChild(style);
    }
    localStorage.clear();
  });

  it.skip('toggles icons and dark class', async () => {
    const { container, getByLabelText } = render(<Wrapper />);

    const button = getByLabelText('Toggle dark mode');
    const moon = container.querySelector('svg.lucide-moon') as SVGElement;
    const sun = container.querySelector('svg.lucide-sun') as SVGElement;

    expect(moon.classList.contains('hidden')).toBe(false);
    expect(sun.classList.contains('hidden')).toBe(true);

    fireEvent.click(button);
    await Promise.resolve();

    expect(button.getAttribute('aria-pressed')).toBe('true');
    expect(moon.classList.contains('hidden')).toBe(true);
    expect(sun.classList.contains('hidden')).toBe(false);

    fireEvent.click(button);
    await Promise.resolve();

    expect(button.getAttribute('aria-pressed')).toBe('false');
    expect(moon.classList.contains('hidden')).toBe(false);
    expect(sun.classList.contains('hidden')).toBe(true);
  });
});
