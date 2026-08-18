import type { Metadata } from "next";
import ProjectList from "@/components/content/ProjectList";
import PageTitle from "@/components/PageTitle";
import { getProjects } from "@/lib/projects";

const title = "Projects - André Marinho";
export const description =
  "Frontend-led web products and open-source tools, with the context, decisions, evidence, and outcomes behind each one.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title,
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
      <ProjectList projects={projects} titleAs="h2" />
    </section>
  );
}
