import type { Metadata } from "next";
import ProjectList from "@/components/content/ProjectList";
import PageTitle from "@/components/PageTitle";
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
      <PageTitle>Projects</PageTitle>
      <ProjectList projects={projects} />
    </section>
  );
}
