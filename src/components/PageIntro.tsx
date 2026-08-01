export default function PageIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="page-intro mx-auto w-full max-w-3xl px-6 pt-36 pb-16 max-md:pt-32 lg:px-8">
      <h1 className="text-4xl leading-[1.05] font-semibold tracking-[-0.02em] sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
        {description}
      </p>
    </header>
  );
}
