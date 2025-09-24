import { act, render, waitFor } from '@testing-library/react';

import TextType from './TextType';

const originalAnimate = HTMLElement.prototype.animate;

const flushPending = () => {
  act(() => {
    jest.runOnlyPendingTimers();
  });
};

const advanceTimers = (ms: number) => {
  act(() => {
    jest.advanceTimersByTime(ms);
  });
};

describe('TextType', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
    jest.restoreAllMocks();

    if (originalAnimate) {
      Object.defineProperty(HTMLElement.prototype, 'animate', {
        configurable: true,
        writable: true,
        value: originalAnimate,
      });
    } else {
      delete (HTMLElement.prototype as { animate?: typeof HTMLElement.prototype.animate }).animate;
    }
  });

  it('cycles through typing, pausing and deleting phases when multiple strings are provided', () => {
    const { container } = render(
      <TextType
        text={['Hi', 'Bye']}
        typingSpeed={10}
        deletingSpeed={10}
        pauseDuration={20}
      />
    );

    const textSpan = () => container.querySelector<HTMLSpanElement>('span.inline');
    expect(textSpan()?.textContent).toBe('');

    flushPending();

    advanceTimers(10);
    expect(textSpan()?.textContent).toBe('H');

    advanceTimers(10);
    expect(textSpan()?.textContent).toBe('Hi');

    advanceTimers(20);
    advanceTimers(10);
    expect(textSpan()?.textContent).toBe('H');

    advanceTimers(10);
    expect(textSpan()?.textContent).toBe('');

    advanceTimers(10);
    expect(textSpan()?.textContent).toBe('B');

    advanceTimers(10);
    expect(textSpan()?.textContent).toBe('By');

    advanceTimers(10);
    expect(textSpan()?.textContent).toBe('Bye');
  });

  it('stops after typing once when looping is disabled', () => {
    const { container } = render(
      <TextType text="Done" typingSpeed={10} loop={false} />
    );

    const textSpan = () => container.querySelector<HTMLSpanElement>('span.inline');

    flushPending();

    advanceTimers(10);
    expect(textSpan()?.textContent).toBe('D');

    advanceTimers(10);
    expect(textSpan()?.textContent).toBe('Do');

    advanceTimers(10);
    expect(textSpan()?.textContent).toBe('Don');

    advanceTimers(10);
    expect(textSpan()?.textContent).toBe('Done');

    advanceTimers(1000);
    expect(textSpan()?.textContent).toBe('Done');
  });

  it('hides the cursor while typing and renders custom characters', () => {
    const { container } = render(
      <TextType
        text="OK"
        typingSpeed={10}
        loop={false}
        hideCursorWhileTyping
        cursorCharacter="|"
      />
    );

    const cursor = () => container.querySelector<HTMLSpanElement>('span.inline-block');

    flushPending();
    advanceTimers(10);
    expect(cursor()).toHaveClass('hidden');

    advanceTimers(10);
    expect(cursor()).not.toHaveClass('hidden');
    expect(cursor()?.textContent).toBe('|');
  });

  it('animates the cursor when the feature is enabled', async () => {
    const cancel = jest.fn();
    const animateMock = jest.fn(() => ({ cancel }));

    Object.defineProperty(HTMLElement.prototype, 'animate', {
      configurable: true,
      writable: true,
      value: animateMock,
    });

    const { container } = render(<TextType text="Animate" typingSpeed={5} />);
    const cursor = container.querySelector<HTMLSpanElement>('span.inline-block');
    expect(cursor).not.toBeNull();

    await waitFor(() => expect(animateMock).toHaveBeenCalledTimes(1));

    expect(cursor?.style.opacity).toBe('1');
    expect(animateMock.mock.calls[0]?.[0]).toEqual([{ opacity: 1 }, { opacity: 0 }]);
    expect(animateMock.mock.calls[0]?.[1]).toMatchObject({
      duration: expect.any(Number),
      iterations: Infinity,
    });
  });
});
