import { render, act, screen } from '@testing-library/react';
import { ForwardedRef, HTMLAttributes } from 'react';
import '@testing-library/jest-dom';
import RevealWord from '../RevealWord';

function IconMock(props: React.SVGProps<SVGSVGElement>) {
  return <svg {...props} />;
}
IconMock.displayName = 'IconMock';

// Mock framer-motion with proper typing and display name
vi.mock('framer-motion', async () => {
  const React = await import('react');

  const MockMotionSpan = React.forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
    (props, ref: ForwardedRef<HTMLSpanElement>) => <span ref={ref} {...props} />
  );

  MockMotionSpan.displayName = 'MockMotionSpan';

  return {
    motion: {
      span: MockMotionSpan,
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

vi.mock('../../data/about', async () => {
  const actual = await vi.importActual<typeof import('../../data/about')>('../../data/about');
  return {
    ...actual,
    iconMap: {
      react: { icon: IconMock, color: '#000' },
      typescript: { icon: IconMock, color: '#000' },
      nextjs: { icon: IconMock, color: '#000' },
    },
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
    render(
      <RevealWord word="remarkable" index={0} paragraph={2} globalIndex={0} revealIndex={0} />
    );
    const elem = screen.getByText('remarkable');
    expect(elem.className).toContain('bg-gradient-to-r');
  });

  it.skip('shows icon when intersecting', () => {
    render(<RevealWord word="React" index={2} paragraph={1} globalIndex={0} revealIndex={0} />);
    expect(document.querySelector('svg')).toBeNull();

    act(() => {
      trigger?.([{ isIntersecting: true } as IntersectionObserverEntry]);
    });

    expect(document.querySelector('svg')).not.toBeNull();
  });
});
