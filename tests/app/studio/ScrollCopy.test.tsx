import { act, render } from '@testing-library/react';

import {
  ScrollFadeText,
  createBridges,
  tokenize,
} from '@/app/studio/components/effects/ScrollFadeText';

type FrameCallback = Parameters<typeof requestAnimationFrame>[0];

const originalRequestAnimationFrame = globalThis.requestAnimationFrame;
const originalCancelAnimationFrame = globalThis.cancelAnimationFrame;
const originalInnerHeight = window.innerHeight;
const originalResizeObserver = globalThis.ResizeObserver;

let rafQueue: FrameCallback[] = [];

class ResizeObserverMock {
  callback: ResizeObserverCallback;
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  trigger(entries: ResizeObserverEntry[] = []) {
    this.callback(entries, this as unknown as ResizeObserver);
  }
}

const flushRaf = () => {
  const callbacks = [...rafQueue];
  rafQueue = [];
  callbacks.forEach((cb) => cb(0));
};

const setRect = (top: number): DOMRect => ({
  top,
  bottom: top + 20,
  height: 20,
  left: 0,
  right: 0,
  width: 0,
  x: 0,
  y: top,
  toJSON: () => ({}),
});

describe('scrollCopyUtils', () => {
  it('tokenizes paragraphs into words preserving punctuation', () => {
    expect(tokenize('Hello, world!  This is duonorth.')).toEqual([
      'Hello,',
      'world!',
      'This',
      'is',
      'duonorth.',
    ]);
  });

  it('creates bridges linking paragraph boundaries', () => {
    const bridges = createBridges([['p0w0', 'p0w1'], [], ['p2w0', 'p2w1'], ['p3w0']]);

    expect(bridges).toEqual([
      { fromId: 'p0w1', toId: 'p2w0' },
      { fromId: 'p2w1', toId: 'p3w0' },
    ]);
  });
});

describe('ScrollCopy component', () => {
  beforeEach(() => {
    rafQueue = [];

    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      writable: true,
      value: 1000,
    });

    const rafMock = jest.fn<number, [FrameCallback]>((cb) => {
      rafQueue.push(cb);
      return rafQueue.length;
    });
    const cancelMock = jest.fn<void, [number]>((id) => {
      rafQueue[id - 1] = () => undefined;
    });

    Object.defineProperty(globalThis, 'requestAnimationFrame', {
      configurable: true,
      writable: true,
      value: rafMock,
    });
    Object.defineProperty(globalThis, 'cancelAnimationFrame', {
      configurable: true,
      writable: true,
      value: cancelMock,
    });

    Object.defineProperty(globalThis, 'ResizeObserver', {
      configurable: true,
      writable: true,
      value: jest
        .fn((cb: ResizeObserverCallback) => new ResizeObserverMock(cb) as unknown as ResizeObserver)
        .mockName('ResizeObserverMock') as unknown as typeof ResizeObserver,
    });
  });

  afterEach(() => {
    rafQueue = [];

    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      writable: true,
      value: originalInnerHeight,
    });

    if (originalRequestAnimationFrame) {
      Object.defineProperty(globalThis, 'requestAnimationFrame', {
        configurable: true,
        writable: true,
        value: originalRequestAnimationFrame,
      });
    } else {
      delete (globalThis as { requestAnimationFrame?: typeof globalThis.requestAnimationFrame })
        .requestAnimationFrame;
    }

    if (originalCancelAnimationFrame) {
      Object.defineProperty(globalThis, 'cancelAnimationFrame', {
        configurable: true,
        writable: true,
        value: originalCancelAnimationFrame,
      });
    } else {
      delete (globalThis as { cancelAnimationFrame?: typeof globalThis.cancelAnimationFrame })
        .cancelAnimationFrame;
    }

    if (originalResizeObserver) {
      Object.defineProperty(globalThis, 'ResizeObserver', {
        configurable: true,
        writable: true,
        value: originalResizeObserver,
      });
    } else {
      delete (globalThis as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver;
    }
  });

  it('builds paragraph bridges and synchronises active spans', () => {
    const paragraphs = ['This is a content test.', 'Another paragraph right after.'];
    const getBoundingRectSpy = jest
      .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
      .mockImplementation(() => setRect(1200));

    try {
      const { container } = render(
        <ScrollFadeText content={paragraphs} baseOpacity={0.2} maxOpacity={0.8} />
      );

      const renderedParagraphs = container.querySelectorAll('p');
      const firstParagraph = renderedParagraphs[0];
      const secondParagraph = renderedParagraphs[1];

      const firstParagraphWords = firstParagraph.querySelectorAll<HTMLSpanElement>('.sc-word');
      const lastWord = firstParagraphWords[firstParagraphWords.length - 1];
      const nextFirstWord = secondParagraph.querySelector<HTMLSpanElement>('.sc-word');

      const allWords = Array.from(container.querySelectorAll<HTMLSpanElement>('.sc-word'));
      allWords.forEach((word) => {
        if (firstParagraph.contains(word)) {
          word.getBoundingClientRect = () => setRect(100);
        } else if (word === nextFirstWord) {
          word.getBoundingClientRect = () => setRect(900);
        } else {
          word.getBoundingClientRect = () => setRect(1200);
        }
      });

      act(() => {
        window.dispatchEvent(new Event('resize'));
        flushRaf();
      });

      act(() => {
        window.dispatchEvent(new Event('scroll'));
        flushRaf();
      });

      expect(lastWord?.dataset.scActive).toBe('true');
      expect(nextFirstWord?.dataset.scActive).toBe('true');
    } finally {
      getBoundingRectSpy.mockRestore();
    }
  });

  it('applies custom opacity thresholds and spacing variables', () => {
    const { container } = render(
      <ScrollFadeText
        content={['This is a sample paragraph for custom styling.']}
        baseOpacity={0.25}
        maxOpacity={0.95}
        thresholdRatioStart={0.1}
        thresholdRatioEnd={0.2}
        wordGap={4}
      />
    );

    const root = container.firstChild as HTMLElement;
    expect(root.style.getPropertyValue('--scroll-copy-base-opacity')).toBe('0.25');
    expect(root.style.getPropertyValue('--scroll-copy-max-opacity')).toBe('0.95');
    expect(root.style.getPropertyValue('--scroll-copy-word-gap')).toBe('4px');

    const words = Array.from(container.querySelectorAll<HTMLSpanElement>('.sc-word'));
    const [firstWord, secondWord] = words;

    words.forEach((word, index) => {
      if (index === 0) {
        word.getBoundingClientRect = () => setRect(20);
      } else {
        word.getBoundingClientRect = () => setRect(600);
      }
    });

    act(() => {
      window.dispatchEvent(new Event('resize'));
      flushRaf();
    });

    expect(firstWord?.dataset.scActive).toBe('true');
    expect(secondWord?.dataset.scActive).toBe('false');
  });
});
