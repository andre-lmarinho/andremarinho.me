import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
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
    <>
      <PageIntro
        title="Projects"
        description="Products and tools I designed, built, or helped ship."
      />

      <section className=" mx-auto flex w-full max-w-3xl flex-col gap-y-6 px-6 py-16 lg:px-8">
        <ProjectList projects={projects} />
      </section>
    </>
  );
}
