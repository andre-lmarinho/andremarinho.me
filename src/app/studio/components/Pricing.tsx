import { LinkButton } from '@/components/LinkButton';
import { getStudioAvailability } from '@/app/studio/getStudioAvailability';
import { plansForUI, customForUI } from '../offers';

export const Pricing = async () => {
  const slots = await getStudioAvailability();
  const hasAvailableSlots = slots > 0;
  const spotsLabel = slots === 1 ? 'spot' : 'spots';
  const status = hasAvailableSlots ? `${slots} ${spotsLabel} left` : 'Waitlist';
  const pingColor = hasAvailableSlots ? 'bg-green-400' : 'bg-red-400';
  const dotColor = hasAvailableSlots ? 'bg-green-500' : 'bg-red-500';

  return (
    <section id="pricing">
      <div className="mt-10 mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {plansForUI.map((plan) => (
          <div
            key={plan.slug}
            id={plan.slug}
            className="relative rounded-3xl border border-zinc-200 p-10 dark:border-zinc-800"
          >
            <div className="mb-4 flex items-center justify-between gap-x-2">
              <h3 className="text-lg font-semibold">{plan.tier}</h3>
              <div className="flex items-center gap-x-1.5 rounded-lg bg-zinc-200 px-2 py-1 text-xs font-medium select-none dark:bg-zinc-800">
                <span className="relative flex h-1 w-1">
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${pingColor}`}
                  />
                  <span className={`relative inline-flex h-1 w-1 rounded-full ${dotColor}`} />
                </span>
                {status}
              </div>
            </div>
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

            <LinkButton size="full">Book a call</LinkButton>

            <ul className="mt-6 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
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
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        id={customForUI.anchorId}
        className="flex flex-col gap-x-20 gap-y-4 rounded-3xl border border-zinc-200 p-10 sm:flex-row sm:items-center dark:border-zinc-800"
      >
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{customForUI.title}</h3>
          <p className="text-muted mb-0 text-sm">{customForUI.description}</p>
        </div>
        <LinkButton variant="muted">Book a call</LinkButton>
      </div>
    </section>
  );
};
