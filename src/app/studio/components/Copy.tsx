import { ScrollFadeText } from '@/components/effects/ScrollFadeText';

const DESCRIPTION: string[] = [
  'Building digital products is hard.',
  'It involves many disciplines: design, engineering, marketing and more. Bringing everything together requires assembling a highly skilled team.',
  "It's time to change that.",
  'Duonorth is an independent studio focused on crafting world-class products for early-stage companies.',
  'We ship fast, while ensuring the highest level of quality, performance, accessibility and attention to detail.',
  "Together, we'll build something duonorth.",
];

export const Copy = () => (
  <section id="copy">
    <ScrollFadeText content={DESCRIPTION} className="text-xl font-semibold sm:text-2xl" />
  </section>
);
