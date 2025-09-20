'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import cn from '@/utils/cn';

import Hamburger from './Hamburger';
import Links, { type NavLink } from './Links';
import ThemeSelector from './ThemeSelector';

const navLinks: NavLink[] = [
  { text: 'Home', href: '/' },
  { text: 'Studio', href: '/studio' },
  { text: 'About', href: '/about' },
];

const desktopLinks: NavLink[] = navLinks.filter((link) => link.href !== '/');

export default function NavigationMenu() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 bg-white/75 py-2 sm:py-3 dark:bg-zinc-950/75',
        isHamburgerOpen ? '' : 'backdrop-blur-xl'
      )}
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 font-semibold sm:px-4">
        <Link
          className="grid grid-flow-col items-center overflow-hidden rounded-full"
          href="/"
          aria-label="Visit Andre Marinho's website"
        >
          <Image
            alt="Andre Marinho"
            width={32}
            height={32}
            className="rounded-full"
            src="/images/Me.webp"
            sizes="32px"
          />
        </Link>
        <div className="flex flex-row-reverse items-center gap-3 sm:flex-row sm:gap-4">
          <Links links={desktopLinks} variant="desktop" />
          <Hamburger links={navLinks} isOpen={isHamburgerOpen} setIsOpen={setIsHamburgerOpen} />
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
}
