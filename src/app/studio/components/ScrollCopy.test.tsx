import { act, render } from '@testing-library/react';

import ScrollCopy from './ScrollCopy';

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

describe('ScrollCopy', () => {
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
      delete (globalThis as { requestAnimationFrame?: typeof globalThis.requestAnimationFrame }).requestAnimationFrame;
    }

    if (originalCancelAnimationFrame) {
      Object.defineProperty(globalThis, 'cancelAnimationFrame', {
        configurable: true,
        writable: true,
        value: originalCancelAnimationFrame,
      });
    } else {
      delete (globalThis as { cancelAnimationFrame?: typeof globalThis.cancelAnimationFrame }).cancelAnimationFrame;
    }
  });

  it('builds paragraph bridges and keeps connected words in sync', () => {
    const { container } = render(<ScrollCopy baseOpacity={0.2} maxOpacity={0.8} />);

    act(() => {
      flushRaf();
    });

    const paragraphs = container.querySelectorAll('p');
    const firstParagraph = paragraphs[0];
    const secondParagraph = paragraphs[1];

    const firstParagraphWords = firstParagraph.querySelectorAll<HTMLSpanElement>('.sc-word');
    const lastWord = firstParagraphWords[firstParagraphWords.length - 1];
    const nextFirstWord = secondParagraph.querySelector<HTMLSpanElement>('.sc-word');

    expect(lastWord).toBeTruthy();
    expect(nextFirstWord).toBeTruthy();
    expect(lastWord.dataset.scBridgeTarget).toBe(nextFirstWord?.id);
    expect(nextFirstWord?.dataset.scBridgeSource).toBe(lastWord.id);

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

    expect(lastWord.style.opacity).toBe('0.8');
    expect(nextFirstWord?.style.opacity).toBe('0.8');
  });

  it('applies custom opacity thresholds and spacing', () => {
    const { container } = render(
      <ScrollCopy
        baseOpacity={0.25}
        maxOpacity={0.95}
        thresholdRatioStart={0.1}
        thresholdRatioEnd={0.2}
        wordGap={4}
      />
    );

    act(() => {
      flushRaf();
    });

    const words = Array.from(container.querySelectorAll<HTMLSpanElement>('.sc-word'));
    const firstWord = words[0];
    const secondWord = words[1];

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

    expect(firstWord.style.opacity).toBe('0.95');
    expect(secondWord.style.opacity).toBe('0.25');

    const firstParagraph = container.querySelector('p');
    expect(firstParagraph?.style.wordSpacing).toBe('4px');
  });
});
