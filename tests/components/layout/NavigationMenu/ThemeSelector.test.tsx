import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeSelector } from '@/components/layout/NavigationMenu/ThemeSelector';

const useThemeMock = jest.fn();

jest.mock('next-themes', () => ({
  useTheme: () => useThemeMock(),
}));

describe('ThemeSelector', () => {
  beforeEach(() => {
    useThemeMock.mockReset();
    document.documentElement.classList.remove('dark');
  });

  it('requests dark mode when the current theme (via <html>) is light', async () => {
    const setTheme = jest.fn();
    useThemeMock.mockReturnValue({ setTheme });

    document.documentElement.classList.remove('dark');

    render(<ThemeSelector />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /toggle dark mode/i }));

    expect(setTheme).toHaveBeenCalledTimes(1);
    expect(setTheme).toHaveBeenCalledWith('dark');
  });

  it('requests light mode when the current theme (via <html>) is dark', async () => {
    const setTheme = jest.fn();
    useThemeMock.mockReturnValue({ setTheme });

    document.documentElement.classList.add('dark');

    render(<ThemeSelector />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /toggle dark mode/i }));

    expect(setTheme).toHaveBeenCalledTimes(1);
    expect(setTheme).toHaveBeenCalledWith('light');
  });
});
