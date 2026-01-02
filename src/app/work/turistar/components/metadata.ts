import type { WorkStoryMetadata } from "../../shared/types";
import turistarAppMock from "./images/turistar-app-mock.webp";

export const heroMetadata: WorkStoryMetadata = {
  title: "Turistar",
  description: "A modern, drag‑and‑drop travel planner for crafting custom itineraries.",
  role: "Founder",
  time: "4 Months",
  image: turistarAppMock,
  date: "Jun 2025",
  links: [
    { label: "Code", href: "https://github.com/andre-lmarinho/travel-planner" },
    { label: "Live", href: "https://travel-planner-orpin.vercel.app/" },
  ],
};
