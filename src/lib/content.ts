export const content = {
  en: {
    hero: {
      location: "Salvador, Brazil · Remote",
      h1: "Hey! I'm André Marinho",
      sub: "Full-stack developer working with React, Next.js and TypeScript. I bring an owner's eye to product decisions and a beginner's appetite for hard code review.",
      cta_github: "GitHub",
      cta_linkedin: "LinkedIn",
      chip: "Open to full-time opportunities",
    },
    work: {
      title: "Things I've built",
      projects: [
        {
          title: "LawFlow",
          body: "A client-intake and sales-pipeline SaaS for law firms, designed and built end to end for a real client — now in production, with subscription-gated access. Turborepo monorepo, type-safe tRPC API, Supabase with Postgres RLS, billing via Asaas webhooks, and tests from unit to E2E.",
          chips: [
            "Next.js",
            "TypeScript",
            "tRPC",
            "Supabase",
            "Postgres/RLS",
            "Asaas",
            "Playwright",
            "Vitest",
          ],
          linkUrl: "https://lawflowhub.com",
          image: "/images/projects/lawflow-dashboard-card.webp",
        },
        {
          title: "Turistar",
          body: "Open-source travel planner with real-time itinerary editing on an event-sourced data model. Built because I use it — every trip of mine runs through it.",
          chips: ["Next.js", "TypeScript", "Supabase"],
          linkUrl: "https://travel-planner-orpin.vercel.app/",
          image: "/images/projects/turistar-card.webp",
        },
      ],
    },
    footer: {
      rights: "André Marinho. All rights reserved.",
      langToggle: "🇧🇷 PT",
      langHref: "/pt",
      timeTitle: "How long you have been surfing my site",
      commitTitle: "View deployment commit",
      views: "views",
      viewsTitle: "Site views, counted by Abacus",
    },
  },
  pt: {
    hero: {
      location: "Salvador, Brasil · Remoto",
      h1: "Oi! Eu sou o André",
      sub: "Desenvolvedor full-stack — React, Next.js e TypeScript. Em 2025 fui all-in no código depois de oito anos à frente de uma agência digital; doze meses depois, coloquei um SaaS em produção.",
      cta_github: "GitHub",
      cta_linkedin: "LinkedIn",
      chip: "Aberto a oportunidades full-time",
    },
    work: {
      title: "O que construí",
      projects: [
        {
          title: "LawFlow",
          body: "SaaS de gestão comercial para escritórios de advocacia, que projetei e construí de ponta a ponta para uma cliente real — hoje em produção, com acesso por assinatura. Monorepo Turborepo, API type-safe com tRPC, Supabase com Postgres e RLS, cobrança via Asaas com webhooks, e testes da unidade ao E2E.",
          chips: [
            "Next.js",
            "TypeScript",
            "tRPC",
            "Supabase",
            "Postgres/RLS",
            "Asaas",
            "Playwright",
            "Vitest",
          ],
          linkUrl: "https://lawflowhub.com",
          image: "/images/projects/lawflow-dashboard-card.webp",
        },
        {
          title: "Turistar",
          body: "Planejador de viagens open source com edição de roteiro em tempo real sobre um modelo event-sourced. Construí porque uso — toda viagem minha passa por ele.",
          chips: ["Next.js", "TypeScript", "Supabase"],
          linkUrl: "https://travel-planner-orpin.vercel.app/",
          image: "/images/projects/turistar-card.webp",
        },
      ],
    },
    footer: {
      rights: "André Marinho. Todos os direitos reservados.",
      langToggle: "🇺🇸 EN",
      langHref: "/",
      timeTitle: "Há quanto tempo você navega pelo site",
      commitTitle: "Ver commit do deploy",
      views: "views",
      viewsTitle: "Views do site, contadas pelo Abacus",
    },
  },
} as const;

export type Locale = keyof typeof content;
export type Content = (typeof content)[Locale];
