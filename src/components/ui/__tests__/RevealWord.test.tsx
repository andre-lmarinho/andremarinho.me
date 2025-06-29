import { render, act, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom'; 
import RevealWord from '../RevealWord';

vi.mock('framer-motion', async () => {
  const React = await import('react');
  return {
    motion: {
      span: React.forwardRef((props: any, ref) => <span ref={ref} {...props} />),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe('RevealWord', () => {
  let trigger: ((entries: IntersectionObserverEntry[]) => void) | undefined;

  beforeEach(() => {
    trigger = undefined;
    (global as any).IntersectionObserver = class {
      constructor(cb: any) { trigger = cb; }
      observe() { }
      disconnect() { }
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
