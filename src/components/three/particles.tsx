import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { BufferAttribute, BufferGeometry, type Points } from "three";
import { PALETTE } from "./palette.ts";

/** Soft glowing dust drifting around the island. */
export default function Particles({ count, animate }: { count: number; animate: boolean }) {
  const points = useRef<Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Deterministic pseudo-random spread so renders are stable.
      const a = i * 2.399;
      const r = 2 + ((i * 0.618) % 1) * 8;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = -3 + ((i * 0.37) % 1) * 9;
      positions[i * 3 + 2] = Math.sin(a) * r;
    }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(positions, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (!animate || !points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
    points.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color={PALETTE.violet}
        size={0.07}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </points>
  );
}
