import type { ComponentPropsWithoutRef } from 'react';

import cn from '@/utils/cn';

type SectionProps = ComponentPropsWithoutRef<'section'>;

const Section = ({ className, ...props }: SectionProps) => (
  <section {...props} className={cn('mx-auto my-12 max-w-4xl px-6 pb-16 sm:px-4', className)} />
);

export default Section;
