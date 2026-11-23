import { lazy, useCallback, useEffect, useRef, useState } from "react";
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

/**
 * Category tab bar. Sits in a bordered track so it reads as one control, and on small
 * screens shows edge fades + chevron buttons when more tabs are hidden off-screen.
 */
function SkillTabs({
  categories,
  activeIndex,
  onChange,
  reduce,
}: {
  categories: ReadonlyArray<SkillCategory>;
  activeIndex: number;
  onChange: (index: number) => void;
  reduce: boolean;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  // Track whether there is more content to scroll to on either side
  const updateEdges = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    setEdges({
      left: el.scrollLeft > 4,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      ro.disconnect();
    };
  }, [updateEdges]);

  // Keep the active tab centered in view when it changes
  useEffect(() => {
    const el = listRef.current;
    const tab = el?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
    if (!el || !tab) return;
    el.scrollTo({
      left: tab.offsetLeft - (el.clientWidth - tab.offsetWidth) / 2,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [activeIndex, reduce]);

  const scrollByAmount = (dir: 1 | -1) =>
    listRef.current?.scrollBy({ left: dir * 160, behavior: reduce ? "auto" : "smooth" });

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = categories.length - 1;
    let next = activeIndex;
    if (e.key === "ArrowRight") next = activeIndex === last ? 0 : activeIndex + 1;
    else if (e.key === "ArrowLeft") next = activeIndex === 0 ? last : activeIndex - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    onChange(next);
    document.getElementById(`skills-tab-${categories[next].id}`)?.focus();
  };

  return (
    <div className="relative rounded-2xl border border-border bg-muted p-1.5 shadow-inner">
      {/* Edge fades: signal that the row continues */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: edges.left ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute inset-y-1.5 left-1.5 z-10 w-12 rounded-l-xl bg-gradient-to-r from-muted via-muted/80 to-transparent"
      />
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: edges.right ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none absolute inset-y-1.5 right-1.5 z-10 w-12 rounded-r-xl bg-gradient-to-l from-muted via-muted/80 to-transparent"
      />

      {/* Chevron buttons: mouse/touch helpers; keyboard users have the arrow keys */}
      <AnimatePresence>
        {edges.left && (
          <motion.button
            key="left"
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => scrollByAmount(-1)}
            initial={{ opacity: 0, scale: 0.6, x: 6 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.6, x: 6 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-2 top-1/2 z-20 grid size-7 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-border bg-background text-foreground shadow-md"
          >
            <ChevronLeftIcon className="size-4" />
          </motion.button>
        )}
        {edges.right && (
          <motion.button
            key="right"
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => scrollByAmount(1)}
            initial={{ opacity: 0, scale: 0.6, x: -6 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.6, x: -6 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-2 top-1/2 z-20 grid size-7 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-border bg-background text-foreground shadow-md"
          >
            {/* Gentle nudge to hint that the row scrolls */}
            <motion.span
              animate={reduce ? undefined : { x: [0, 3, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="grid place-items-center"
            >
              <ChevronRightIcon className="size-4" />
            </motion.span>
          </motion.button>
        )}
      </AnimatePresence>

      <div
        ref={listRef}
        role="tablist"
        aria-label="Skill categories"
        onKeyDown={onKeyDown}
        className="relative flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((item, i) => {
          const active = i === activeIndex;
          return (
            <motion.button
              key={item.id}
              type="button"
              role="tab"
              id={`skills-tab-${item.id}`}
              aria-selected={active}
              aria-controls="skills-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => onChange(i)}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : i * 0.05, type: "spring", stiffness: 300, damping: 24 }}
              whileTap={reduce ? undefined : { scale: 0.96 }}
              className={cn(
                "relative shrink-0 snap-center cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-semibold transition-[color,border-color,background-color] duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                active
                  ? "border-transparent text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-foreground",
              )}
            >
              {active && (
                <motion.span
                  layoutId="skills-tab"
                  className="absolute inset-0 rounded-xl bg-primary shadow-md shadow-primary/25"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <motion.span
                  aria-hidden
                  animate={{ scale: active ? 1.25 : 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className={cn(
                    "size-2.5 rounded-full ring-2 transition-[box-shadow] duration-200",
                    active ? "ring-primary-foreground/60" : "ring-transparent",
                  )}
                  style={{ backgroundColor: item.color }}
                />
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
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
      intro="The technologies, platforms, and tools I use to build modern web experiences. Explore the floating objects to discover how I use each one."
      className="overflow-hidden bg-gradient-to-b from-background via-secondary/40 to-background"
    >
      <SkillTabs
        categories={SKILL_CATEGORIES}
        activeIndex={categoryIndex}
        onChange={chooseCategory}
        reduce={reducedMotion}
      />

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
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={category.id}
              initial={reducedMotion ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, x: 8 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="font-mono text-xs font-medium tracking-wide text-muted-foreground uppercase"
            >
              {category.label}
            </motion.p>
          </AnimatePresence>
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