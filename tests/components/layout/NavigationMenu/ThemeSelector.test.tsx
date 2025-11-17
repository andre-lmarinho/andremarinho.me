import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { UseThemeProps } from 'next-themes';
import { ThemeSelector } from '@/components/layout/NavigationMenu/ThemeSelector';

const useThemeMock = jest.fn<UseThemeProps, []>();

jest.mock('next-themes', () => ({
  useTheme: () => useThemeMock(),
}));

describe('ThemeSelector', () => {
  beforeEach(() => {
    useThemeMock.mockReset();
  });

  it('requests dark mode when the current theme is resolved to light', async () => {
    const setTheme = jest.fn();
    useThemeMock.mockReturnValue({
      themes: [],
      setTheme: setTheme as UseThemeProps['setTheme'],
      resolvedTheme: 'light',
    });

    render(<ThemeSelector />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /toggle dark mode/i }));

    expect(setTheme).toHaveBeenCalledTimes(1);
    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('requests light mode when the current theme is resolved to dark', async () => {
    const setTheme = jest.fn();
    useThemeMock.mockReturnValue({
      themes: [],
      setTheme: setTheme as UseThemeProps['setTheme'],
      resolvedTheme: 'dark',
    });

    render(<ThemeSelector />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /toggle dark mode/i }));

    expect(setTheme).toHaveBeenCalledTimes(1);
    expect(setTheme).toHaveBeenCalledWith('light');
  });
});
