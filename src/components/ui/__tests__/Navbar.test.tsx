import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Navbar from '../NavBar';

function Wrapper({ onToggle }: { onToggle: (value: boolean) => void }) {
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleToggle = (value: boolean) => {
    setDarkMode(value);
    onToggle(value);
  };

  return <Navbar darkMode={darkMode} setDarkMode={handleToggle} />;
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

  it('calls callback and toggles icons', async () => {
    const toggle = vi.fn();
    const { container, getByLabelText } = render(<Wrapper onToggle={toggle} />);

    const button = getByLabelText('Toggle dark mode');
    const moon = container.querySelector('svg.lucide-moon') as SVGElement;
    const sun = container.querySelector('svg.lucide-sun') as SVGElement;

    expect(window.getComputedStyle(moon).display).not.toBe('none');
    expect(window.getComputedStyle(sun).display).toBe('none');

    fireEvent.click(button);

    await waitFor(() => {
      expect(toggle).toHaveBeenCalledWith(true);
    });

    await waitFor(() => {
      expect(window.getComputedStyle(moon).display).toBe('none');
      expect(window.getComputedStyle(sun).display).not.toBe('none');
    });
  });
});
