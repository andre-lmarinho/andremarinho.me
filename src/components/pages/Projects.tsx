import ProjectList from "@/components/content/ProjectList";
import PageTitle from "@/components/PageTitle";
import { getProjects } from "@/lib/projects";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-16 lg:px-8">
      <PageTitle>Projects</PageTitle>
      <ProjectList projects={projects} titleAs="h2" />
    </section>
  );
}
