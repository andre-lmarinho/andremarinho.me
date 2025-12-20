'use client';

import { useStudioAvailability } from './hooks/useStudioAvailability';

type AvailabilityBadgeProps = {
  initialSlots: number;
};

export const AvailabilityBadge = ({ initialSlots }: AvailabilityBadgeProps) => {
  const slots = useStudioAvailability(initialSlots);
  const hasAvailableSlots = slots > 0;

  return (
    <div className="flex items-center gap-x-1.5 rounded-lg bg-zinc-200 px-2 py-1 text-xs font-medium select-none dark:bg-zinc-800">
      <span className="relative flex h-1 w-1">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${hasAvailableSlots ? 'bg-green-400' : 'bg-red-400'}`}
        />
        <span
          className={`relative inline-flex h-1 w-1 rounded-full ${hasAvailableSlots ? 'bg-green-500' : 'bg-red-500'}`}
        />
      </span>
      {hasAvailableSlots ? `${slots} ${slots === 1 ? 'spot' : 'spots'} left` : 'Waitlist'}
    </div>
  );
};
