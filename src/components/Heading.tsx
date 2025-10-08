import type { ReactNode } from 'react';

import cn from '@/utils/cn';

type TitleProps = {
  children: ReactNode;
  className?: string;
};

const PageTitle = ({ children, className }: TitleProps) => (
  <h1 className={cn('text-3xl font-bold tracking-tight sm:text-4xl', className)}>{children}</h1>
);

const SectionTitle = ({ children, className }: TitleProps) => (
  <h2 className={cn('my-6 block text-xl font-semibold', className)}>{children}</h2>
);

export { PageTitle, SectionTitle };
