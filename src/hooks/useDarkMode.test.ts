import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import useDarkMode from './useDarkMode';

interface MutableMediaQueryList extends MediaQueryList {
  matches: boolean;
}

describe('useDarkMode', () => {
  let mql: MutableMediaQueryList;
  let listener: ((e: MediaQueryListEvent) => void) | null;

  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');

    listener = null;
    mql = {
      matches: false,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((_, cb) => {
        listener = cb;
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn((e: MediaQueryListEvent) => {
        listener?.(e);
        return true;
      }),
    } as MutableMediaQueryList;

    window.matchMedia = vi.fn().mockReturnValue(mql);
  });

  it('initializes from localStorage when available', () => {
    window.localStorage.setItem('darkMode', 'true');
    const { result } = renderHook(() => useDarkMode());
    expect(result.current[0]).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.body.classList.contains('dark')).toBe(true);
  });

  it('uses provided initial value when no stored preference', () => {
    const { result } = renderHook(() => useDarkMode(false));
    expect(result.current[0]).toBe(false);
  });

  it('toggles dark class on html and body and updates localStorage', () => {
    const { result } = renderHook(() => useDarkMode(false));
    const [, setDarkMode] = result.current;

    act(() => setDarkMode(true));
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.body.classList.contains('dark')).toBe(true);
    expect(window.localStorage.getItem('darkMode')).toBe('true');

    act(() => setDarkMode(false));
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.body.classList.contains('dark')).toBe(false);
    expect(window.localStorage.getItem('darkMode')).toBe('false');
  });

  it('reacts to system color scheme changes', () => {
    const { result } = renderHook(() => useDarkMode());
    expect(result.current[0]).toBe(false);

    act(() => {
      mql.matches = true;
      listener?.({ matches: true } as MediaQueryListEvent);
    });

    expect(result.current[0]).toBe(true);
  });
});
