import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import FinalCTA from './FinalCTA';

const originalClipboard = navigator.clipboard;

const assignClipboard = (writeText: jest.Mock<Promise<void>, [string]>) => {
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    writable: true,
    value: { writeText } as Pick<Clipboard, 'writeText'>,
  });
};

describe('FinalCTA', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
    jest.restoreAllMocks();

    if (originalClipboard) {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        writable: true,
        value: originalClipboard,
      });
    } else {
      delete (navigator as Navigator & { clipboard?: Clipboard }).clipboard;
    }
  });

  it('copies the studio email and resets the copied state after the timeout', async () => {
    const writeText = jest.fn<Promise<void>, [string]>().mockResolvedValue();

    assignClipboard(writeText);
    expect(navigator.clipboard?.writeText).toBe(writeText);

    render(<FinalCTA />);

    const trigger = screen.getByRole('button', { name: /hey@andremarinho.me/i });

    fireEvent.click(trigger);

    expect(writeText).toHaveBeenCalledWith('hey@andremarinho.me');

    await waitFor(() => expect(trigger).toHaveAttribute('title', 'Copied!'));
    expect(trigger.querySelector('path[fill-rule="evenodd"]')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3600);
    });

    await waitFor(() => expect(trigger).toHaveAttribute('title', 'Click to copy email'));
    expect(trigger.querySelector('path[fill-rule="evenodd"]')).not.toBeInTheDocument();
  });

  it('keeps the UI unchanged when the clipboard API rejects', async () => {
    const writeText = jest.fn<Promise<void>, [string]>().mockRejectedValue(new Error('fail'));

    assignClipboard(writeText);
    expect(navigator.clipboard?.writeText).toBe(writeText);

    render(<FinalCTA />);

    const trigger = screen.getByRole('button', { name: /hey@andremarinho.me/i });

    fireEvent.click(trigger);

    expect(writeText).toHaveBeenCalledWith('hey@andremarinho.me');

    await waitFor(() => expect(trigger).toHaveAttribute('title', 'Click to copy email'));
    expect(trigger.querySelector('path[fill-rule="evenodd"]')).not.toBeInTheDocument();
  });
});
