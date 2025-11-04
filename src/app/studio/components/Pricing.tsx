import { LinkButton } from '@/components/LinkButton';
import { plansForUI, customForUI } from '../offers';

export const studioPricingPlans = plansForUI;

export const Pricing = () => (
  <section id="pricing">
    <div className="mt-10 mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
      {plansForUI.map((plan) => (
        <div
          key={plan.slug}
          className="relative rounded-3xl border border-zinc-200 p-10 dark:border-zinc-800"
        >
          <h3 className="text-lg font-semibold">{plan.tier}</h3>
          <p className="text-muted mb-4 text-sm">{plan.description}</p>
          <div className="mb-4">
            <p className="text-muted m-0 text-xs leading-6">Starting at</p>
            <p className="mt-0 flex items-baseline gap-1 text-zinc-900 dark:text-zinc-100">
              <span className="text-3xl font-bold">{plan.price.display}</span>
              {plan.price.billingType === 'one-time' && (
                <span className="text-zinc-500 dark:text-zinc-400">/ one-time</span>
              )}
            </p>
          </div>
          <LinkButton size="full" href={customForUI.href}>
            Start a project
          </LinkButton>
          <ul className="mt-6 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            {plan.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                {f}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="flex flex-col gap-x-20 gap-y-4 rounded-3xl border border-zinc-200 p-10 sm:flex-row sm:items-center dark:border-zinc-800">
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{customForUI.title}</h3>
        <p className="text-muted mb-0 text-sm">{customForUI.description}</p>
      </div>
      <LinkButton variant="muted" href={customForUI.href}>
        Book a call
      </LinkButton>
    </div>
  </section>
);
