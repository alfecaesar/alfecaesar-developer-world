export const SECTIONS = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "services", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
  ] as const;
  
  export type SectionId = (typeof SECTIONS)[number]["id"];
  
  export function findSection(id: string) {
    return SECTIONS.find((section) => section.id === id);
  }
  
  /** Smoothly scrolls to a section, honoring the reduced-motion preference. */
  export function scrollToSection(id: SectionId) {
    const element = document.getElementById(id);
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  }
  