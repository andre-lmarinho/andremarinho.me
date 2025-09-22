import StudioButton from './StudioButton';

interface PricingCardProps {
  tier: string;
  price: string;
  description: string;
  features?: string[];
}

const PricingCard = ({ tier, price, description, features = [] }: PricingCardProps) => (
  <div className="relative rounded-3xl border border-zinc-200 p-10 dark:border-zinc-800">
    <div className="flex flex-row items-center justify-between gap-x-2">
      <h3 className="text-lg font-semibold">{tier}</h3>
      <div className="flex cursor-default items-center gap-x-1.5 rounded-lg bg-zinc-200 px-2 py-1 text-xs font-medium tracking-tight select-none dark:bg-zinc-800">
        <span className="relative flex h-1 w-1">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-1 w-1 rounded-full bg-green-500"></span>
        </span>
        1 spot left
      </div>
    </div>
    <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
    <div className="mb-4">
      <p className="m-0 text-xs leading-6 text-zinc-600 dark:text-zinc-400">Starting at</p>
      <p className="mt-0 flex items-baseline gap-1 text-zinc-900 dark:text-zinc-100">
        <span className="text-3xl font-bold">{price}</span>
        {price !== 'Custom' && <span className="text-zinc-500 dark:text-zinc-400">/ one-time</span>}
      </p>
    </div>
    <StudioButton className="block w-full text-center">Start a project</StudioButton>
    <ul className="mt-6 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2">
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
          {feature}
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
        <p className="mb-0 text-sm text-zinc-600 dark:text-zinc-400">
          If your needs don&apos;t fit any of our packages, we can work something out. Let&apos;s
          chat and see how we can help you.
        </p>
      </div>
      <StudioButton variant="secondary">Book a call</StudioButton>
    </div>
  </section>
);

export default Pricing;
