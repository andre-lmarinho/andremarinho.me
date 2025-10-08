import Image from 'next/image';
import { PageTitle } from '@/components/Heading';

const heroTexts = [
  'I am a Front-End Developer based in Salvador. I create digital experiences that connect design, strategy and business growth.',
  'I run Duonorth Studio, where I turn ideas into products that are fast, meaningful and focused on results.',
] as const;

const waveEmoji = String.fromCodePoint(0x1f44b);

export default function Hero() {
  return (
    <section id="hero" className="mb-20">
      <div className="flex justify-between gap-8">
        <div>
          <PageTitle className="flex gap-2">
            <span>Hey! I&apos;m André Marinho</span>
            <span aria-hidden="true" className="animate-wave inline-block origin-[70%_70%]">
              {waveEmoji}
            </span>
          </PageTitle>
          {heroTexts.map((text) => (
            <p key={text} className="mt-6 sm:max-w-md">
              {text}
            </p>
          ))}
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
