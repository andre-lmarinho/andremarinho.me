import { GitHub, Instagram, Linkedin } from "@/components/ui/icon";

export const email = "hey@andremarinho.me";

export const socials = [
  { label: "GitHub", href: "https://github.com/andre-lmarinho", icon: GitHub },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/andre-lmarinho",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/andre.lmarinho/",
    icon: Instagram,
  },
] as const;
