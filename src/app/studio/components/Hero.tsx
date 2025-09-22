import StudioButton from './StudioButton';
import TextType from './TextType';

const Hero = () => (
  <section id="hero" className="pt-16 pb-20 md:pt-24 md:pb-28">
    <h1 className="text-extrabold pb-6 text-4xl tracking-tight sm:text-5xl md:text-6xl">
      {'World-class '}
      <TextType
        as="span"
        className="text-zinc-900 dark:text-zinc-100"
        text={['design', 'software', 'product']}
      />
      <span className="block">partner for your business</span>
    </h1>
    <p className="max-w-lg pb-14 text-xl font-medium tracking-tight text-zinc-600 sm:max-w-2xl sm:text-3xl dark:text-zinc-400">
      We help business build high-quality products and delightful digital experiences.
    </p>

    <StudioButton>Book a call</StudioButton>
  </section>
);

export default Hero;
