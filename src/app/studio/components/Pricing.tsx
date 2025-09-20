interface PricingCardProps {
  tier: string;
  price: string;
  description: string;
  features?: string[];
}

const PricingCard = ({ tier, price, description, features = [] }: PricingCardProps) => (
  <div className="relative rounded-3xl border border-zinc-200 p-10 dark:border-zinc-800">
    <h3 className="text-lg font-semibold">{tier}</h3>
    <p className="mt-4 mb-6 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
    <p className="text-xs text-zinc-600 dark:text-zinc-400">Starting at</p>
    <p className="mb-6 flex items-baseline gap-1 text-zinc-900 dark:text-zinc-100">
      <span className="text-3xl font-bold">{price}</span>
      {price !== 'Custom' && <span className="text-zinc-500 dark:text-zinc-400">/ one-time</span>}
    </p>
    <a
      href="https://wa.me/5571984770061"
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-lg bg-gradient-to-b from-orange-500 to-orange-600 py-2 text-center font-semibold text-white antialiased shadow-[inset_0_1px_0_0.75px_rgba(255,255,255,0.2)] transition-transform will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 active:scale-[.97]"
    >
      Start a project
    </a>
    <ul className="mt-6 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 fill-orange-500"
          >
            <path
              fillRule="evenodd"
              d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="bg-brand mt-1 inline-block h-1.5 w-1.5 rounded-full" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Pricing = () => (
  <section id="pricing">
    <div className="mt-10 mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
      <PricingCard
        tier="Website"
        price="$ 1.000"
        description="For companies that want a new approach on their website."
        features={['Landing page', 'UI/UX Design', 'Front-end development']}
      />
      <PricingCard
        tier="Growth"
        price="$ 3.000"
        description="For early-stage companies aiming to transform their idea into a product."
        features={['End-to-end MVP', 'Product design', 'Full-stack development']}
      />
    </div>
    <div className="flex flex-col gap-x-20 rounded-3xl border border-zinc-200 p-10 sm:flex-row sm:items-center dark:border-zinc-800">
      <div className="flex-1">
        <h3 className="text-lg font-semibold">Custom</h3>
        <p className="mt-4 mb-8 text-sm text-zinc-600 dark:text-zinc-400">
          If your needs don&apos;t fit any of our packages, we can work something out. Let&apos;s
          chat and see how we can help you.
        </p>
      </div>
      <a
        href="https://wa.me/5571984770061"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-x-1.5 rounded-lg border border-zinc-200 px-6 py-2 text-sm font-semibold antialiased shadow-xs transition-transform will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 active:scale-[.99] dark:border-zinc-800 dark:bg-neutral-900 dark:focus-visible:outline-neutral-500"
      >
        Book a call
      </a>
    </div>
  </section>
);

export default Pricing;
