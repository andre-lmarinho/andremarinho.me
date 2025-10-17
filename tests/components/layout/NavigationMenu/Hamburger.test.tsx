import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { useState } from 'react';

import { Hamburger } from '@/components/layout/NavigationMenu/Hamburger';

type NextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function MockLink({ href, children, ...rest }: NextLinkProps) {
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}

const usePathnameMock = jest.fn<string | null, []>(() => '/');

jest.mock('next/navigation', () => ({
  usePathname: () => usePathnameMock(),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: MockLink,
}));

type RequestAnimationFrameType = typeof globalThis.requestAnimationFrame;
const originalRequestAnimationFrame: RequestAnimationFrameType | undefined =
  globalThis.requestAnimationFrame;
const originalCancelAnimationFrame: typeof globalThis.cancelAnimationFrame | undefined =
  globalThis.cancelAnimationFrame;

const createTestHarness = () => {
  function Harness() {
    const [isOpen, setIsOpen] = useState(false);
    return <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />;
  }

  return Harness;
};

describe('Hamburger', () => {
  beforeEach(() => {
    usePathnameMock.mockReset();
    usePathnameMock.mockImplementation(() => '/');
    document.body.style.overflow = '';

    const rafMock: RequestAnimationFrameType = ((callback: FrameRequestCallback) => {
      callback(0);
      return 1;
    }) as RequestAnimationFrameType;

    const cancelMock: typeof globalThis.cancelAnimationFrame = (() =>
      undefined) as typeof globalThis.cancelAnimationFrame;

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
    document.body.style.overflow = '';

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

  it('opens the menu and closes when clicking the active route', async () => {
    const user = userEvent.setup();
    const Harness = createTestHarness();
    render(<Harness />);

    const toggle = screen.getByRole('button', { name: /open navigation menu/i });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(toggle);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');

    const activeLink = screen.getByRole('link', { name: 'Home' });
    expect(activeLink).toHaveAttribute('aria-current', 'page');

    await user.click(activeLink);

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(document.body.style.overflow).toBe('');
  });

  it('closes the menu when Escape is pressed', async () => {
    const user = userEvent.setup();
    const Harness = createTestHarness();
    render(<Harness />);

    await user.click(screen.getByRole('button', { name: /open navigation menu/i }));
    expect(document.body.style.overflow).toBe('hidden');

    await user.keyboard('{Escape}');

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(document.body.style.overflow).toBe('');
  });

  it('closes automatically when the route changes', async () => {
    let currentPath = '/';
    usePathnameMock.mockImplementation(() => currentPath);

    const user = userEvent.setup();
    const Harness = createTestHarness();
    const { rerender } = render(<Harness />);

    await user.click(screen.getByRole('button', { name: /open navigation menu/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(document.body.style.overflow).toBe('hidden');

    currentPath = '/studio';
    rerender(<Harness />);

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    expect(document.body.style.overflow).toBe('');
  });

  it('keeps keyboard focus within the navigation when open', async () => {
    const user = userEvent.setup();
    const Harness = createTestHarness();
    render(<Harness />);

    await user.click(screen.getByRole('button', { name: /open navigation menu/i }));

    const closeButton = screen.getByRole('button', { name: /close navigation menu/i });
    await waitFor(() => expect(closeButton).toHaveFocus());

    await user.keyboard('{Shift>}{Tab}{/Shift}');
    const aboutLink = screen.getByRole('link', { name: 'About' });
    await waitFor(() => expect(aboutLink).toHaveFocus());

    await user.keyboard('{Tab}');
    await waitFor(() => expect(closeButton).toHaveFocus());
  });
});
