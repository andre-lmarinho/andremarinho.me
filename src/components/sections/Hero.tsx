"use client";

import Image from "next/image";
import type { Content } from "@/lib/content";

export default function Hero({ content }: { content: Content["hero"] }) {
  return (
    <section
      id="hero"
      className="flex items-center pt-48 pb-16 relative overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-accent-glow/20 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-16">
          <div className="max-w-3xl flex-1">
            <div className="flex items-center gap-2 text-sm text-muted mb-6 font-mono">
              <span className="text-xs text-muted/60">~/location</span>
              <span className="text-muted">$</span>
              <span>{content.location}</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
              {content.h1}{" "}
              <span
                aria-hidden="true"
                className="animate-wave inline-block origin-[70%_70%]"
              >
                👋🏼
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl mb-10">
              {content.sub}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <a
                href="https://github.com/andre-lmarinho"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                {content.cta_github}
              </a>
              <span className="text-muted text-xs">|</span>
              <a
                href="https://linkedin.com/in/andre-lmarinho"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                {content.cta_linkedin}
              </a>
            </div>
          </div>

          <div className="hidden shrink-0 flex-col items-center lg:ml-auto lg:flex">
            <div className="relative">
              <div className="w-48 h-48 rounded-2xl overflow-hidden border border-border/50">
                <Image
                  src="/images/me/andre-marinho.webp"
                  alt="André Marinho"
                  width={192}
                  height={192}
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent text-lg">
                <svg
                  aria-hidden="true"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
            </div>
            <div className="mt-4 text-xs text-muted font-mono text-center">
              <span className="text-accent">$</span> whoami
              <br />
              <span className="text-muted/60">full-stack developer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
