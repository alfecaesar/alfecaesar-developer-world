import { useState } from "react";
import { motion } from "motion/react";
import { MenuIcon, Volume2Icon, VolumeXIcon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet.tsx";
import ThemeToggle from "@/components/theme-toggle.tsx";
import { useActiveSection } from "@/hooks/use-active-section.ts";
import { useAmbientAudio } from "@/hooks/use-ambient-audio.ts";
import { PROFILE } from "@/lib/profile.ts";
import { SECTIONS, scrollToSection, type SectionId } from "@/lib/sections.ts";
import { cn } from "@/lib/utils.ts";

/** Floating pill navigation with active indicator, audio toggle and mobile menu. */
export default function SiteNav() {
  const active = useActiveSection();
  const audio = useAmbientAudio();
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (id: SectionId) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-full border border-white/50 bg-background/70 py-1.5 pr-1.5 pl-2 shadow-[0_10px_40px_-12px_rgba(76,52,200,0.35)] backdrop-blur-xl dark:border-white/10"
      >
        <a href="#home" onClick={go("home")} className="flex items-center gap-2 rounded-full pr-2 cursor-pointer">
          <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#38d3ea] font-display text-sm font-bold text-white">
            {PROFILE.initials}
          </span>
          <span className="hidden font-display text-sm font-semibold sm:inline">{PROFILE.shortName}</span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={go(section.id)}
                aria-current={active === section.id ? "true" : undefined}
                className={cn(
                  "relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors cursor-pointer",
                  active === section.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active === section.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {section.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={audio.toggle}
            aria-pressed={audio.playing}
            aria-label={audio.playing ? "Turn off ambient sound" : "Turn on ambient sound"}
            className="rounded-full"
          >
            {audio.playing ? <Volume2Icon /> : <VolumeXIcon />}
          </Button>
          <ThemeToggle />
          <Button
            render={<a href="#contact" onClick={go("contact")} />}
            nativeButton={false}
            className="hidden rounded-full px-4 sm:inline-flex"
          >
            Let&apos;s talk
          </Button>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" className="rounded-full lg:hidden" aria-label="Open menu" />}
            >
              <MenuIcon />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-6">
              <SheetTitle className="font-display text-lg">Navigate</SheetTitle>
              <ul className="mt-2 flex flex-col gap-1">
                {SECTIONS.map((section, i) => (
                  <motion.li
                    key={section.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3, ease: "easeOut" }}
                  >
                    <a
                      href={`#${section.id}`}
                      onClick={go(section.id)}
                      aria-current={active === section.id ? "true" : undefined}
                      className={cn(
                        "block rounded-xl px-4 py-3 font-medium transition-colors cursor-pointer",
                        active === section.id ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                      )}
                    >
                      {section.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <Button
                render={<a href="#contact" onClick={go("contact")} />}
                nativeButton={false}
                size="lg"
                className="mt-4 rounded-full"
              >
                Let&apos;s Work Together
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
