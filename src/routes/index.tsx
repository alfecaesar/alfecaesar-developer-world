import { createFileRoute } from "@tanstack/react-router";
import CustomCursor from "@/components/custom-cursor.tsx";
import SectionShell from "@/components/section-shell.tsx";
import SiteFooter from "@/components/site-footer.tsx";
import SiteNav from "@/components/site-nav.tsx";
import HeroSection from "./-components/hero-section.tsx";
import AboutSection from "./-components/about-section.tsx";
import SkillsSection from "./-components/skills-section.tsx";
import ServicesSection from "./-components/services-section.tsx";
import ExperienceSection from "./-components/experience-section.tsx";
import ProcessSection from "./-components/process-section.tsx";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteNav />
      <CustomCursor />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ServicesSection />
        <ExperienceSection />
        <ProcessSection />
        {/* Contact is built in the next milestone; the heading keeps the nav link working */}
        <SectionShell id="contact" eyebrow="// contact" title="Have an Idea? Let's Build It Together." />
      </main>
      <SiteFooter />
    </>
  );
}
