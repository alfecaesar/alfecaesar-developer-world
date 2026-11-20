import { useRef, useState, type ReactNode } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { MathUtils, type Group } from "three";
import { setCursorHover } from "@/lib/cursor-events.ts";
import type { Vec3 } from "./palette.ts";
import SpriteLabel from "./sprite-label.tsx";

type FloatingObjectProps = {
  label: string;
  position: Vec3;
  scale?: number;
  animate: boolean;
  spinSpeed?: number;
  active?: boolean;
  onSelect?: () => void;
  children: ReactNode;
};

/** A floating, hoverable 3D object with a label tooltip. */
export default function FloatingObject({
  label,
  position,
  scale = 1,
  animate,
  spinSpeed = 0.4,
  active = false,
  onSelect,
  children,
}: FloatingObjectProps) {
  const inner = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const highlighted = hovered || active;

  useFrame((_, delta) => {
    if (!inner.current) return;
    const target = highlighted ? 1.3 : 1;
    const next = MathUtils.damp(inner.current.scale.x, target, 8, delta);
    inner.current.scale.setScalar(next);
    if (animate) inner.current.rotation.y += delta * (highlighted ? spinSpeed * 4 : spinSpeed);
  });

  const handleOver = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(true);
    setCursorHover(true);
    document.body.style.cursor = "pointer";
  };
  const handleOut = () => {
    setHovered(false);
    setCursorHover(false);
    document.body.style.cursor = "";
  };

  return (
    <Float
      position={position}
      speed={animate ? 1.6 : 0}
      rotationIntensity={animate ? 0.4 : 0}
      floatIntensity={animate ? 0.8 : 0}
    >
      <group scale={scale}>
        <group
          ref={inner}
          onPointerOver={handleOver}
          onPointerOut={handleOut}
          onClick={(event) => {
            event.stopPropagation();
            onSelect?.();
          }}
        >
          {children}
        </group>
        {highlighted && <SpriteLabel text={label} position={[0, 1, 0]} height={0.3 / scale} />}
      </group>
    </Float>
  );
}
