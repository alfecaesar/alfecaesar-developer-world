
import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRightIcon,
  CheckIcon,
  ExternalLinkIcon,
  ImageIcon,
  XIcon,
} from "lucide-react";

import SectionShell from "@/components/section-shell.tsx";
import {
  PORTFOLIO_PROJECTS,
  type PortfolioProject,
} from "@/lib/portfolio.ts";
import { cn } from "@/lib/utils.ts";

const EASE = [0.22, 1, 0.36, 1] as const;

const CATEGORY_LABELS: Record<PortfolioProject["category"], string> = {
  shopify: "Shopify",
  wordpress: "WordPress",
  frontend: "Front-End",
  "web-application": "Web Application",
  other: "Other",
};

type PreviewImage = {
  src: string;
  alt: string;
};

type ProjectTab =  "overview" | "challenge" | "solution" | "outcome";

const PROJECT_TABS: { id: ProjectTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "challenge", label: "Challenge" },
  { id: "solution", label: "Solution" },
  { id: "outcome", label: "Outcome" },
];

function isPlaceholderUrl(url: string) {
  return (
    !url ||
    url.includes("your-project-url.com") ||
    url.includes("example.com")
  );
}

function ProjectImage({
  project,
  onImageClick,
}: {
  project: PortfolioProject;
  onImageClick: (image: PreviewImage) => void;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const cover = project.images.cover;

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border bg-secondary/50">
      {!imageFailed && cover.src ? (
        <button
          type="button"
          onClick={() =>
            onImageClick({
              src: cover.src,
              alt: cover.alt || `${project.title} project preview`,
            })
          }
          aria-label={`Preview ${project.title} cover image`}
          className="group/image size-full cursor-zoom-in"
        >
          <img
            src={cover.src}
            alt={cover.alt || `${project.title} project preview`}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="size-full object-cover transition-transform duration-700 ease-out group-hover/image:scale-[1.03]"
          />
        </button>
      ) : (
        <div
          role="img"
          aria-label={`${project.title} image placeholder`}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_50%_35%,hsl(var(--primary)/0.12),transparent_65%)] text-muted-foreground"
        >
          <div className="flex size-16 items-center justify-center rounded-2xl border bg-background/70 shadow-sm">
            <ImageIcon className="size-7" />
          </div>
          <span className="font-mono text-xs">Project preview</span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

      <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 font-mono text-[11px] font-medium text-white backdrop-blur">
        {CATEGORY_LABELS[project.category]}
      </span>
    </div>
  );
}

function ProjectContentTabs({ project }: { project: PortfolioProject }) {
  const [activeTab, setActiveTab] = useState<ProjectTab>("overview");

  const content: Record<ProjectTab, string> = {
    overview: project.overview,
    challenge: project.challenge,
    solution: project.solution,
    outcome: project.outcome,
  };

  const activeContent = content[activeTab];

  return (
    <div className="pt-5">
      <div
        role="tablist"
        aria-label={`${project.title} project details`}
        className="flex gap-1 overflow-x-auto border-b scrollbar-none"
      >
        {PROJECT_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`${project.id}-${tab.id}-tab`}
            aria-selected={activeTab === tab.id}
            aria-controls={`${project.id}-tab-panel`}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative shrink-0 px-3 py-2.5 text-xs font-medium transition-colors",
              activeTab === tab.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}

            {activeTab === tab.id && (
              <motion.span
                layoutId={`${project.id}-active-tab`}
                className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-primary"
                transition={{ duration: 0.25, ease: EASE }}
              />
            )}
          </button>
        ))}
      </div>

      <div
        id={`${project.id}-tab-panel`}
        role="tabpanel"
        aria-labelledby={`${project.id}-${activeTab}-tab`}
        className="min-h-[120px] pt-4"
      >
        <motion.p
          key={activeTab}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="text-sm leading-6 text-muted-foreground text-pretty"
        >
          {activeContent || "No additional information available."}
        </motion.p>
      </div>
    </div>
  );
}

function ProjectBlock({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}) {
  const [selectedImage, setSelectedImage] = useState<PreviewImage | null>(
    null,
  );

  const reversed = index % 2 === 1;
  const liveUrl = project.links.live;
  const caseStudyUrl = project.links.caseStudy;
  const repoUrl = project.links.repository;
  const hasLiveUrl = !isPlaceholderUrl(liveUrl);
  const hasCaseStudyUrl = !isPlaceholderUrl(caseStudyUrl);
  const hasRepoUrl = !isPlaceholderUrl(repoUrl);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: EASE }}
        aria-labelledby={`project-${project.id}`}
        className="group grid items-start gap-6 rounded-[2rem] border bg-card/60 p-4 backdrop-blur sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8"
      >
        <div className={cn("min-w-0", reversed && "lg:order-2")}>
          <ProjectImage
            project={project}
            onImageClick={setSelectedImage}
          />

          {project.images.gallery.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {project.images.gallery.slice(0, 6).map((image) => (
                <button
                  type="button"
                  key={image.src}
                  onClick={() =>
                    setSelectedImage({
                      src: image.src,
                      alt: image.alt,
                    })
                  }
                  aria-label={`Preview ${image.alt}`}
                  className="group/gallery relative aspect-[16/9] min-w-0 cursor-zoom-in overflow-hidden rounded-xl border bg-secondary/60"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover/gallery:scale-105"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="px-1 pb-2 lg:px-0">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="font-semibold text-primary">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="text-muted-foreground">/</span>

            <span className="text-muted-foreground">{project.year}</span>

            {project.featured && (
              <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                Featured
              </span>
            )}

            {project.status === "confidential" && (
              <span className="rounded-full border bg-secondary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Confidential
              </span>
            )}
          </div>

          <h3
            id={`project-${project.id}`}
            className="pt-3 font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl"
          >
            {project.title}
          </h3>

          <p className="pt-2 text-base font-medium text-muted-foreground text-pretty">
            {project.subtitle}
          </p>

          <ProjectContentTabs project={project} />

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span>
              <span className="font-semibold text-foreground">Client:</span>{" "}
              {project.client}
            </span>

            <span>
              <span className="font-semibold text-foreground">Role:</span>{" "}
              {project.role}
            </span>
          </div>

          {project.responsibilities.length > 0 && (
            <ul className="grid grid-cols-1 gap-x-4 gap-y-2 pt-5">
              {project.responsibilities.slice(0, 4).map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckIcon className="size-3" strokeWidth={2.5} />
                  </span>

                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {project.tools.length > 0 && (
            <div className="pt-5">
              <p className="pb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Tools & Technologies
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border bg-background/70 px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.services.length > 0 && (
            <div className="pt-5">
              <p className="pb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Services
              </p>

              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-3">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="flex items-center gap-1 text-xs font-medium text-foreground/80"
                  >
                    <ArrowUpRightIcon className="size-3.5 text-muted-foreground" />
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(hasLiveUrl || hasCaseStudyUrl || hasRepoUrl) && (
            <div className="flex flex-wrap gap-3 pt-6">
              {hasLiveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Visit Website
                  <ArrowUpRightIcon className="size-4" />
                </a>
              )}

              {hasRepoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  View Repository
                  <ArrowUpRightIcon className="size-4" />
                </a>
              )}

              {hasCaseStudyUrl && (
                <a
                  href={caseStudyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full border bg-background/70 px-5 text-sm font-semibold transition-colors hover:bg-secondary"
                >
                  Case Study
                  <ExternalLinkIcon className="size-3.5" />
                </a>
              )}
            </div>
          )}
        </div>
      </motion.article>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image preview"
            className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
          >
            <XIcon className="size-5" />
          </button>

          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] max-w-full rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
}

/** Portfolio: selected projects presented as alternating image-and-details blocks. */
export default function PortfolioSection() {
  const projects = PORTFOLIO_PROJECTS;

  return (
    <SectionShell
      id="portfolio"
      eyebrow="// selected work"
      title="Featured Projects"
      intro="A selection of websites and digital experiences I've helped build, customize, and improve."
    >
      {projects.length > 0 ? (
        <div className="space-y-6">
          {projects.map((project, index) => (
            <ProjectBlock
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-dashed bg-card/40 px-6 py-16 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-secondary text-muted-foreground">
            <ImageIcon className="size-6" />
          </div>

          <h3 className="pt-4 font-display text-xl font-semibold">
            Projects coming soon
          </h3>

          <p className="mx-auto max-w-md pt-2 text-sm text-muted-foreground">
            Portfolio projects will appear here once they have been added to
            the project data.
          </p>
        </div>
      )}
      
      
      <div className="flex justify-center mt-5">
        <a
          href="https://alfecaesar-portfolio2026.vercel.app/#portfolio"
          target="_blank"
          rel="noreferrer"
          className="min-w-sm inline-flex h-10 items-center justify-center gap-2 rounded-full border bg-background/70 px-5 text-sm font-semibold transition-colors hover:bg-secondary"
        >
          View More Projects
          <ExternalLinkIcon className="size-3.5" />
        </a>
      </div>
    </SectionShell>
  );
}
