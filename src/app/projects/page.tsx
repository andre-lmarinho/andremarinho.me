import type { Metadata } from "next";
import Card from "@/components/ui/Card";
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
    <div className="mx-auto w-full max-w-3xl px-6 pt-32 pb-20">
      <h1 className="mb-12 text-4xl font-bold tracking-tight">Projects</h1>

      {projects.length === 0 ? (
        <p className="text-muted">No projects yet.</p>
      ) : (
        <div className="project-grid grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Card
              key={project.slug}
              title={project.title}
              description={project.description}
              tags={project.tags}
              image={project.image}
              href={`/projects/${project.slug}`}
              slug={project.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
