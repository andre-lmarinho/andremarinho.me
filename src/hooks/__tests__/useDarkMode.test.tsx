import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import useDarkMode from '../useDarkMode';

function TestComponent({ initial = false }: { initial?: boolean }) {
  const [dark, setDark] = useDarkMode(initial);
  return (
    <button onClick={() => setDark(!dark)}>{dark ? 'dark' : 'light'}</button>
  );
}

describe('useDarkMode', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
  });

  it('toggles dark class on html and body', () => {
    render(<TestComponent />);
    const btn = screen.getByRole('button');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.body.classList.contains('dark')).toBe(false);
    fireEvent.click(btn);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.body.classList.contains('dark')).toBe(true);
    fireEvent.click(btn);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.body.classList.contains('dark')).toBe(false);
  });

  it('respects initial value', () => {
    render(<TestComponent initial={true} />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.body.classList.contains('dark')).toBe(true);
  });
});
