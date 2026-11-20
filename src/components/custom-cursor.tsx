import { useEffect, useRef, useState } from "react";
import { onCursorHover } from "@/lib/cursor-events.ts";
import { useMediaQuery } from "@/hooks/use-environment.ts";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, [data-cursor]";

/** A soft ring cursor for mouse users. Hidden on touch and reduced motion. */
export default function CustomCursor() {
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reducedMotion;
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [sceneHover, setSceneHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      pos.x = event.clientX;
      pos.y = event.clientY;
      setVisible(true);
      const target = event.target;
      setHovering(target instanceof Element && target.closest(INTERACTIVE) !== null);
    };
    const onLeave = () => setVisible(false);
    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.2;
      ringPos.y += (pos.y - ringPos.y) * 0.2;
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    const offScene = onCursorHover(setSceneHover);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      offScene();
    };
  }, [enabled]);

  if (!enabled) return null;
  const active = hovering || sceneHover;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: visible ? 1 : 0 }}>
      <div ref={ring} className="absolute top-0 left-0">
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/70 transition-[width,height,background-color] duration-200 ${
            active ? "size-12 bg-primary/10" : "size-8"
          }`}
        />
      </div>
      <div ref={dot} className="absolute top-0 left-0">
        <div className="size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
      </div>
    </div>
  );
}
