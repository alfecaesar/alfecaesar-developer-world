import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils, type Group } from "three";

/** Tilts its children toward the pointer for a subtle, responsive feel. */
export default function PointerTilt({
  strength = 0.25,
  spin = 0,
  children,
}: {
  strength?: number;
  /** Constant idle rotation speed around Y, in radians per second. */
  spin?: number;
  children: ReactNode;
}) {
  const group = useRef<Group>(null);
  const idle = useRef(0);

  useFrame((state, delta) => {
    if (!group.current) return;
    idle.current += delta * spin;
    const { x, y } = state.pointer;
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, idle.current + x * strength, 4, delta);
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, -y * strength * 0.3, 4, delta);
  });

  return <group ref={group}>{children}</group>;
}
