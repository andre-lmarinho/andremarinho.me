import { vi } from 'vitest';
import themeToggle from './themeToggle';

describe('themeToggle', () => {
  it('enables dark mode when currently disabled', () => {
    const setDarkMode = vi.fn();

    themeToggle({ darkMode: false, setDarkMode });

    expect(setDarkMode).toHaveBeenCalledWith(true);
  });

  it('disables dark mode when currently enabled', () => {
    const setDarkMode = vi.fn();

    themeToggle({ darkMode: true, setDarkMode });

    expect(setDarkMode).toHaveBeenCalledWith(false);
  });
});
