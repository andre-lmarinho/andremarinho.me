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
  const projects = getProjects().sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="overflow-x-clip">
      <PageIntro
        title="Projects"
        description="Products and tools I designed, built, or helped ship."
      />

      <section>
        <div className="mx-auto w-full max-w-3xl px-6 py-20 max-md:py-16 lg:px-8">
          {projects.length > 0 ? (
            <ProjectList projects={projects} headingLevel="h3" />
          ) : (
            <p className="text-muted">No projects yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
