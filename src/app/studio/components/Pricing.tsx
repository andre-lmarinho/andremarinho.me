import { Button } from '@/app/studio/components/CTAButton';

export type StudioPricingPlan = {
  tier: string;
  description: string;
  price: {
    display: string;
    value: string;
    currency: string;
    billingType: 'one-time';
  };
  features: string[];
};

export const studioPricingPlans: StudioPricingPlan[] = [
  {
    tier: 'Website',
    description: 'For companies that want a new approach on their website.',
    price: {
      display: '$ 1.000',
      value: '1000',
      currency: 'USD',
      billingType: 'one-time',
    },
    features: ['Landing page', 'UI/UX Design', 'Front-end development'],
  },
  {
    tier: 'Growth',
    description: 'For early-stage companies aiming to transform their idea into a product.',
    price: {
      display: '$ 3.000',
      value: '3000',
      currency: 'USD',
      billingType: 'one-time',
    },
    features: ['End-to-end MVP', 'Product design', 'Full-stack development'],
  },
];

interface PricingCardProps {
  plan: StudioPricingPlan;
}

const PricingCard = ({
  plan: {
    tier,
    price: { display: priceDisplay, billingType },
    description,
    features = [],
  },
}: PricingCardProps) => (
  <div className="relative rounded-3xl border border-zinc-200 p-10 dark:border-zinc-800">
    <div className="mb-4 flex flex-row items-center justify-between gap-x-2">
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
        <span className="text-3xl font-bold">{priceDisplay}</span>
        {billingType === 'one-time' && (
          <span className="text-zinc-500 dark:text-zinc-400">/ one-time</span>
        )}
      </p>
    </div>
    <Button size="full">Start a project</Button>
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

export const Pricing = () => (
  <section id="pricing">
    <div className="mt-10 mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
      {studioPricingPlans.map((plan) => (
        <PricingCard key={plan.tier} plan={plan} />
      ))}
    </div>
    <div className="flex flex-col gap-x-20 gap-y-4 rounded-3xl border border-zinc-200 p-10 sm:flex-row sm:items-center dark:border-zinc-800">
      <div className="flex-1">
        <h3 className="text-lg font-semibold">Custom</h3>
        <p className="mb-0 text-sm text-zinc-600 dark:text-zinc-400">
          If your needs don&apos;t fit any of our packages, we can work something out. Let&apos;s
          chat and see how we can help you.
        </p>
      </div>
      <Button variant="muted">Book a call</Button>
    </div>
  </section>
);
