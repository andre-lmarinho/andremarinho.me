import type { Metadata } from "next";
import PageTitle from "@/components/PageTitle";

const description =
  "About André Marinho: an independent frontend engineer in Brazil whose work evolved from BI and digital strategy into websites and software.";

export const metadata: Metadata = {
  title: "About — André Marinho",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — André Marinho",
    description,
    type: "profile",
    url: "/about",
  },
};

const copy = [
  "Hi there! I’m André, and I like building software with intention. I care about the decisions people notice and the ones they never see: how an interface reads, how it responds, who it includes, and how much complexity the code leaves behind. I enjoy working where design and engineering meet, turning rough problems into products that feel clear, useful, and well made.",

  "Today I work independently, often taking web products from an early idea to production. Good craft includes restraint. I want to know where an extra hour can change the experience and where the simplest solution is already the right one.",

  "I spent eight years running Duonorth, where my work evolved from BI and digital strategy into websites and software. Development became my full-time focus in 2025, continuing a way of working I had built over years: understand the problem and make something useful.",

  "I also build things simply because I can. Turistar started because I wanted a better way to plan my own trips. More recently, I built a self-hosted tracker for my computer science studies. Other people now use both. Few things make me happier than seeing something I made for myself become useful to someone else.",

  "Away from the computer, I read, run, lift weights, play classical guitar, go to the beach, and am learning to juggle. I like always having something new to learn.",
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
