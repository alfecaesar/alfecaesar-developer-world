import type { ReactNode } from "react";
import { cn } from "@/lib/utils.ts";

type SectionShellProps = {
  id: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  className?: string;
  children?: ReactNode;
};

/** Shared layout for page sections: eyebrow, heading, intro and content. */
export default function SectionShell({ id, eyebrow, title, intro, className, children }: SectionShellProps) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("relative px-5 py-24 md:px-8 md:py-32", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="font-mono text-sm font-medium text-primary">{eyebrow}</p>
          <h2 id={headingId} className="pt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {intro && <div className="pt-4 text-lg text-pretty text-muted-foreground">{intro}</div>}
        </div>
        {children && <div className="pt-12">{children}</div>}
      </div>
    </section>
  );
}
