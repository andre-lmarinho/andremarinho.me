import { render, screen } from '@testing-library/react';
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

  it('forwards configuration to next-themes without mutating legacy keys', () => {
    const removeSpy = jest.spyOn(Storage.prototype, 'removeItem');
    render(
      <Providers>
        <span>content</span>
      </Providers>
    );

    expect(themeProviderMock).toHaveBeenCalled();
    const props = themeProviderMock.mock.calls[0][0];
    expect(props.attribute).toBe('class');
    expect(props.storageKey).toBe('theme');

    expect(removeSpy).not.toHaveBeenCalled();

    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
