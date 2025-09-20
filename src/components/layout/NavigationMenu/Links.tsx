import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  links: { href: `/${string}` | `https://${string}`; text: string }[];
  isHamburguer?: boolean;
  onSelect?: () => void;
};

const Links = ({ links, isHamburguer, onSelect }: Props) => {
  const pathname = `/${usePathname()?.split('/')[1] ?? ''}`;
  const isIndeterminate = links.every((l) => l.href !== pathname);
  const handle = onSelect ? () => onSelect() : undefined;

  return (
    <ul
      className={
        isHamburguer
          ? 'm-0 flex h-full flex-1 list-none flex-col items-center justify-center space-y-5 text-2xl'
          : 'group hidden list-none grid-flow-col gap-6 text-sm font-medium sm:grid'
      }
    >
      {links.map(({ href, text }) => {
        const external = href.startsWith('http');
        const isActive = href === pathname;
        const state = isIndeterminate
          ? 'hover:opacity-60'
          : isActive
            ? 'opacity-100'
            : 'opacity-50 hover:opacity-100';
        const className = `transition-opacity ${state}`;

        return (
          <li key={href}>
            {external ? (
              <a
                href={href}
                className={className}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handle}
              >
                {text}
              </a>
            ) : (
              <NextLink
                href={href}
                className={className}
                aria-current={isActive ? 'page' : undefined}
                onClick={handle}
              >
                {text}
              </NextLink>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Links;
