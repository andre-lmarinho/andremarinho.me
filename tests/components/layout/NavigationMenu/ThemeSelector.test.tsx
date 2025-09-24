import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { UseThemeProps } from 'next-themes';

import ThemeSelector from '@/components/layout/NavigationMenu/ThemeSelector';

const useThemeMock = jest.fn<UseThemeProps, []>();

jest.mock('next-themes', () => ({
  useTheme: () => useThemeMock(),
}));

describe('ThemeSelector', () => {
  beforeEach(() => {
    useThemeMock.mockReset();
  });

  it('requests dark mode when the current theme is light', async () => {
    const setTheme = jest.fn<
      ReturnType<UseThemeProps['setTheme']>,
      Parameters<UseThemeProps['setTheme']>
    >();
    useThemeMock.mockReturnValue({ themes: [], resolvedTheme: 'light', setTheme });

    const user = userEvent.setup();
    render(<ThemeSelector />);

    await user.click(screen.getByRole('button', { name: /toggle dark mode/i }));

    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('requests light mode when the current theme is dark', async () => {
    const setTheme = jest.fn<
      ReturnType<UseThemeProps['setTheme']>,
      Parameters<UseThemeProps['setTheme']>
    >();
    useThemeMock.mockReturnValue({ themes: [], resolvedTheme: 'dark', setTheme });

    const user = userEvent.setup();
    render(<ThemeSelector />);

    await user.click(screen.getByRole('button', { name: /toggle dark mode/i }));

    expect(setTheme).toHaveBeenCalledWith('light');
  });
});
