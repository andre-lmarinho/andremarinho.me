import type { ReactNode } from "react";

export default function PageTitle({ children }: { children: ReactNode }) {
  return (
    <>
      <h1 className="text-4xl leading-[1.05] font-semibold tracking-[-0.02em] sm:text-5xl">
        {children}
      </h1>
      <div aria-hidden="true" className="mt-8 h-px w-full bg-border" />
    </>
  );
}
