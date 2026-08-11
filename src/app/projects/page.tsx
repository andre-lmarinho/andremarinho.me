import type { Metadata } from "next";
import ProjectList from "@/components/content/ProjectList";
import PageTitle from "@/components/PageTitle";
import { getProjects } from "@/lib/projects";

const description =
  "Web products and open-source tools I built to solve real problems, with care for the interface, the code behind it, and the path to production.";

export const metadata: Metadata = {
  title: "Projects — André Marinho",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — André Marinho",
    description,
    type: "website",
    url: "/projects",
  },
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
