import localFont from 'next/font/local';
import Image, { type ImageProps } from 'next/image';

import { TextLink } from '@/components/TextLink';
import { workPlaces } from '@/configs/work';
import { cn } from '@/utils/cn';

import beach from './images/beach.jpg';
import dog from './images/doggy.jpg';
import whitesand from './images/whitesand.jpg';

const rotation = {
  '+1': '+rotate-1',
  '-2': '-rotate-2',
  '-3': '-rotate-3',
};

type PolaroidProps = {
  label: string;
  src: ImageProps['src'];
  rotation: keyof typeof rotation;
  priority?: boolean;
};

const Polaroid = ({ priority = false, ...props }: PolaroidProps) => (
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
        loading={priority ? 'eager' : 'lazy'}
        priority={priority}
        placeholder="blur"
        src={props.src}
      />
      <div className="absolute inset-0 shadow-[inset_0_0_4px_rgba(0,0,0,.3)]" />
    </div>
    <p className="text-md mt-3 text-center text-neutral-600 dark:text-neutral-800">{props.label}</p>
  </div>
);

const gloria = localFont({
  src: [
    {
      path: '../../../../public/fonts/gloria-hallelujah.woff2',
      style: 'normal',
    },
  ],
  weight: '400',
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+00??, U+0131, U+0152-0153, U+02bb-02bc, U+02c6, U+02da, U+02dc, U+2000-206f, U+2074, U+20ac, U+2122, U+2191, U+2193, U+2212, U+2215, U+feff, U+fffd',
    },
  ],
});

export const Intro = () => (
  <section id="about" className="mt-6">
    <div className="mb-6 space-y-5">
      <h1>About me</h1>
      <p>
        <em>Hey!</em> 👋🏼
      </p>
      <p>
        I&apos;m André, a{' '}
        <code className="rounded-sm px-1 font-mono hover:bg-zinc-100 dark:hover:bg-zinc-900">
          {'<Front-End Engineer />'}
        </code>{' '}
        based in Salvador 🇧🇷, that loves to code and build products with a delightful user
        experience.
      </p>

      <p>
        Currently working at <TextLink href={workPlaces[0].website}>{workPlaces[0].name}</TextLink>{' '}
        as a Front End Engineer 💻.
      </p>

      <p>
        I love working in between product, engineering and developer experience. Some things that
        make me excited are TypeScript, Open Source, CI & CD systems, simplicity, automating things
        and building meaningful user-centric products.
      </p>

      <p>
        I was born and raised in salvador next to the beach and I&apos;m studying Computer Science
        at <TextLink href="https://github.com/ossu/computer-science">OSSU</TextLink> with some
        Harvard&apos;s courses like{' '}
        <TextLink href="https://certificates.cs50.io/d7d5d5d9-8e76-4b4d-b324-9ed0fee6f9f5.pdf">
          CS50
        </TextLink>{' '}
        and <TextLink href="https://github.com/andre-lmarinho/cs50w">CS50W</TextLink>.
      </p>

      <p>
        Outside work, I&apos;m into training, building small tools, and{' '}
        <TextLink href="https://travel-planner-orpin.vercel.app/">exploring new places</TextLink>{' '}
        with my family.
      </p>
    </div>

    <div className={cn('flex gap-0 py-6 lg:flex-wrap lg:gap-6', gloria.className)}>
      <Polaroid label="Doggy ❣️" src={dog} rotation="-2" priority />
      <Polaroid label="Beach '22 🏖️" src={beach} rotation="+1" />
      <div className="hidden sm:block">
        <Polaroid label="White peace 🧘🏼" src={whitesand} rotation="-3" />
      </div>
    </div>
  </section>
);
