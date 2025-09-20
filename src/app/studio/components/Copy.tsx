import ScrollCopy from './ScrollCopy';

const Copy = () => {
  return (
    <section
      id="copy"
      className="prose prose-zinc dark:prose-invert whitespace-pre-wrap text-xl font-semibold text-zinc-700 dark:text-zinc-300 sm:text-2xl"
    >
      <ScrollCopy className="space-y-8" />
    </section>
  );
};

export default Copy;
