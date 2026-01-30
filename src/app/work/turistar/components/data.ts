import type { WorkStoryMetadata } from "../../shared/types";

import feature00 from "./images/turistar_feature_00.webp";
import feature01 from "./images/turistar_feature_01.webp";
import feature02 from "./images/turistar_feature_02.webp";
import feature03 from "./images/turistar_feature_03.webp";

export const heroMetadata: WorkStoryMetadata = {
  title: "Turistar",
  description: "A modern, drag‑and‑drop travel planner for crafting custom itineraries.",
  role: "Founder",
  time: "4 Months",
  image: "/images/projects/turistar-app-mock.webp",
  date: "Jun 2025",
  links: [
    { label: "Code", href: "https://github.com/andre-lmarinho/travel-planner" },
    { label: "Live", href: "https://travel-planner-orpin.vercel.app/" },
  ],
};

export const FEATURE_IMAGES = [
  {
    src: feature00.src,
    alt: "Turistar app landing page and marketing screen.",
    width: feature00.width,
    height: feature00.height,
  },
  {
    src: feature01.src,
    alt: "Turistar planner board for building the itinerary.",
    width: feature01.width,
    height: feature01.height,
  },
  {
    src: feature02.src,
    alt: "Turistar map board showing activities across the city.",
    width: feature02.width,
    height: feature02.height,
  },
  {
    src: feature03.src,
    alt: "Turistar budget board summarizing trip costs.",
    width: feature03.width,
    height: feature03.height,
  },
];
