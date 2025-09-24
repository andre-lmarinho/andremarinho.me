import { render, screen, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';

import { Providers } from '@/app/providers';

type ThemeProviderProps = { children: ReactNode } & Record<string, unknown>;

const themeProviderMock = jest.fn(({ children }: ThemeProviderProps) => (
  <div data-testid="theme-provider">{children}</div>
));

jest.mock('next-themes', () => ({
  ThemeProvider: (props: ThemeProviderProps) => themeProviderMock(props),
}));

describe('Providers', () => {
  beforeEach(() => {
    themeProviderMock.mockClear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('clears the legacy dark mode key and forwards configuration to next-themes', async () => {
    const removeSpy = jest.spyOn(Storage.prototype, 'removeItem');

    render(
      <Providers>
        <span>content</span>
      </Providers>
    );

    await waitFor(() => expect(removeSpy).toHaveBeenCalledWith('darkMode'));

    expect(themeProviderMock).toHaveBeenCalled();
    const props = themeProviderMock.mock.calls[0][0];
    expect(props.attribute).toBe('class');
    expect(props.storageKey).toBe('theme');

    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
