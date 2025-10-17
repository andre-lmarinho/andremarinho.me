import Image, { type ImageProps } from 'next/image';
import { cn } from '@/utils/cn';

const rotation = {
  '+1': '+rotate-1',
  '-2': '-rotate-2',
  '-3': '-rotate-3',
} as const;

type Props = {
  label: string;
  src: ImageProps['src'];
  rotation: keyof typeof rotation;
};

export const Polaroid = (props: Props) => (
  <div
    className={cn(
      'rounded-lg bg-linear-to-b from-white to-neutral-100 p-4 shadow-2xl select-none',
      'text-center hover:scale-105 hover:rotate-0 dark:from-neutral-200 dark:to-neutral-200',
      'transition-transform ease-out',
      rotation[props.rotation]
    )}
  >
    <div className="relative h-fit w-fit overflow-hidden rounded-sm">
      <Image
        alt={props.label}
        height={240}
        width={240}
        sizes="240px"
        loading="eager"
        placeholder="blur"
        src={props.src}
      />
      <div className="absolute inset-0 shadow-[inset_0_0_4px_rgba(0,0,0,.3)]" />
    </div>
    <p className="text-md mt-3 text-center text-neutral-600 dark:text-neutral-800">{props.label}</p>
  </div>
);
