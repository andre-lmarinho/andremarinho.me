import { act, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import useDarkMode from './useDarkMode';

type HookResult<TValue> = {
  current: TValue;
};

type RenderHookResponse<TValue> = {
  result: HookResult<TValue>;
  rerender: () => void;
  cleanup: () => void;
};

const cleanups: Array<() => void> = [];

afterEach(() => {
  while (cleanups.length > 0) {
    cleanups.pop()?.();
  }
});

function renderHook<TValue>(render: () => TValue): RenderHookResponse<TValue> {
  const result: HookResult<TValue> = {
    current: undefined as unknown as TValue,
  };

  const container = document.createElement('div');
  document.body.appendChild(container);

  const root = createRoot(container);

  const TestComponent = () => {
    result.current = render();
    return null;
  };

  const rerender = () => {
    act(() => {
      root.render(createElement(TestComponent));
    });
  };

  rerender();

  const cleanup = () => {
    act(() => {
      root.unmount();
    });
    container.remove();
  };

  cleanups.push(cleanup);

  return { result, rerender, cleanup };
}

interface MutableMediaQueryList extends MediaQueryList {
  matches: boolean;
}

describe('useDarkMode', () => {
  let mql: MutableMediaQueryList;
  let listener: ((e: MediaQueryListEvent) => void) | null;
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');

    listener = null;

    const addEventListener = jest
      .fn((_: string, cb: EventListenerOrEventListenerObject) => {
        listener = cb as (event: MediaQueryListEvent) => void;
      })
      .mockName('addEventListener');

    mql = {
      matches: false,
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: addEventListener as unknown as MediaQueryList['addEventListener'],
      removeEventListener: jest.fn() as unknown as MediaQueryList['removeEventListener'],
      dispatchEvent: jest.fn((event: MediaQueryListEvent) => {
        listener?.(event);
        return true;
      }),
    } as MutableMediaQueryList;

    window.matchMedia = jest.fn().mockReturnValue(mql);
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
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
