import TransitionLink from "@/components/animations/TransitionLink";
import { ArrowRight } from "@/components/ui/icon";

export default function SectionRule({
  index,
  label,
  link,
}: {
  index: string;
  label: string;
  link: { href: string; label: string };
}) {
  const labelClass = "text-[10px] uppercase tracking-[0.2em]";

  return (
    <div className="mb-8 flex items-center gap-x-3">
      <span className={`${labelClass} text-muted tabular-nums`}>{index}</span>
      <h2 className={`${labelClass} shrink-0 text-foreground`}>{label}</h2>

      <span
        aria-hidden="true"
        className="section-rule-line block h-px flex-1 bg-border"
      />

      <TransitionLink
        href={link.href}
        className={`${labelClass} group inline-flex shrink-0 items-center gap-x-1.5 text-muted transition-colors hover:text-accent`}
      >
        {link.label}
        <ArrowRight
          className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </TransitionLink>
    </div>
  );
}
