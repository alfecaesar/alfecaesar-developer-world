import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type CountUpProps = {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
};

/** Counts up to a number once it scrolls into view. Renders the final value on the server. */
export default function CountUp({ to, from = 0, duration = 1.8, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView || reduced) return;
    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => {
        node.textContent = Math.round(value).toString();
      },
    });
    return () => controls.stop();
  }, [inView, reduced, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {to}
    </span>
  );
}
