import Image from 'next/image';

import { TextLink } from '@/components/TextLink';

export const Hero = () => {
  return (
    <section id="hero" className="pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="flex justify-between gap-8">
        <div>
          <h1 className="flex gap-2">
            <span>Hey! I&apos;m André Marinho</span>
            <span aria-hidden="true" className="animate-wave inline-block origin-[70%_70%]">
              👋🏼
            </span>
          </h1>
          <div className="space-y-5">
            <p className="sm:max-w-md">
              I&apos;m a Front End Developer based in Salvador. I{' '}
              <TextLink href="https://github.com/andre-lmarinho">code</TextLink>
              {', '}
              <TextLink href="https://travel-planner-orpin.vercel.app/">travel</TextLink>
              {' and run '}
              <TextLink href="/studio">Duenorth Studio</TextLink>.
            </p>

            <p className="sm:max-w-md">
              I work where product, UX and analytics meet, turning clean interfaces into measurable
              results, currently at <TextLink href="/studio">Duenorth</TextLink>.
            </p>
          </div>
        </div>
        <Image
          alt="André Marinho"
          width={176}
          height={176}
          sizes="176px"
          className="hidden h-44 w-44 transform-gpu rounded-full sm:block"
          src="/images/Me.webp"
          priority
        />
      </div>
    </section>
  );
};
