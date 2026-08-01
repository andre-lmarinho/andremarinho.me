import PostList from "@/components/PostList";
import ProjectList from "@/components/ProjectList";
import { getPosts } from "@/lib/posts";
import { getProjects } from "@/lib/projects";

import Intro from "./components/Intro";
import SectionRule from "./components/SectionRule";

export default function HomePage() {
  const featuredProjects = getProjects().filter((project) => project.featured);
  const posts = getPosts().slice(0, 3);

  return (
    <>
      <Intro />

      <section
        id="projects"
        className="mx-auto w-full max-w-3xl scroll-mt-24 px-6 pb-28 max-md:pb-20 lg:px-8"
      >
        <SectionRule
          index="01"
          label="projects"
          link={{ href: "/projects", label: "all projects" }}
        />
        <ProjectList projects={featuredProjects} classifier="kind" />
      </section>

      <section
        id="writing"
        className="mx-auto w-full max-w-3xl scroll-mt-24 px-6 pb-10 lg:px-8"
      >
        <SectionRule
          index="02"
          label="writing"
          link={{ href: "/posts", label: "all posts" }}
        />
        <PostList posts={posts} />
      </section>
    </>
  );
}
