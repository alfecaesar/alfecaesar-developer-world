import { lazy, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeftIcon, ChevronRightIcon, MousePointerClickIcon } from "lucide-react";
import SectionShell from "@/components/section-shell.tsx";
import SceneMount from "@/components/three/scene-mount.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useMediaQuery } from "@/hooks/use-environment.ts";
import { SKILL_CATEGORIES, type SkillCategory } from "@/lib/skills.ts";
import { cn } from "@/lib/utils.ts";

const SkillsScene = lazy(() => import("@/components/three/skills-scene.tsx"));

const EASE = [0.22, 1, 0.36, 1] as const;

/** Accessible list of the category's skills; also the no-WebGL view. */
function SkillChips({
  category,
  selected,
  onSelect,
  className,
}: {
  category: SkillCategory;
  selected: number;
  onSelect: (index: number) => void;
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label={`${category.label} skills`}>
      {category.skills.map((skill, i) => (
        <li key={skill.name}>
          <button
            type="button"
            onClick={() => onSelect(i)}
            aria-pressed={i === selected}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
              i === selected
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-background/70 hover:border-primary/40 hover:bg-primary/5",
            )}
          >
            <span aria-hidden className="size-2 rounded-full" style={{ backgroundColor: skill.color }} />
            {skill.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

/** "My Developer Toolkit": category tabs, a 3D object field, and an info panel. */
export default function SkillsSection() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [selected, setSelected] = useState(0);
  const compact = useMediaQuery("(max-width: 767px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const category = SKILL_CATEGORIES[categoryIndex];
  const skill = category.skills[selected];

  const chooseCategory = (index: number) => {
    setCategoryIndex(index);
    setSelected(0);
  };
  const step = (direction: 1 | -1) => {
    const count = category.skills.length;
    setSelected((current) => (current + direction + count) % count);
  };

  return (
    <SectionShell
      id="skills"
      eyebrow="// skills"
      title="My Developer Toolkit"
      intro="The platforms, languages and tools I use every day. Click any floating object to learn how I use it."
      className="overflow-hidden bg-gradient-to-b from-background via-secondary/40 to-background"
    >
      <div role="tablist" aria-label="Skill categories" className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
        {SKILL_CATEGORIES.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            id={`skills-tab-${item.id}`}
            aria-selected={i === categoryIndex}
            aria-controls="skills-panel"
            onClick={() => chooseCategory(i)}
            className={cn(
              "relative shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              i === categoryIndex ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {i === categoryIndex && (
              <motion.span
                layoutId="skills-tab"
                className="absolute inset-0 rounded-full bg-primary shadow-md shadow-primary/30"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <span aria-hidden className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div
        id="skills-panel"
        role="tabpanel"
        aria-labelledby={`skills-tab-${category.id}`}
        className="grid gap-5 pt-6 lg:grid-cols-[1.5fr_1fr]"
      >
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/15 bg-gradient-to-br from-[#ece8ff] via-[#f3f1ff] to-[#e1f5fb] dark:from-[#1e1a4d] dark:via-[#191a42] dark:to-[#122a3d]">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(124,92,255,0.16)_1px,transparent_0)] [background-size:24px_24px]" />
          <SceneMount
            className="relative h-[480px] sm:h-[460px]"
            fallback={
              <div className="flex size-full items-center p-6">
                <SkillChips category={category} selected={selected} onSelect={setSelected} />
              </div>
            }
          >
            {(running) => (
              <SkillsScene
                category={category}
                selected={selected}
                onSelect={setSelected}
                compact={compact}
                animate={!reducedMotion}
                running={running}
              />
            )}
          </SceneMount>
          <p className="pointer-events-none absolute bottom-4 left-5 flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <MousePointerClickIcon className="size-3.5" />
            {category.skills.length} objects · click to inspect
          </p>
        </div>

        <aside aria-live="polite" className="flex flex-col rounded-[2rem] border bg-card p-6 shadow-sm">
          <p className="font-mono text-xs font-medium tracking-wide text-muted-foreground uppercase">
            {category.label}
          </p>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${category.id}-${skill.name}`}
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: EASE }}
              className="flex-1 pt-4"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex size-12 items-center justify-center rounded-2xl font-display text-lg font-bold text-white shadow-lg"
                  style={{ backgroundColor: skill.color }}
                >
                  {skill.name.charAt(0)}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{skill.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.tagline}</p>
                </div>
              </div>
              <p className="pt-5 text-pretty text-foreground/85">{skill.summary}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between gap-2 pt-6">
            <span className="font-mono text-xs text-muted-foreground">
              {String(selected + 1).padStart(2, "0")} / {String(category.skills.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <Button size="icon" variant="secondary" className="rounded-full" onClick={() => step(-1)} aria-label="Previous skill">
                <ChevronLeftIcon />
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full" onClick={() => step(1)} aria-label="Next skill">
                <ChevronRightIcon />
              </Button>
            </div>
          </div>

          <div className="mt-5 border-t pt-5">
            <p className="pb-3 text-xs font-medium text-muted-foreground">All {category.label.toLowerCase()} tools</p>
            <SkillChips category={category} selected={selected} onSelect={setSelected} />
          </div>
        </aside>
      </div>
    </SectionShell>
  );
}
