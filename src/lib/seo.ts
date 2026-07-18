const siteUrl = "https://andremarinho.me";

export const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "André Marinho",
    url: siteUrl,
    image: `${siteUrl}/images/me/andre-marinho.webp`,
    jobTitle: "Full-Stack Developer",
    sameAs: [
      "https://github.com/andre-lmarinho",
      "https://linkedin.com/in/andre-lmarinho",
      "https://www.instagram.com/andre.lmarinho/",
    ],
  },
};
