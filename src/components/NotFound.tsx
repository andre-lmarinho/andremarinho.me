export default function NotFound() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-x-clip px-6">
      <div
        data-not-found=""
        className="pointer-events-auto relative flex select-none items-center justify-center"
        style={{ isolation: "isolate" }}
      >
        <div
          data-not-found-glow=""
          className="nf-glow-dot"
          aria-hidden="true"
          style={{
            left: 0,
            top: 0,
            transform: "translate3d(50%, 50%, 0) translate(-50%, -50%)",
          }}
        />

        <h1 className="nf-digits flex items-baseline gap-3 font-display text-[clamp(6rem,20vw,14rem)] font-semibold leading-none tracking-tighter">
          {["4", "0", "4"].map((d, i) => (
            <span
              key={i === 1 ? "zero" : `four-${i}`}
              className="nf-digit relative z-10"
              style={{ willChange: "transform" }}
            >
              {d}
            </span>
          ))}
        </h1>
      </div>

      <p className="nf-message mt-10 max-w-md text-center font-body text-lg text-muted">
        I couldn&apos;t find this page.
      </p>

      <a
        href="/"
        className="nf-button mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-6 py-3 font-body text-sm text-foreground backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
      >
        <span className="nf-arrow" aria-hidden="true">
          ←
        </span>
        Back to home
      </a>
    </div>
  );
}
