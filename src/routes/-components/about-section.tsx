import { lazy } from "react";
import { motion } from "motion/react";
import {
  BriefcaseIcon,
  CalendarClockIcon,
  CodeXmlIcon,
  MapPinIcon,
  SparklesIcon,
  UserRoundIcon,
} from "lucide-react";
import CountUp from "@/components/count-up.tsx";
import SectionShell from "@/components/section-shell.tsx";
import SceneMount from "@/components/three/scene-mount.tsx";
import { useMediaQuery } from "@/hooks/use-environment.ts";
import { PROFILE } from "@/lib/profile.ts";

const AboutScene = lazy(() => import("@/components/three/about-scene.tsx"));

const EASE = [0.22, 1, 0.36, 1] as const;

const PARAGRAPHS = [
  "I'm Alfe Caesar Lagas, a Front-End Engineer with 18 years of experience creating websites, eCommerce experiences, and web applications.",
  "My primary focus is Shopify and WordPress development, along with modern front-end technologies. I enjoy transforming designs into functional, responsive, and user-friendly digital experiences.",
  "I work with businesses, agencies, and teams to build, improve, and maintain digital products that deliver real value.",
];

const DETAILS = [
  { label: "Name", value: PROFILE.name, Icon: UserRoundIcon },
  { label: "Title", value: PROFILE.title, Icon: BriefcaseIcon },
  { label: "Location", value: PROFILE.location, Icon: MapPinIcon },
  { label: "Experience", value: "18 Years", Icon: CalendarClockIcon },
  { label: "Specialization", value: "Shopify, WordPress, and Web Application Development", Icon: CodeXmlIcon },
  { label: "Availability", value: "Open to Remote Work and Freelance Opportunities", Icon: SparklesIcon },
];

const COUNTERS = [
  { label: "Years of Development Experience", prefix: null, value: 18, suffix: "" },
  { label: "Shopify Stores Worked On", prefix: 30, value: 40, suffix: "" },
  { label: "Websites Maintained and Optimized", prefix: null, value: 40, suffix: "+" },
];

const BADGES = ["Shopify & Liquid", "WordPress & PHP", "Remote-Friendly"];

function CharacterFallback() {
  return (
    <div role="img" aria-label="Illustration of the developer character" className="flex size-full items-center justify-center">
      <div className="relative flex size-48 items-center justify-center rounded-full bg-gradient-to-br from-primary/25 to-accent/25">
        <span className="font-display text-6xl font-bold text-primary">{PROFILE.initials}</span>
      </div>
    </div>
  );
}

/** "The Person Behind the Code": 3D character, intro copy, details and counters. */
export default function AboutSection() {
  const compact = useMediaQuery("(max-width: 767px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <SectionShell id="about" eyebrow="// about" title="The Person Behind the Code" className="overflow-hidden">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative h-[380px] overflow-hidden rounded-[2rem] border border-primary/15 bg-gradient-to-b from-[#ece8ff] to-[#e3f6fb] sm:h-[460px] dark:from-[#1e1a4d] dark:to-[#132a3f]"
        >
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(124,92,255,0.18)_1px,transparent_0)] [background-size:24px_24px]" />
          <SceneMount className="relative size-full" fallback={<CharacterFallback />}>
            {(running) => <AboutScene compact={compact} animate={!reducedMotion} running={running} />}
          </SceneMount>
          <div className="pointer-events-none absolute inset-x-4 top-4 flex flex-wrap gap-2">
            {BADGES.map((badge, i) => (
              <motion.span
                key={badge}
                animate={reducedMotion ? undefined : { y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                className="rounded-full border border-white/60 bg-background/80 px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur dark:border-white/10"
              >
                {badge}
              </motion.span>
            ))}
          </div>
          <p className="pointer-events-none absolute inset-x-0 bottom-3 text-center font-mono text-[11px] text-muted-foreground">
            {"hover the floating icons · move to look around"}
          </p>
        </motion.div>

        <div>
          <div className="space-y-4 text-lg text-pretty text-muted-foreground">
            {PARAGRAPHS.map((paragraph, i) => (
              <motion.p
                key={paragraph}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                className={i === 0 ? "text-foreground" : undefined}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <dl className="grid gap-3 pt-8 sm:grid-cols-2">
            {DETAILS.map(({ label, value, Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: EASE }}
                className="flex gap-3 rounded-2xl border bg-card p-4"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0">
                  <dt className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</dt>
                  <dd className="pt-0.5 text-sm font-semibold text-pretty">{value}</dd>
                </div>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>

      <ul className="grid gap-4 pt-12 sm:grid-cols-3">
        {COUNTERS.map(({ label, prefix, value, suffix }, i) => (
          <motion.li
            key={label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
            className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-card to-accent/10 p-6"
          >
            <div aria-hidden className="absolute -top-10 -right-10 size-32 rounded-full bg-primary/15 blur-2xl" />
            <p className="relative font-display text-5xl font-bold tracking-tight text-primary">
              {prefix !== null && (
                <>
                  <CountUp to={prefix} />
                  {"–"}
                </>
              )}
              <CountUp to={value} from={prefix ?? 0} />
              {suffix}
            </p>
            <p className="relative pt-2 font-medium text-foreground/80">{label}</p>
          </motion.li>
        ))}
      </ul>
    </SectionShell>
  );
}
