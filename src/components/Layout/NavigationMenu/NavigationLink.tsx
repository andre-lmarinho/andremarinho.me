"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavigationLink } from "./links";

type MenuLinksProps = {
  links: readonly NavigationLink[];
  isHamburger?: boolean;
};

export const MenuLinks = ({ links, isHamburger = false }: MenuLinksProps) => {
  const pathname = `/${usePathname()?.split("/")[1] ?? ""}`;
  const isIndeterminate = links.every((link) => link.href !== pathname);

  return (
    <ul
      className={
        isHamburger
          ? "flex h-full flex-1 flex-col items-center justify-center space-y-5 text-2xl"
          : "group hidden grid-flow-col gap-6 text-sm font-medium sm:grid"
      }>
      {links.map((link) => (
        <li key={link.href}>
          <MenuLink
            href={link.href}
            text={link.text}
            target={link.target}
            isActive={link.href === pathname}
            isIndeterminate={isIndeterminate}
          />
        </li>
      ))}
    </ul>
  );
};

type MenuLinkProps = {
  href: NavigationLink["href"];
  text: string;
  target?: NavigationLink["target"];
  isActive: boolean;
  isIndeterminate: boolean;
};

const MenuLink = ({ href, text, target, isActive, isIndeterminate }: MenuLinkProps) => {
  const className = `${
    isIndeterminate ? "hover:opacity-60" : isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
  } transition-opacity`;

  return (
    <Link
      href={href}
      className={className}
      aria-current={isActive ? "page" : undefined}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}>
      {text}
    </Link>
  );
};
