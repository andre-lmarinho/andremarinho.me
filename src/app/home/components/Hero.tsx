import Image from "next/image";

import { TextLink } from "@/components/TextLink";
import { currentJob } from "@/configs/work";

export const Hero = () => {
  return (
    <section id="hero" className="pt-16 md:pt-24">
      <div className="flex justify-between gap-8">
        <div className="space-y-5 sm:max-w-lg">
          <h1 className="flex gap-2">
            <span>Hey! I&apos;m André Marinho</span>
            <span aria-hidden="true" className="animate-wave inline-block origin-[70%_70%]">
              👋🏼
            </span>
          </h1>
          <p>
            I&apos;m a{" "}
            <code className="rounded-sm px-1 font-mono hover:bg-zinc-100 dark:hover:bg-zinc-900">
              {"<Front End Engineer />"}
            </code>{" "}
            based in Salvador. I <TextLink href="https://github.com/andre-lmarinho">code</TextLink>
            {", "}
            <TextLink href="https://travel-planner-orpin.vercel.app/">travel</TextLink>
            {" and run "}
            <TextLink href="/studio">Duonorth Studio</TextLink>.
          </p>
          <p>
            I work where product, UX and analytics meet, turning clean interfaces into measurable results,
            currently at <TextLink href={currentJob.href}>{currentJob.label}</TextLink>.
          </p>
        </div>
        <Image
          alt="André Marinho"
          width={200}
          height={200}
          sizes="(max-width: 640px) 1px, 200px"
          className="hidden h-44 w-44 transform-gpu rounded-full sm:block"
          src="/images/Me.webp"
          loading="lazy"
          fetchPriority="low"
        />
      </div>
    </section>
  );
};
