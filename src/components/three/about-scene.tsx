import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import type { Group } from "three";
import Developer from "./developer.tsx";
import FloatingObject from "./floating-object.tsx";
import { PALETTE, type Vec3 } from "./palette.ts";
import PointerTilt from "./pointer-tilt.tsx";
import StageCanvas from "./stage.tsx";
import { AtomIcon, BagIcon, CodeIcon, DiscIcon } from "./tech-icons.tsx";

export type AboutSceneProps = { compact: boolean; animate: boolean; running: boolean };

const BADGES: Array<{ label: string; position: Vec3; scale: number; Icon: () => React.JSX.Element }> = [
  { label: "Shopify", position: [-1.7, 2.3, 0.2], scale: 0.5, Icon: () => <BagIcon /> },
  { label: "WordPress", position: [1.75, 2.1, 0], scale: 0.5, Icon: () => <DiscIcon /> },
  { label: "Front-End", position: [-1.4, 0.9, 0.9], scale: 0.38, Icon: () => <CodeIcon /> },
  { label: "React", position: [1.5, 0.7, 0.9], scale: 0.42, Icon: () => <AtomIcon /> },
];

function Platform({ animate }: { animate: boolean }) {
  const ring = useRef<Group>(null);
  useFrame((_, delta) => {
    if (animate && ring.current) ring.current.rotation.y += delta * 0.4;
  });
  return (
    <group position={[0, -0.85, 0]}>
      <mesh>
        <cylinderGeometry args={[1.5, 1.2, 0.35, 32]} />
        <meshStandardMaterial color={PALETTE.grass} />
      </mesh>
      <mesh position={[0, -0.45, 0]}>
        <coneGeometry args={[1.2, 1.1, 7]} />
        <meshStandardMaterial color={PALETTE.rock} flatShading />
      </mesh>
      <group ref={ring} position={[0, 0.19, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.05, 1.15, 48, 1, 0, Math.PI * 1.4]} />
          <meshStandardMaterial color={PALETTE.cyan} emissive={PALETTE.cyan} emissiveIntensity={0.8} />
        </mesh>
      </group>
      {/* A small potted plant beside the developer */}
      <group position={[0.85, 0.3, -0.35]}>
        <mesh>
          <cylinderGeometry args={[0.14, 0.11, 0.24, 14]} />
          <meshStandardMaterial color={PALETTE.pot} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <icosahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial color={PALETTE.leaf} flatShading />
        </mesh>
      </group>
    </group>
  );
}

function BobbingDeveloper({ animate }: { animate: boolean }) {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (animate && group.current) group.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.04;
  });
  return (
    <group ref={group}>
      <Developer pose="standing" animate={animate} />
    </group>
  );
}

/** The developer character on a small floating platform, waving hello. */
export default function AboutScene({ compact, animate, running }: AboutSceneProps) {
  return (
    <StageCanvas compact={compact} running={running} cameraPosition={[0, 0.9, compact ? 8.6 : 7.8]}>
      <PointerTilt strength={animate ? 0.35 : 0}>
        <group position={[0, -0.25, 0]}>
          <Platform animate={animate} />
          <BobbingDeveloper animate={animate} />
          {BADGES.map(({ label, position, scale, Icon }) => (
            <FloatingObject key={label} label={label} position={position} scale={scale} animate={animate}>
              <Icon />
            </FloatingObject>
          ))}
        </group>
      </PointerTilt>
      {!compact && (
        <Sparkles count={30} scale={[5, 4, 3]} position={[0, 1, 0]} size={3} speed={animate ? 0.3 : 0} color={PALETTE.violet} />
      )}
    </StageCanvas>
  );
}
