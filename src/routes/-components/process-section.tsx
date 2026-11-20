import { lazy, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import SectionShell from "@/components/section-shell.tsx";
import SceneMount from "@/components/three/scene-mount.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useMediaQuery } from "@/hooks/use-environment.ts";
import { PROCESS_STAGES } from "@/lib/services.ts";
import { cn } from "@/lib/utils.ts";

const ProcessScene = lazy(() => import("@/components/three/process-scene.tsx"));

const EASE = [0.22, 1, 0.36, 1] as const;

/** "From Idea to Reality": an interactive 3D pathway through six stages. */
export default function ProcessSection() {
  const [active, setActive] = useState(0);
  const compact = useMediaQuery("(max-width: 767px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const stage = PROCESS_STAGES[active];
  const last = PROCESS_STAGES.length - 1;

  return (
    <SectionShell
      id="process"
      eyebrow="// process"
      title="From Idea to Reality"
      intro="How a project moves from first conversation to launch. Click a stage on the path to follow along."
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-gradient-to-br from-[#ece8ff] via-[#f3f1ff] to-[#e1f5fb] dark:from-[#1e1a4d] dark:via-[#191a42] dark:to-[#122a3d]">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(124,92,255,0.16)_1px,transparent_0)] [background-size:24px_24px]" />
        <SceneMount
          className="relative h-[600px] md:h-[400px]"
          fallback={
            <ol className="grid size-full content-center gap-3 p-6 sm:grid-cols-3" aria-hidden>
              {PROCESS_STAGES.map((item, i) => (
                <li
                  key={item.id}
                  className="rounded-2xl border bg-background/70 p-4 font-display font-semibold"
                  style={{ borderColor: i === active ? item.color : undefined }}
                >
                  <span className="font-mono text-xs" style={{ color: item.color }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>{" "}
                  {item.title}
                </li>
              ))}
            </ol>
          }
        >
          {(running) => (
            <ProcessScene
              stages={PROCESS_STAGES}
              active={active}
              onSelect={setActive}
              compact={compact}
              animate={!reducedMotion}
              running={running}
            />
          )}
        </SceneMount>
      </div>

      <div className="grid items-start gap-5 pt-5 md:grid-cols-[1fr_auto]">
        <div aria-live="polite" className="min-h-28 rounded-3xl border bg-card p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <p className="font-mono text-sm font-semibold" style={{ color: stage.color }}>
                Stage {active + 1} of {PROCESS_STAGES.length}
              </p>
              <h3 className="pt-1 font-display text-2xl font-bold tracking-tight">{stage.title}</h3>
              <p className="pt-1.5 text-muted-foreground">{stage.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center gap-2 md:pt-6">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full"
            disabled={active === 0}
            onClick={() => setActive(active - 1)}
            aria-label="Previous stage"
          >
            <ChevronLeftIcon />
          </Button>
          <Button className="rounded-full" onClick={() => setActive(active === last ? 0 : active + 1)}>
            {active === last ? "Start over" : "Next stage"}
            <ChevronRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </div>

      <ol className="flex flex-wrap gap-2 pt-5" aria-label="Process stages">
        {PROCESS_STAGES.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-current={i === active ? "step" : undefined}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                i === active ? "border-primary bg-primary text-primary-foreground" : "hover:bg-primary/5",
              )}
            >
              <span className="font-mono text-xs opacity-70">{String(i + 1).padStart(2, "0")}</span>
              {item.title}
            </button>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
