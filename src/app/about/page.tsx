import type { Metadata } from "next";
import PageTitle from "@/components/PageTitle";

export const description =
  "About André Marinho, a frontend engineer in Brazil building accessible, high-performing web products with React, Next.js, and TypeScript.";

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
  "Hi there! I’m André, a Frontend Engineer in Salvador, Brazil. I build responsive, accessible web products with React, Next.js, and TypeScript. I usually own the frontend from interface architecture through production, crossing into APIs, data, authentication, and delivery when that is what the experience needs.",

  "Recent work includes LawFlow, whose production implementation I built as the sole developer. I cut the CRM’s critical path from about 1.45 seconds to 760 milliseconds and made its most repeated Kanban interaction respond in a single frame. On client projects developed in teams, I lead technical direction, work from the frontend into the supporting systems, and review the code that brings the pieces together.",

  "I care about the decisions people notice—how an interface reads, responds, and includes—and the ones they never see: data boundaries, tests, and how much complexity the code leaves behind. Good craft includes restraint. I want to know where an extra hour can change the experience and where the simplest solution is already the right one.",

  "Before development became my full-time focus in 2025, I spent eight years running Duonorth. I led a team of up to nine and worked with more than 100 clients across digital strategy, websites, and software. On one ecommerce project, a technical rebuild took Lighthouse from 37 to 98 and loading from more than four seconds to about one; a separate UX review helped increase conversion by more than 40%.",

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
