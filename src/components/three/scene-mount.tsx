import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { usePageVisible, useWebGLSupport } from "@/hooks/use-environment.ts";

type SceneMountProps = {
  /** Renders the lazy scene; receives whether it should currently render frames. */
  children: (running: boolean) => ReactNode;
  /** Shown during SSR, while loading, and when WebGL is unavailable. */
  fallback: ReactNode;
  className?: string;
};

/**
 * Mounts a 3D scene only in the browser, only with WebGL, and pauses it when
 * scrolled off-screen or when the tab is hidden.
 */
export default function SceneMount({ children, fallback, className }: SceneMountProps) {
  return (
    <div className={className}>
      <ClientOnly fallback={fallback}>
        <SceneGate fallback={fallback}>{children}</SceneGate>
      </ClientOnly>
    </div>
  );
}

function SceneGate({ children, fallback }: Omit<SceneMountProps, "className">) {
  const webgl = useWebGLSupport();
  const pageVisible = usePageVisible();
  const container = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = container.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!webgl) return <>{fallback}</>;

  return (
    <div ref={container} className="size-full">
      <Suspense fallback={fallback}>{children(inView && pageVisible)}</Suspense>
    </div>
  );
}
