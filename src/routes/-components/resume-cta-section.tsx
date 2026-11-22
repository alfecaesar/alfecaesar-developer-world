
import { motion } from "motion/react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  FileUser,
} from "lucide-react";

import SectionShell from "@/components/section-shell.tsx";
import { PROFILE } from "@/lib/profile";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ResumeCTASection() {
  return (
    <SectionShell id="resume">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative isolate overflow-hidden rounded-[2rem] border bg-card px-6 py-14 text-center shadow-sm sm:px-12 sm:py-20"
      >
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-24 -top-24 size-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 size-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
        </div>

        <div className="mx-auto flex max-w-2xl flex-col items-center">
          <div className="mb-6 flex size-14 items-center justify-center rounded-2xl border bg-background/80 text-primary shadow-sm">
            <FileUser className="size-7" strokeWidth={1.5} />
          </div>

          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-primary sm:text-xs">
            // a little more about my experience
          </p>

          <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Want to Know More About My Experience?
          </h2>

          <p className="mt-5 max-w-xl text-pretty text-sm leading-7 text-muted-foreground sm:text-base">
            Take a look at my resume for a closer look at my experience,
            technical skills, and the projects I've worked on.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href={PROFILE.links.cv}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background/70 px-7 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              Preview Resume
              <ArrowUpRight className="size-4" />
            </a>
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            PDF format · Alfe Caesar Lagas
          </p>
        </div>
      </motion.div>
    </SectionShell>
  );
}
