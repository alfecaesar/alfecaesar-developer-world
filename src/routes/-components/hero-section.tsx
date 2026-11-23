import { lazy, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRightIcon, MapPinIcon, MousePointerClickIcon, Undo2Icon, Mail, FileUser, BriefcaseBusiness, ArrowUpRight, MessageCircle, } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import IslandFallback from "@/components/three/island-fallback.tsx";
import SceneMount from "@/components/three/scene-mount.tsx";
import { useMediaQuery } from "@/hooks/use-environment.ts";
import { PROFILE } from "@/lib/profile.ts";
import { scrollToSection } from "@/lib/sections.ts";

const HeroScene = lazy(() => import("@/components/three/hero-scene.tsx"));

const EASE = [0.22, 1, 0.36, 1] as const;

/** First screen: intro copy on the left, the floating island on the right. */
export default function HeroSection() {
  const [exploring, setExploring] = useState(false);
  const compact = useMediaQuery("(max-width: 767px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100svh] overflow-hidden bg-gradient-to-b from-[#e7e4ff] via-[#eef6ff] to-background dark:from-[#1a1747] dark:via-[#161a3d] dark:to-background"
    >
      <SkyBackdrop />

      <div className="mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 items-center gap-4 px-5 pt-28 pb-20 md:grid-cols-[1fr_1.15fr] md:gap-0 md:px-8 md:pt-24">
        <AnimatePresence initial={false}>
          {!exploring && (
            <motion.div
              key="intro"
              className="relative z-10 order-2 max-w-xl md:order-1"
              exit={{ opacity: 0, x: -40, transition: { duration: 0.4 } }}
            >
              <motion.div
                initial={{ y: 12 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-3 py-1.5 text-xs font-semibold backdrop-blur"
              >
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:hidden" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
                </span>
                {PROFILE.availability}
              </motion.div>

              <p className="pt-6 font-mono text-sm font-medium text-primary">
                {"// Welcome to my developer world"}
              </p>
              <h1
                id="hero-title"
                className="pt-3 font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl lg:text-5xl mb-5"
              >
                Hello, I&apos;m{" "}
                <span className="bg-gradient-to-r from-primary via-[#4f8dff] to-[#22b8d4] bg-clip-text text-transparent dark:to-[#7de8f5]">
                  {PROFILE.name}
                </span>
                .
              </h1>
              <h3 className="text-2xl font-bold font-semibold">{ PROFILE.title }</h3>
              <ul className="flex flex-wrap gap-x-3 gap-y-1 pt-5 text-sm font-semibold text-foreground/80 sm:text-base">
                {PROFILE.roles.map((role, i) => (
                  <li key={role} className="flex items-center gap-3">
                    {i > 0 && <span aria-hidden className="size-1.5 rounded-full bg-accent" />}
                    {role}
                  </li>
                ))}
              </ul>
              <p className="pt-5 text-lg text-pretty text-muted-foreground sm:text-xl">
                &ldquo;{PROFILE.statement}&rdquo;
              </p>
              <p className="flex items-center gap-1.5 pt-4 text-sm text-muted-foreground">
                <MapPinIcon className="size-4 text-primary" />
                Based in {PROFILE.location}
              </p>

              <div className="flex flex-wrap gap-3 pt-8">
                { /* TO DO: NEED TO FIX THE HERO SCENE FIRST
                <Button size="lg" className="h-12 rounded-full px-6 text-base shadow-lg shadow-primary/30" onClick={() => setExploring(true)}>
                  Explore My World
                  <MousePointerClickIcon data-icon="inline-end" />
                </Button>
                */ }
                
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-primary/30 px-6 text-base transition-all hover:border-primary hover:bg-primary/5 hover:-translate-y-0.5 hover:shadow-primary/30"
                  onClick={() => scrollToSection("portfolio")}
                >
                  <BriefcaseBusiness className="size-4" />
                  Explore My Works
                </Button>

                <Button
                  size="lg"
                  className="h-12 rounded-full px-6 text-base shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:shadow-primary/30"
                  onClick={() => scrollToSection("contact")}
                >
                  <MessageCircle className="size-4" />
                  Get in Touch
                </Button>
                {/* <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PROFILE.email)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
                >
                  <Mail className="size-4" />
                  Get in Touch
                </a> */}

                {/* <a
                  href={PROFILE.links.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-background/60 px-6 text-base font-medium text-foreground backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent"
                >
                  <FileUser className="size-4" />
                  View Resume
                </a> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={
            exploring
              ? "absolute inset-0 z-0"
              : "relative order-1 h-[46svh] min-h-[320px] md:order-2 md:h-[min(78svh,760px)]"
          }
        >
          <SceneMount className="size-full" fallback={<IslandFallback />}>
            {(running) => (
              <HeroScene exploring={exploring} compact={compact} animate={!reducedMotion} running={running} />
            )}
          </SceneMount>
        </div>
      </div>

      <AnimatePresence>
        {exploring && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.5 } }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute inset-x-0 bottom-8 z-10 flex justify-center px-4"
          >
            <div className="flex max-w-lg flex-col items-center gap-3 rounded-3xl border border-white/50 bg-background/80 p-5 text-center shadow-xl backdrop-blur-xl dark:border-white/10">
              <p className="font-display text-lg font-semibold">This is where the magic happens.</p>
              <p className="text-sm text-muted-foreground">
                Hover the floating objects, move your mouse to look around, then keep scrolling to meet the developer.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button variant="secondary" className="rounded-full" onClick={() => setExploring(false)}>
                  <Undo2Icon data-icon="inline-start" />
                  Back to island
                </Button>
                <Button className="rounded-full" onClick={() => scrollToSection("about")}>
                  Meet the developer
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!exploring && <ScrollIndicator />}
    </section>
  );
}

function SkyBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-32 -left-32 size-[520px] rounded-full bg-[#a58bff]/30 blur-3xl dark:bg-[#7c5cff]/25" />
      <div className="absolute top-1/3 -right-40 size-[600px] rounded-full bg-[#7de8f5]/35 blur-3xl dark:bg-[#38d3ea]/15" />
      <div className="absolute bottom-0 left-1/3 size-[400px] rounded-full bg-[#ff8fc6]/20 blur-3xl dark:bg-[#ff8fc6]/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(124,92,255,0.16)_1px,transparent_0)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
    </div>
  );
}

function ScrollIndicator() {
  return (
    <button
      type="button"
      onClick={() => scrollToSection("about")}
      className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium text-muted-foreground cursor-pointer md:flex"
      aria-label="Scroll to About section"
    >
      <span className="flex h-10 w-6 justify-center rounded-full border-2 border-muted-foreground/40 pt-2">
        <motion.span
          className="block size-1.5 rounded-full bg-primary"
          animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
      Scroll
    </button>
  );
}
