import { lazy, useState } from "react";
import { motion } from "motion/react";
import { CheckIcon, MousePointerClickIcon } from "lucide-react";
import SectionShell from "@/components/section-shell.tsx";
import SceneMount from "@/components/three/scene-mount.tsx";
import { useMediaQuery } from "@/hooks/use-environment.ts";
import { SERVICES, type Service } from "@/lib/services.ts";
import { cn } from "@/lib/utils.ts";

const ServiceScene = lazy(() => import("@/components/three/service-scene.tsx"));

const EASE = [0.22, 1, 0.36, 1] as const;

function ServiceFallback({ service }: { service: Service }) {
  return (
    <div role="img" aria-label={`${service.title} illustration`} className="flex size-full items-center justify-center">
      <div
        className="size-32 rotate-6 rounded-[2rem] shadow-2xl"
        style={{ background: `linear-gradient(135deg, ${service.accent}, #7c5cff)` }}
      />
    </div>
  );
}

function ServiceBlock({ service, index }: { service: Service; index: number }) {
  const [clicks, setClicks] = useState(0);
  const compact = useMediaQuery("(max-width: 767px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const reversed = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: EASE }}
      aria-labelledby={`service-${service.id}`}
      className="grid items-center gap-6 rounded-[2rem] border bg-card/60 p-4 backdrop-blur sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8"
    >
      <div
        className={cn(
          "relative h-[300px] overflow-hidden rounded-[1.5rem] sm:h-[360px]",
          reversed && "lg:order-2",
        )}
        style={{ background: `radial-gradient(circle at 50% 40%, ${service.accent}33, transparent 70%)` }}
      >
        <div aria-hidden className="absolute inset-0 bg-secondary/40" />
        <SceneMount className="relative size-full" fallback={<ServiceFallback service={service} />}>
          {(running) => (
            <ServiceScene
              kind={service.kind}
              accent={service.accent}
              clicks={clicks}
              onInteract={() => setClicks((count) => count + 1)}
              compact={compact}
              animate={!reducedMotion}
              running={running}
            />
          )}
        </SceneMount>
        <button
          type="button"
          onClick={() => setClicks((count) => count + 1)}
          className="absolute bottom-3 left-3 flex cursor-pointer items-center gap-1.5 rounded-full bg-background/85 px-3 py-1.5 font-mono text-[11px] font-medium shadow-sm backdrop-blur"
        >
          <MousePointerClickIcon className="size-3.5" />
          {service.hint}
        </button>
      </div>

      <div className="px-1 pb-2 lg:px-0">
        <p className="font-mono text-sm font-semibold" style={{ color: service.accent }}>
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 id={`service-${service.id}`} className="pt-2 font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl">
          {service.title}
        </h3>
        <p className="pt-3 text-lg text-pretty text-muted-foreground">{service.description}</p>
        <ul className="grid gap-x-4 gap-y-2.5 pt-6 sm:grid-cols-2">
          {service.items.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.04, ease: EASE }}
              className="flex items-start gap-2.5 text-sm font-medium"
            >
              <span
                className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-white"
                style={{ backgroundColor: service.accent }}
              >
                <CheckIcon className="size-3" strokeWidth={3} />
              </span>
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

/** "What I Can Do": four services, each with its own interactive 3D illustration. */
export default function ServicesSection() {
  return (
    <SectionShell
      id="services"
      eyebrow="// services"
      title="What I Can Do"
      intro="From storefronts to custom applications, here is how I can help. Each illustration is interactive, so give it a click."
    >
      <div className="space-y-6">
        {SERVICES.map((service, i) => (
          <ServiceBlock key={service.id} service={service} index={i} />
        ))}
      </div>
    </SectionShell>
  );
}
