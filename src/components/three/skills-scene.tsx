import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { MathUtils, type Group, type Mesh } from "three";
import type { SkillCategory } from "@/lib/skills.ts";
import FloatingObject from "./floating-object.tsx";
import { PALETTE, type Vec3 } from "./palette.ts";
import PointerTilt from "./pointer-tilt.tsx";
import SkillShapeMesh from "./skill-shape.tsx";
import StageCanvas from "./stage.tsx";

export type SkillsSceneProps = {
  category: SkillCategory;
  selected: number;
  onSelect: (index: number) => void;
  compact: boolean;
  animate: boolean;
  running: boolean;
};

/** Lays skills out in rows of floating platforms, centered on the origin. */
function layout(count: number, compact: boolean): { positions: Vec3[]; rows: number } {
  const cols = compact ? 3 : Math.min(7, Math.ceil(count / 2));
  const rows = Math.ceil(count / cols);
  const spacingX = 1.6;
  const spacingY = compact ? 1.85 : 1.75;
  const positions = Array.from({ length: count }, (_, i): Vec3 => {
    const row = Math.floor(i / cols);
    const inRow = Math.min(cols, count - row * cols);
    const col = i % cols;
    const x = (col - (inRow - 1) / 2) * spacingX;
    const y = ((rows - 1) / 2 - row) * spacingY;
    // Alternate depth gives the rows a staggered, floating-world look
    const z = (col % 2 === 0 ? 0 : -0.45) - row * 0.2;
    return [x, y, z];
  });
  return { positions, rows };
}

/** Scales children in from zero after a short staggered delay. */
function SpawnIn({ delay, animate, children }: { delay: number; animate: boolean; children: ReactNode }) {
  const group = useRef<Group>(null);
  const elapsed = useRef(0);
  useFrame((_, delta) => {
    if (!group.current) return;
    elapsed.current += delta;
    const target = !animate || elapsed.current > delay ? 1 : 0.001;
    group.current.scale.setScalar(animate ? MathUtils.damp(group.current.scale.x, target, 7, delta) : 1);
  });
  return (
    <group ref={group} scale={animate ? 0.001 : 1}>
      {children}
    </group>
  );
}

function Pedestal({ color, active, animate }: { color: string; active: boolean; animate: boolean }) {
  const glow = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (!glow.current) return;
    const pulse = animate ? 1 + Math.sin(state.clock.elapsedTime * 4) * 0.08 : 1;
    const target = active ? pulse * 1.25 : 0.001;
    glow.current.scale.setScalar(MathUtils.damp(glow.current.scale.x, target, 8, delta));
  });
  return (
    <group position={[0, -0.72, 0]}>
      <mesh>
        <cylinderGeometry args={[0.5, 0.42, 0.16, 6]} />
        <meshStandardMaterial color={active ? PALETTE.white : PALETTE.stone} flatShading />
      </mesh>
      <mesh position={[0, -0.18, 0]}>
        <coneGeometry args={[0.38, 0.32, 6]} />
        <meshStandardMaterial color={PALETTE.rock} flatShading />
      </mesh>
      <mesh ref={glow} position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={0.001}>
        <ringGeometry args={[0.36, 0.44, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

/** Interactive floating tech objects for one skill category. */
export default function SkillsScene({ category, selected, onSelect, compact, animate, running }: SkillsSceneProps) {
  const { positions, rows } = layout(category.skills.length, compact);
  const distance = compact ? 4 + rows * 2.2 : 10.5;

  return (
    <StageCanvas compact={compact} running={running} cameraPosition={[0, 0.6, distance]} fov={compact ? 42 : 36}>
      <PointerTilt strength={animate ? 0.18 : 0}>
        {/* Keyed by category so a new category re-plays the entrance */}
        <group key={category.id}>
          {category.skills.map((skill, i) => (
            <group key={skill.name} position={positions[i]}>
              <SpawnIn delay={i * 0.06} animate={animate}>
                <Pedestal color={skill.color} active={i === selected} animate={animate} />
                <FloatingObject
                  label={skill.name}
                  position={[0, 0, 0]}
                  scale={0.62}
                  animate={animate}
                  spinSpeed={0.5}
                  active={i === selected}
                  onSelect={() => onSelect(i)}
                >
                  <SkillShapeMesh shape={skill.shape} color={skill.color} />
                </FloatingObject>
              </SpawnIn>
            </group>
          ))}
        </group>
      </PointerTilt>
      {!compact && (
        <Sparkles count={36} scale={[11, 5, 3]} size={2.5} speed={animate ? 0.3 : 0} color={category.color} />
      )}
    </StageCanvas>
  );
}
