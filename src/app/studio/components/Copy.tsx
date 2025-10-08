import Section from '@/components/Section';

import ScrollCopy from './ScrollCopy';

const Copy = () => (
  <Section
    id="copy"
    className="prose prose-zinc dark:prose-invert text-xl font-semibold whitespace-pre-wrap text-zinc-700 sm:text-2xl dark:text-zinc-300"
  >
    <ScrollCopy className="space-y-8" />
  </Section>
);

export default Copy;
