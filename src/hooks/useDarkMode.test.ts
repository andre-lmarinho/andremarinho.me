import { renderHook, act } from '@testing-library/react';
import useDarkMode from './useDarkMode';

describe('useDarkMode', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
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
});
