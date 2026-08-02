import type { Metadata } from "next";
import PageTitle from "@/components/PageTitle";

export const metadata: Metadata = {
  title: "About — André Marinho",
  description:
    "Front-end developer in Brazil working where engineering, product and user experience meet.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — André Marinho",
    description:
      "Front-end developer in Brazil working where engineering, product and user experience meet.",
    type: "profile",
    url: "/about",
  },
};

const copy = [
  "I'm a Front-End Developer based in Brazil who enjoys turning ideas into products people actually enjoy using.",
  "My path into software wasn't traditional. Before becoming a developer, I spent years working in digital marketing, helping businesses grow through strategy, websites and user experience.",
  "That background changed the way I approach engineering. I don't just think about how to build a feature. I think about why it exists, who it serves and how every technical decision shapes the final product.",
  "Today I build modern web applications with React, Next.js and TypeScript, with a strong focus on clean architecture, performance and maintainability.",
  "The work I enjoy most lives at the intersection of engineering, product and user experience where technical decisions directly improve how people experience software.",
  "Outside of client work, I spend a significant amount of time building open source projects. They're where I experiment with architecture, testing, CI/CD and developer experience before bringing those lessons into production.",
  "I'm always studying computer science, exploring large open source codebases and building personal projects. Every project is another opportunity to become a better engineer.",
] as const;

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 pt-36 pb-16 max-md:pt-32 lg:px-8">
      <PageTitle>About</PageTitle>
      <div className=" flex flex-col gap-y-6 mt-6">
        {copy.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-relaxed sm:text-base">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
