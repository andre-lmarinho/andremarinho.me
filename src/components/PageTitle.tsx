import type { CSSProperties, ReactNode } from "react";

export default function PageTitle({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <>
      <h1
        className="text-4xl leading-[1.05] font-semibold tracking-[-0.02em] sm:text-5xl"
        style={style}
      >
        {children}
      </h1>
      <div aria-hidden="true" className="mt-8 h-px w-full bg-border" />
    </>
  );
}
