import { render, act, screen } from '@testing-library/react';
import React, { ForwardedRef, HTMLAttributes } from 'react';
import '@testing-library/jest-dom';
import RevealWord from '../RevealWord';

// Mock framer-motion with proper typing and display name
vi.mock('framer-motion', async () => {
  const React = await import('react');

  const MockMotionSpan = React.forwardRef<
    HTMLSpanElement,
    HTMLAttributes<HTMLSpanElement>
  >((props, ref: ForwardedRef<HTMLSpanElement>) => (
    <span ref={ref} {...props} />
  ));

  MockMotionSpan.displayName = 'MockMotionSpan';

  return {
    motion: {
      span: MockMotionSpan,
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

describe('RevealWord', () => {
  let trigger: ((entries: IntersectionObserverEntry[]) => void) | undefined;

  beforeEach(() => {
    trigger = undefined;

    // Proper typing for IntersectionObserver mock
    (
      global as unknown as { IntersectionObserver: typeof IntersectionObserver }
    ).IntersectionObserver = class {
      constructor(cb: (entries: IntersectionObserverEntry[]) => void) {
        trigger = cb;
      }
      observe() {}
      disconnect() {}
    };
  });

  it('wraps highlight word with gradient class', () => {
    render(<RevealWord word="remarkable" index={0} paragraph={4} />);
    const elem = screen.getByText('remarkable');
    expect(elem.className).toContain('gradient-text');
  });

  it('shows icon when intersecting', () => {
    render(<RevealWord word="React" index={2} paragraph={1} />);
    expect(document.querySelector('svg')).toBeNull();

    act(() => {
      trigger?.([{ isIntersecting: true } as IntersectionObserverEntry]);
    });

    expect(document.querySelector('svg')).not.toBeNull();
  });
});
