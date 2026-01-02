"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { CloseIcon } from "@/components/icons/CloseIcon";
import { MenuIcon } from "@/components/icons/MenuIcon";
import { useFocusTrap } from "./hooks/useFocusTrap";
import { NAV_LINKS } from "./links";
import { MenuLinks } from "./NavigationLink";

const buttonClassName =
  "inline-flex items-center justify-center rounded-lg p-2 text-zinc-900 transition-colors hover:text-zinc-600 focus-visible:ring-1 focus-visible:ring-neutral-300 dark:text-zinc-100 dark:hover:text-zinc-300 dark:focus-visible:ring-neutral-500";

export const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const dialogId = useId();
  const labelId = useId();

  useFocusTrap(navRef, isOpen, setIsOpen);

  const findAnchor = (target: EventTarget | null) =>
    (target as HTMLElement | null)?.closest<HTMLAnchorElement>("a");

  const handleNavClick = (event: MouseEvent<HTMLElement>) => {
    if (findAnchor(event.target)) {
      setIsOpen(false);
    }
  };

  const handleNavKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    if (findAnchor(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return (
    <div className="sm:hidden">
      <button
        aria-label="Open navigation menu"
        aria-controls={isOpen ? dialogId : undefined}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}
        className={buttonClassName}
        type="button">
        <MenuIcon />
      </button>

      {isOpen
        ? createPortal(
            <nav
              ref={navRef}
              className="fixed inset-0 z-50 bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100"
              role="dialog"
              aria-modal="true"
              aria-labelledby={labelId}
              id={dialogId}
              tabIndex={-1}
              onClick={handleNavClick}
              onKeyDown={handleNavKeyDown}>
              <h2 id={labelId} className="sr-only">
                Mobile navigation menu
              </h2>
              <div className="absolute right-0 px-6 py-2">
                <button
                  aria-label="Close navigation menu"
                  onClick={() => setIsOpen(false)}
                  className={buttonClassName}
                  type="button">
                  <CloseIcon />
                </button>
              </div>

              <MenuLinks isHamburger links={NAV_LINKS.mobile} />
            </nav>,
            document.body
          )
        : null}
    </div>
  );
};
