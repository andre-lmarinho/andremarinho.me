import HomeIntro from "@/components/HomeIntro";
import PostList from "@/components/PostList";
import ProjectList from "@/components/ProjectList";
import SectionRule from "@/components/SectionRule";
import { getPosts } from "@/lib/posts";
import { getFeaturedProjects } from "@/lib/projects";

export default function HomePage() {
  const projects = getFeaturedProjects();
  const posts = getPosts().slice(0, 3);

  return (
    <div className="overflow-x-clip">
      <span id="top" aria-hidden="true" />
      <HomeIntro />

      <section
        id="projects"
        className="mx-auto w-full max-w-3xl scroll-mt-24 px-6 pb-28 max-md:pb-20 lg:px-8"
      >
        <SectionRule
          index="01"
          label="projects"
          link={{ href: "/projects", label: "all projects" }}
        />
        <ProjectList projects={projects} headingLevel="h3" classifier="kind" />
      </section>

      {posts.length > 0 ? (
        <section
          id="writing"
          className="mx-auto w-full max-w-3xl scroll-mt-24 px-6 pb-10 lg:px-8"
        >
          <SectionRule
            index="02"
            label="writing"
            link={{ href: "/posts", label: "all posts" }}
          />
          <PostList posts={posts} headingLevel="h3" />
        </section>
      ) : null}
    </div>
  );
}
