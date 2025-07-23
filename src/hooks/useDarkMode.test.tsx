import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useDarkMode from './useDarkMode';

function TestComponent({ initial = false }: { initial?: boolean }) {
  const [dark, setDark] = useDarkMode(initial);
  return <button onClick={() => setDark(!dark)}>{dark ? 'dark' : 'light'}</button>;
}

describe('useDarkMode', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
    localStorage.clear();
  });

  it('toggles dark class on html and body', async () => {
    render(<TestComponent />);
    const btn = screen.getByRole('button');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.body.classList.contains('dark')).toBe(false);
    await userEvent.click(btn);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.body.classList.contains('dark')).toBe(true);
    await userEvent.click(btn);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.body.classList.contains('dark')).toBe(false);
  });

  it('respects initial value', () => {
    render(<TestComponent initial={true} />);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.body.classList.contains('dark')).toBe(true);
  });
});
