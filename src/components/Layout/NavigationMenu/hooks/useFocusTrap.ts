"use client";

import type { RefObject } from "react";
import { useEffect } from "react";

const focusableSelector =
  'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void
) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const navEl = ref.current;
    if (!navEl) return;

    const getFocusable = () => Array.from(navEl.querySelectorAll<HTMLElement>(focusableSelector));
    const focusFirst = () => {
      const [first] = getFocusable();
      (first ?? navEl).focus();
    };
    const frameId = requestAnimationFrame(focusFirst);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const els = getFocusable();
      if (els.length === 0) {
        e.preventDefault();
        navEl.focus();
        return;
      }
      const [first] = els;
      const last = els[els.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = active ? navEl.contains(active) : false;
      if (e.shiftKey) {
        if (!inside || active === first) {
          e.preventDefault();
          last.focus();
        }
        return;
      }
      if (!inside || active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, setIsOpen, ref]);
}
