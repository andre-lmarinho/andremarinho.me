import type { Metadata } from "next";
import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — André Marinho",
  description:
    "A collection of projects I built — from SaaS products to open-source tools.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <section className="mx-auto w-full max-w-3xl px-6 pt-36 pb-16 max-md:pt-32 lg:px-8">
      <h1 className="text-4xl leading-[1.05] font-semibold tracking-[-0.02em] sm:text-5xl">
        Projects
      </h1>
      <ProjectList projects={projects} />
    </section>
  );
}
