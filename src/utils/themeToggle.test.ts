import { vi } from 'vitest';
import themeToggle from './themeToggle';

describe('themeToggle', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
    document.body.innerHTML = '';
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runAllTimers();
    vi.useRealTimers();
  });

  it('toggles dark mode', () => {
    const button = document.createElement('button');
    document.body.appendChild(button);
    const setDarkMode = vi.fn();

    themeToggle({ button, darkMode: false, setDarkMode, shouldReduceMotion: true });

    expect(setDarkMode).toHaveBeenCalledWith(true);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.body.classList.contains('dark')).toBe(false);
  });

  it('cleans up previous overlay on subsequent calls', () => {
    const button = document.createElement('button');
    document.body.appendChild(button);
    const setDarkMode = vi.fn();

    themeToggle({ button, darkMode: false, setDarkMode, shouldReduceMotion: true });
    const overlay = document.body.lastElementChild as HTMLElement;
    expect(overlay).toBeTruthy();
    expect(document.body.classList.contains('dark')).toBe(false);

    themeToggle({ button, darkMode: true, setDarkMode, shouldReduceMotion: true });
    expect(overlay.isConnected).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.body.classList.contains('dark')).toBe(false);
    expect(setDarkMode).toHaveBeenNthCalledWith(1, true);
    expect(setDarkMode).toHaveBeenNthCalledWith(2, false);
  });
});
