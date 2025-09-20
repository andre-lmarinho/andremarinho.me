const aboutParagraphs = [
  'Hey there! \u{1F44B} I\u2019m Andr\u00E9, a Front-End Developer from Salvador, passionate about building digital experiences where code, design, and strategy work together to create real impact.',
  'I lead Duonorth Studio, where I craft solutions that merge React, Next.js, and TypeScript with data automation. My projects go beyond clean interfaces\u2014they\u2019re designed to boost performance, conversions, and business growth.',
  'Before moving into tech full-time, I built a strong foundation in digital marketing and analytics, which gives me a unique edge: I don\u2019t just code\u2014I design with user behavior and business outcomes in mind. Over the years, I\u2019ve delivered everything from high-performance websites and automation scripts to advanced analytics dashboards.',
  'I love working at the intersection of UX, engineering, and business strategy. Some of the things that get me most excited are JavaScript, automation, product analytics, performance optimization, and finding ways to make technology solve practical business problems.',
  'Outside of work, I\u2019m constantly learning, exploring new tools, and pushing projects forward\u2014from side hustles to community-driven experiments. When I\u2019m not coding, you\u2019ll probably find me training, traveling, or sketching out the next idea that connects creativity and tech.',
] as const;

const Intro = () => (
  <section id="about">
    <div>
      <h1>About me</h1>
      {aboutParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  </section>
);

export default Intro;
