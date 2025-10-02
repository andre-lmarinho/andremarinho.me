import { act, render } from '@testing-library/react';

import ScrollCopy from '@/app/studio/components/ScrollCopy';
import {
  calculateWordOpacities,
  createBridges,
  tokenize,
} from '@/app/studio/components/scrollCopyUtils';

type FrameCallback = Parameters<typeof requestAnimationFrame>[0];

const originalRequestAnimationFrame = globalThis.requestAnimationFrame;
const originalCancelAnimationFrame = globalThis.cancelAnimationFrame;
const originalInnerHeight = window.innerHeight;

let rafQueue: FrameCallback[] = [];

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

  it('calculates opacities based on word centers and thresholds', () => {
    const centers = [100, 300, 900];
    const viewportHeight = 1000;
    const opacities = calculateWordOpacities(centers, viewportHeight, {
      baseOpacity: 0.25,
      maxOpacity: 0.85,
      thresholdRatioStart: 0.2,
      thresholdRatioEnd: 0.8,
    });

    expect(opacities).toEqual([0.85, 0.85, 0.25]);
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
  });

  it('builds paragraph bridges and synchronises active spans', () => {
    const { container } = render(<ScrollCopy baseOpacity={0.2} maxOpacity={0.8} />);

    const paragraphs = container.querySelectorAll('p');
    const firstParagraph = paragraphs[0];
    const secondParagraph = paragraphs[1];

    const firstParagraphWords = firstParagraph.querySelectorAll<HTMLSpanElement>('.sc-word');
    const lastWord = firstParagraphWords[firstParagraphWords.length - 1];
    const nextFirstWord = secondParagraph.querySelector<HTMLSpanElement>('.sc-word');

    expect(lastWord?.dataset.scBridgeTarget).toBe(nextFirstWord?.id);
    expect(nextFirstWord?.dataset.scBridgeSource).toBe(lastWord?.id);

    const allWords = Array.from(container.querySelectorAll<HTMLSpanElement>('.sc-word'));
    allWords.forEach((word) => {
      if (word === lastWord) {
        word.getBoundingClientRect = () => setRect(100);
      } else if (word === nextFirstWord) {
        word.getBoundingClientRect = () => setRect(900);
      } else {
        word.getBoundingClientRect = () => setRect(1200);
      }
    });

    act(() => {
      window.dispatchEvent(new Event('scroll'));
      flushRaf();
    });

    expect(lastWord?.dataset.scActive).toBe('true');
    expect(nextFirstWord?.dataset.scActive).toBe('true');
  });

  it('applies custom opacity thresholds and spacing variables', () => {
    const { container } = render(
      <ScrollCopy
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
