import Image from 'next/image';
import A from '@/components/Link';
import { PageTitle } from '@/components/Heading';

export default function Hero() {
  return (
    <section id="hero" className="pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="flex justify-between gap-8">
        <div>
          <PageTitle className="flex gap-2">
            <span>Hey! I&apos;m André Marinho</span>
            <span aria-hidden="true" className="animate-wave inline-block origin-[70%_70%]">
              👋🏼
            </span>
          </PageTitle>
          <div className="space-y-5">
            <p className="sm:max-w-md">
              I&apos;m a Front End Developer based in Salvador. I{' '}
              <A href="https://github.com/andre-lmarinho">code</A>,{' '}
              <A href="https://travel-planner-orpin.vercel.app/">travel</A> and run{' '}
              <A href="/studio">Duenorth Studio</A>.
            </p>

            <p className="sm:max-w-md">
              I work where product, UX and analytics meet, turning clean interfaces into measurable
              results, currently at <A href="/studio">Duenorth</A>.
            </p>
          </div>
        </div>
        <Image
          alt="André Marinho"
          width={176}
          height={176}
          className="hidden h-44 w-44 transform-gpu rounded-full sm:block"
          src="/images/Me.webp"
          sizes="176px"
          priority
        />
      </div>
    </section>
  );
}
