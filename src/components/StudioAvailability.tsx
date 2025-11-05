type StudioAvailabilityProps = {
  slots: number;
};

export const StudioAvailability = ({ slots }: StudioAvailabilityProps) => {
  const status = slots > 0 ? `${slots} ${slots === 1 ? 'spot' : 'spots'} left` : 'Waitlist';

  return (
    <div className="flex items-center gap-x-1.5 rounded-lg bg-zinc-200 px-2 py-1 text-xs font-medium select-none dark:bg-zinc-800">
      <span className="relative flex h-1 w-1">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${slots > 0 ? 'bg-green-400' : 'bg-red-400'}`}
        />
        <span
          className={`relative inline-flex h-1 w-1 rounded-full ${slots > 0 ? 'bg-green-500' : 'bg-red-500'}`}
        />
      </span>
      {status}
    </div>
  );
};
