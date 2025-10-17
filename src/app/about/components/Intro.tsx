import localFont from 'next/font/local';

import { SmartLink as A } from '@/components/Link';
import { PageTitle } from '@/components/Heading';
import { cn } from '@/utils/cn';
import { Polaroid } from './Polaroid';
import dog from './images/doggy.jpg';
import beach from './images/beach.jpg';
import whitesand from './images/whitesand.jpg';

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
    <PageTitle>About me</PageTitle>
    <div className="mb-6 space-y-5">
      <p>
        <em>Hey!</em> 👋🏼
      </p>
      <p>
        I&apos;m André, a Front End Developer based in Salvador, that loves to code and build
        products with a delightful user experience.
      </p>

      <p>
        Currently working at <A href="/studio">Duonorth Studio</A> as a Front End Developer.
      </p>

      <p>
        I love working in between product, engineering and developer experience. Some things that
        make me excited are TypeScript, Open Source, CI & CD systems, simplicity, automating things
        and building meaningful user-centric products.
      </p>

      <p>
        I was born and raised in salvador next to the beach and I&apos;m studying Computer Science
        at <A href="https://github.com/ossu/computer-science">OSSU</A> with some Harvard&apos;s
        courses like{' '}
        <A href="https://certificates.cs50.io/d7d5d5d9-8e76-4b4d-b324-9ed0fee6f9f5.pdf">CS50</A> and{' '}
        <A href="https://github.com/andre-lmarinho/cs50w">CS50W</A>.
      </p>

      <p>
        Outside work, I&apos;m into training, building small tools, and{' '}
        <A href="https://travel-planner-orpin.vercel.app/">exploring new places</A> with my family.
      </p>
    </div>

    <div className={cn('flex gap-0 py-6 lg:flex-wrap lg:gap-6', gloria.className)}>
      <Polaroid label="Doggy ❣️" src={dog} rotation="-2" />
      <Polaroid label="Beach '22 🏖️" src={beach} rotation="+1" />
      <div className="hidden sm:block">
        <Polaroid label="White peace 🧘🏼" src={whitesand} rotation="-3" />
      </div>
    </div>
  </section>
);
