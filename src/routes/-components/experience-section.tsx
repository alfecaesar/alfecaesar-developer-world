import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import SectionShell from "@/components/section-shell.tsx";
import { EXPERIENCE_AREAS } from "@/lib/services.ts";
import { cn } from "@/lib/utils.ts";

const EASE = [0.22, 1, 0.36, 1] as const;

/** "15+ Years of Building for the Web": a scroll-drawn timeline of experience areas. */
export default function ExperienceSection() {
  const track = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <SectionShell
      id="experience"
      eyebrow="// experience"
      title="15+ Years of Building for the Web"
      intro="The areas I have worked in across years of building, customizing and supporting websites and online stores."
      className="overflow-hidden bg-gradient-to-b from-background via-secondary/40 to-background"
    >
      <ol ref={track} className="relative mx-auto max-w-4xl">
        {/* Track and scroll-driven fill, left on mobile, centered on desktop */}
        <div aria-hidden className="absolute top-0 bottom-0 left-5 w-1 -translate-x-1/2 rounded-full bg-border md:left-1/2" />
        <motion.div
          aria-hidden
          style={{ scaleY: progress }}
          className="absolute top-0 bottom-0 left-5 w-1 origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-primary via-[#4f8dff] to-[#38d3ea] md:left-1/2"
        />

        {EXPERIENCE_AREAS.map(({ title, description, Icon }, i) => {
          const right = i % 2 === 1;
          return (
            <li key={title} className="relative pb-8 pl-14 last:pb-0 md:grid md:grid-cols-2 md:gap-12 md:pl-0">
              <motion.span
                initial={{ scale: 0.4, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="absolute top-3 left-5 z-10 flex size-10 -translate-x-1/2 items-center justify-center rounded-2xl border-4 border-background bg-primary text-primary-foreground shadow-lg shadow-primary/30 md:left-1/2"
              >
                <Icon className="size-4" />
              </motion.span>
              <motion.div
                initial={{ opacity: 0, x: right ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: EASE }}
                className={cn(
                  "rounded-3xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-lg hover:shadow-primary/10",
                  right ? "md:col-start-2" : "md:col-start-1 md:text-right",
                )}
              >
                <p className="font-mono text-xs font-medium text-primary">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="pt-1 font-display text-lg font-bold tracking-tight">{title}</h3>
                <p className="pt-1.5 text-sm text-pretty text-muted-foreground">{description}</p>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </SectionShell>
  );
}
