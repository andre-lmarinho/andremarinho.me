import { ViewTransition } from "react";
import PostList from "@/components/content/PostList";
import ProjectList from "@/components/content/ProjectList";
import { getPosts } from "@/lib/posts";
import { getProjects } from "@/lib/projects";

import Intro from "./components/Intro";
import SectionRule from "./components/SectionRule";

export default function HomePage() {
  const featuredProjects = getProjects().filter((project) => project.featured);
  const posts = getPosts().slice(0, 3);

  return (
    // Each section would otherwise be auto-named and paired with the single
    // <section> other pages render, animating the whole block — section rule
    // included — on the way out. Only the named titles and images travel.
    <ViewTransition name="none">
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
        <ProjectList projects={featuredProjects} />
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
    </ViewTransition>
  );
}
