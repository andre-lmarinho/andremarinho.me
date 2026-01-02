import Image from "next/image";

import type { WorkStoryMetadata } from "@/app/work/shared/types";

type HeroProps = {
  hero: WorkStoryMetadata;
};

export const Hero = ({ hero }: HeroProps) => {
  const meta = [
    { label: "Role", value: hero.role },
    { label: "Time", value: hero.time },
    { label: "Date", value: hero.date },
  ];

  return (
    <section aria-labelledby="turistar-hero-title" className="space-y-8 pt-12">
      <div className="grid gap-10 self-start md:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
        <div className="order-2 space-y-6 sm:max-w-lg md:order-1">
          <h1 id="turistar-hero-title">{hero.title}</h1>
          <p className="text-2xl font-medium tracking-tight sm:text-3xl">{hero.description}</p>

          <div className="grid grid-cols-3 tracking-widest">
            {meta.map((entry) => (
              <div key={entry.label}>
                <span className="font-mono text-xs opacity-70">{entry.label}</span>
                <p>{entry.value}</p>
              </div>
            ))}
          </div>
        </div>
        {hero.image && (
          <div className="order-1 -rotate-2 rounded-xl border border-dashed border-zinc-200 bg-white p-1 shadow-2xl transition-transform ease-out select-none hover:scale-105 hover:rotate-0 md:order-2 lg:-mr-[20%] dark:border-zinc-800 dark:bg-zinc-900">
            <Image
              src={hero.image}
              alt="Board of Turistar App"
              width={1003}
              height={522}
              className="h-full w-full rounded-xl"
              sizes="(max-width: 768px) 100vw, 80vw"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </section>
  );
};
