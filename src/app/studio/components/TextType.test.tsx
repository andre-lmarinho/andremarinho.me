import { act, render, screen } from '@testing-library/react';

import TextType from './TextType';

describe('TextType', () => {
  const advanceUntilTextIs = (expected: string) => {
    const element = screen.getByTestId('typer');

    for (let i = 0; i < 50; i += 1) {
      if (element.textContent === expected) {
        break;
      }

      act(() => {
        jest.advanceTimersByTime(10);
      });
    }

    expect(element.textContent).toBe(expected);
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('types and cycles through provided texts', () => {
    render(
      <TextType texts={['dev', 'ops']} typingDelay={10} pauseDuration={20} data-testid="typer" />
    );

    const element = screen.getByTestId('typer');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('');

    advanceUntilTextIs('d');
    advanceUntilTextIs('dev');
    advanceUntilTextIs('');
    advanceUntilTextIs('o');
  });
});
