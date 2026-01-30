import type { Metadata } from "next";

import Link from "next/link";

import { Hero } from "../shared/Hero";
import { ProjectLinks } from "../shared/ProjectLinks";
import { heroMetadata } from "./components/data";
import { StoryContent } from "./components/StoryContent";

import "./components/style.css";

export const metadata: Metadata = {
  title: heroMetadata.title,
  description: heroMetadata.description,
};

export default function TuristarPage() {
  return (
    <div className="work-turistar space-y-10 py-8">
      <Link href="/" className="small-button">
        ← Back
      </Link>

      <Hero hero={heroMetadata} />

      <ProjectLinks links={heroMetadata.links} />

      <StoryContent />

      <ProjectLinks links={heroMetadata.links} />

      <Link href="/" className="small-button">
        ← See all projects
      </Link>
    </div>
  );
}
