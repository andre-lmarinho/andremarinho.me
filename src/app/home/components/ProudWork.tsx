import Image from 'next/image';
import Link from 'next/link';

export const ProudWork = () => {
  return (
    <section id="proud-work" aria-label="Work I'm proud of" className="pt-12 pb-12">
      <div className="space-y-2">
        <h2>Work I&apos;m Proud Of</h2>
      </div>
      <div className="mr-[45%] -rotate-2 overflow-hidden rounded-xl border border-dashed border-zinc-200 bg-white p-1 shadow-2xl transition-transform ease-out select-none hover:scale-105 hover:rotate-0 dark:border-zinc-800 dark:bg-zinc-900">
        <Link href="/work/turistar">
          <Image
            src="/images/work/turistar-app-mock.webp"
            alt="Board of proud work"
            width={1003}
            height={522}
            className="h-full w-full rounded-xl"
            sizes="(max-width: 768px) 100vw, 80vw"
            loading="lazy"
            priority={false}
          />
        </Link>
      </div>
    </section>
  );
};
