import { useEffect, useState } from "react";
import { SECTIONS, type SectionId } from "@/lib/sections.ts";

/** Tracks which page section is currently in the middle of the viewport. */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const elements = SECTIONS.map((section) => document.getElementById(section.id)).filter(
      (element): element is HTMLElement => element !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const match = SECTIONS.find((section) => section.id === entry.target.id);
            if (match) setActive(match.id);
          }
        }
      },
      // A thin band across the viewport middle decides the active section.
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return active;
}
