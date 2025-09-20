import TextType from './TextType';

const Hero = () => {
  return (
    <section id="hero" className="pt-16 pb-20 md:pt-24 md:pb-28">
      <h1 className="pb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
        {'World-class '}
        <TextType
          as="span"
          className="text-zinc-900 italic dark:text-zinc-100"
          text={['design', 'software', 'product']}
        />
        <span className="block">partner for your business</span>
      </h1>
      <p className="max-w-lg pb-14 text-xl font-medium tracking-tight text-zinc-600 sm:max-w-2xl sm:text-3xl dark:text-zinc-400">
        We help business build high-quality products and delightful digital experiences.
      </p>

      <a
        href="https://wa.me/5571984770061"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex rounded-xl bg-gradient-to-b from-orange-500 to-orange-600 px-6 py-2 font-semibold text-white antialiased shadow-[inset_0_1px_0_0.75px_rgba(255,255,255,0.2)] transition-transform will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 active:scale-[.97]"
      >
        Book a call
      </a>
    </section>
  );
};

export default Hero;
