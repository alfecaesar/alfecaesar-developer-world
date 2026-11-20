import { useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { CatmullRomCurve3, MathUtils, Vector3, type Group, type Mesh } from "three";
import { setCursorHover } from "@/lib/cursor-events.ts";
import type { ProcessStage } from "@/lib/services.ts";
import { PALETTE, type Vec3 } from "./palette.ts";
import PointerTilt from "./pointer-tilt.tsx";
import SpriteLabel from "./sprite-label.tsx";
import StageCanvas from "./stage.tsx";

export type ProcessSceneProps = {
  stages: ProcessStage[];
  active: number;
  onSelect: (index: number) => void;
  compact: boolean;
  animate: boolean;
  running: boolean;
};

/** Small icon for each stage, built from primitives. */
function StageIcon({ id, color }: { id: ProcessStage["id"]; color: string }) {
  switch (id) {
    case "discover":
      // Magnifying glass
      return (
        <group rotation={[0, 0, -0.6]}>
          <mesh position={[0, 0.12, 0]}>
            <torusGeometry args={[0.22, 0.06, 10, 28]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <circleGeometry args={[0.2, 24]} />
            <meshStandardMaterial color={PALETTE.white} transparent opacity={0.6} />
          </mesh>
          <mesh position={[0, -0.24, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.3, 10]} />
            <meshStandardMaterial color={PALETTE.frame} />
          </mesh>
        </group>
      );
    case "plan":
      // Clipboard with checklist
      return (
        <group>
          <RoundedBox args={[0.5, 0.62, 0.06]} radius={0.04}>
            <meshStandardMaterial color={PALETTE.white} />
          </RoundedBox>
          <mesh position={[0, 0.32, 0.03]}>
            <boxGeometry args={[0.22, 0.08, 0.04]} />
            <meshStandardMaterial color={color} />
          </mesh>
          {[0.12, -0.02, -0.16].map((y) => (
            <mesh key={y} position={[0.04, y, 0.04]}>
              <boxGeometry args={[0.28, 0.05, 0.01]} />
              <meshStandardMaterial color={color} />
            </mesh>
          ))}
        </group>
      );
    case "design":
      // Pencil
      return (
        <group rotation={[0, 0, -0.8]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.55, 6]} />
            <meshStandardMaterial color={color} flatShading />
          </mesh>
          <mesh position={[0, -0.36, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.08, 0.18, 6]} />
            <meshStandardMaterial color={PALETTE.floor} flatShading />
          </mesh>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.08, 6]} />
            <meshStandardMaterial color={PALETTE.white} />
          </mesh>
        </group>
      );
    case "develop":
      // Code brackets
      return (
        <group>
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 0.18, 0, 0]}>
              <mesh position={[0, 0.09, 0]} rotation={[0, 0, side * 0.7]}>
                <boxGeometry args={[0.06, 0.24, 0.06]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
              </mesh>
              <mesh position={[0, -0.09, 0]} rotation={[0, 0, -side * 0.7]}>
                <boxGeometry args={[0.06, 0.24, 0.06]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
              </mesh>
            </group>
          ))}
          <mesh rotation={[0, 0, 0.35]}>
            <boxGeometry args={[0.05, 0.42, 0.05]} />
            <meshStandardMaterial color={PALETTE.white} />
          </mesh>
        </group>
      );
    case "test":
      // Check mark in a shield-like disc
      return (
        <group>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.06, 6]} />
            <meshStandardMaterial color={color} flatShading />
          </mesh>
          <mesh position={[-0.06, -0.03, 0.05]} rotation={[0, 0, 0.8]}>
            <boxGeometry args={[0.06, 0.16, 0.03]} />
            <meshStandardMaterial color={PALETTE.white} />
          </mesh>
          <mesh position={[0.06, 0.03, 0.05]} rotation={[0, 0, -0.6]}>
            <boxGeometry args={[0.06, 0.3, 0.03]} />
            <meshStandardMaterial color={PALETTE.white} />
          </mesh>
        </group>
      );
    case "launch":
      // Rocket
      return (
        <group>
          <mesh>
            <capsuleGeometry args={[0.13, 0.3, 6, 14]} />
            <meshStandardMaterial color={PALETTE.white} />
          </mesh>
          <mesh position={[0, 0.33, 0]}>
            <coneGeometry args={[0.13, 0.18, 14]} />
            <meshStandardMaterial color={color} />
          </mesh>
          <mesh position={[0, 0.05, 0.12]}>
            <sphereGeometry args={[0.05, 10, 10]} />
            <meshStandardMaterial color={PALETTE.cyan} emissive={PALETTE.cyan} emissiveIntensity={0.5} />
          </mesh>
          {[-1, 1].map((side) => (
            <mesh key={side} position={[side * 0.15, -0.18, 0]} rotation={[0, 0, side * 0.5]}>
              <boxGeometry args={[0.07, 0.16, 0.08]} />
              <meshStandardMaterial color={color} />
            </mesh>
          ))}
          <mesh position={[0, -0.34, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[0.08, 0.2, 10]} />
            <meshStandardMaterial color={PALETTE.yellow} emissive={PALETTE.yellow} emissiveIntensity={0.9} />
          </mesh>
        </group>
      );
  }
}

function StageNode({
  stage,
  index,
  position,
  active,
  reached,
  onSelect,
  animate,
}: {
  stage: ProcessStage;
  index: number;
  position: Vec3;
  active: boolean;
  reached: boolean;
  onSelect: () => void;
  animate: boolean;
}) {
  const icon = useRef<Group>(null);
  const pad = useRef<Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (icon.current) {
      icon.current.position.y = 0.75 + (animate ? Math.sin(t * 1.6 + index) * 0.08 : 0) + (active ? 0.2 : 0);
      icon.current.scale.setScalar(MathUtils.damp(icon.current.scale.x, active ? 1.35 : 1, 8, delta));
      if (animate) icon.current.rotation.y += delta * (active ? 1.6 : 0.4);
    }
    if (pad.current) pad.current.scale.y = MathUtils.damp(pad.current.scale.y, active ? 1.6 : 1, 8, delta);
  });

  const over = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setCursorHover(true);
    document.body.style.cursor = "pointer";
  };
  const out = () => {
    setCursorHover(false);
    document.body.style.cursor = "";
  };

  return (
    <group
      position={position}
      onPointerOver={over}
      onPointerOut={out}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      <group ref={pad}>
        <mesh>
          <cylinderGeometry args={[0.55, 0.45, 0.22, 6]} />
          <meshStandardMaterial color={reached ? stage.color : PALETTE.stone} flatShading />
        </mesh>
      </group>
      <mesh position={[0, -0.3, 0]}>
        <coneGeometry args={[0.42, 0.45, 6]} />
        <meshStandardMaterial color={PALETTE.rock} flatShading />
      </mesh>
      <group ref={icon}>
        <StageIcon id={stage.id} color={stage.color} />
      </group>
      <SpriteLabel
        text={`${String(index + 1).padStart(2, "0")} ${stage.title}`}
        position={[0, -0.85, 0]}
        height={0.3}
        background={active ? PALETTE.purple : "rgba(255,255,255,0.92)"}
        border={active ? PALETTE.purple : "rgba(255,255,255,0.6)"}
        color={active ? PALETTE.white : PALETTE.frame}
      />
    </group>
  );
}

/** A traveler orb that glides along the path to the active stage. */
function Traveler({ curve, progress }: { curve: CatmullRomCurve3; progress: number }) {
  const orb = useRef<Mesh>(null);
  const current = useRef(progress);
  const point = useRef(new Vector3());
  useFrame((_, delta) => {
    if (!orb.current) return;
    current.current = MathUtils.damp(current.current, progress, 3, delta);
    curve.getPointAt(MathUtils.clamp(current.current, 0, 1), point.current);
    orb.current.position.set(point.current.x, point.current.y + 0.3, point.current.z);
  });
  return (
    <mesh ref={orb}>
      <sphereGeometry args={[0.13, 16, 16]} />
      <meshStandardMaterial color={PALETTE.white} emissive={PALETTE.cyan} emissiveIntensity={1.2} />
    </mesh>
  );
}

/** Lay stages along a gentle zigzag (desktop) or vertical snake (mobile). */
function stagePositions(count: number, compact: boolean): Vec3[] {
  return Array.from({ length: count }, (_, i): Vec3 =>
    compact
      ? [i % 2 === 0 ? -0.9 : 0.9, (count - 1) / 2 * 1.5 - i * 1.5, 0]
      : [(i - (count - 1) / 2) * 1.9, i % 2 === 0 ? -0.35 : 0.35, i % 2 === 0 ? 0.3 : -0.3],
  );
}

/** "From Idea to Reality": six clickable stages connected by a glowing path. */
export default function ProcessScene({ stages, active, onSelect, compact, animate, running }: ProcessSceneProps) {
  const positions = useMemo(() => stagePositions(stages.length, compact), [stages.length, compact]);
  const curve = useMemo(
    () => new CatmullRomCurve3(positions.map(([x, y, z]) => new Vector3(x, y, z))),
    [positions],
  );
  const progress = stages.length > 1 ? active / (stages.length - 1) : 0;

  return (
    <StageCanvas
      compact={compact}
      running={running}
      cameraPosition={compact ? [0, 0, 12.5] : [0, 1.6, 7.6]}
      fov={compact ? 46 : 38}
    >
      <PointerTilt strength={animate ? 0.15 : 0}>
        <mesh>
          <tubeGeometry args={[curve, 80, 0.05, 8, false]} />
          <meshStandardMaterial color={PALETTE.violet} emissive={PALETTE.violet} emissiveIntensity={0.6} />
        </mesh>
        <Traveler curve={curve} progress={progress} />
        {stages.map((stage, i) => (
          <StageNode
            key={stage.id}
            stage={stage}
            index={i}
            position={positions[i]}
            active={i === active}
            reached={i <= active}
            onSelect={() => onSelect(i)}
            animate={animate}
          />
        ))}
      </PointerTilt>
    </StageCanvas>
  );
}
