import Image, { type StaticImageData } from 'next/image';

import home from './images/home.webp';
import homeMobile from './images/home-mobile.webp';
import planner from './images/planner.webp';
import plannerMobile from './images/planner-mobile.webp';
import budget from './images/budget.webp';
import budgetMobile from './images/budget-mobile.webp';

const SIGN = 'Made by andremarinho.me.';

const IMAGES: ReadonlyArray<{ src: StaticImageData; alt: string }> = [
  {
    src: home,
    alt: 'A screenshot of a travel planning website homepage highlighting a hero section with a clear value proposition, primary call-to-action, feature highlights, and social proof.',
  },
  {
    src: homeMobile,
    alt: 'A mobile screenshot of the travel planning website homepage showcasing the hero, concise copy, and stacked calls-to-action optimized for small screens.',
  },
  {
    src: planner,
    alt: 'A screenshot of a travel planning web application home showing an itinerary overview with upcoming trip cards, a map preview, and quick actions to add days, activities, and notes.',
  },
  {
    src: plannerMobile,
    alt: 'A mobile screenshot of the travel planning web application home with a scrollable itinerary, compact trip cards, and quick-add actions.',
  },
  {
    src: budget,
    alt: 'A screenshot of the travel planning web application Budget feature with expense categories, totals by traveler, and a spending-over-time chart.',
  },
  {
    src: budgetMobile,
    alt: 'A mobile screenshot of the Budget feature showing categorized expenses, per-traveler totals, and a compact summary for quick review.',
  },
];

export const Work = () => (
  <section id="work" className="full-width">
    <div className="page-content" aria-labelledby="work-title" aria-describedby="work-credit">
      <h2 id="work-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
        Work
      </h2>
      <p id="work-credit" className="sr-only">
        {SIGN}
      </p>
    </div>

    <div className="h-[328px] md:h-[544px]">
      <div className="scrollbar-hidden absolute right-0 left-0 flex scroll-pl-4 gap-4 overflow-x-auto">
        {IMAGES.map(({ src, alt }, i) => (
          <figure key={i} className="flex-none snap-start first:pl-6 last:pr-6">
            <Image
              className="pointer-events-none mb-1 block h-[328px] w-auto rounded-xl shadow-sm select-none md:h-[544px] dark:border dark:border-neutral-800 dark:shadow-none"
              alt={alt}
              src={src}
              width={src.width}
              height={src.height}
              decoding="async"
              draggable={false}
            />
            <figcaption className="sr-only">{SIGN}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);
