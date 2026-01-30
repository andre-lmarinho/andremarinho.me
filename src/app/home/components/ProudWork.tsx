import Image from "next/image";
import Link from "next/link";

export const ProudWork = () => {
  return (
    <section id="proud-work" aria-label="Work I'm proud of">
      <h2>Work I&apos;m Proud Of</h2>
      <Link
        href="/work/turistar"
        className="group block mr-[20%] sm:mr-[45%] transition-colors outline-none rounded-xl">
        <div className="p-1 px-2 space-y-1 flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 transition-colors outline-none hover:bg-zinc-100 focus-visible:border-zinc-300 focus-visible:bg-zinc-100 active:bg-zinc-100 lg:group-hover/list:opacity-50 lg:hover:opacity-100 dark:border-zinc-800 dark:hover:bg-zinc-900 dark:focus-visible:border-zinc-700 dark:focus-visible:bg-zinc-900 dark:active:bg-zinc-900">
          <div className="px-2 py-3">
            <p className="text-sm opacity-70 font-mono">Next.js, Supabase, Vercel</p>
          </div>

          <Image
            src="/images/projects/turistar-app-mock.webp"
            alt="Board of proud work"
            width={1003}
            height={522}
            className="w-full rounded-xl"
            sizes="(max-width: 640px) calc(45vw - 1.1rem), (max-width: 928px) calc(55vw - 1.1rem), 492px"
            loading="lazy"
          />

          <div className="flex justify-between items-center gap-2 px-2 py-3">
            <p className="font-semibold max-w-[66%]">
              Making your planning easier so you can focus on what matters most
            </p>
            <span className="hidden text-xl opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 md:block">
              →
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
};
