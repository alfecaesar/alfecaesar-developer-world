import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Sparkles } from "@react-three/drei";
import type { Group } from "three";
import CameraRig from "./camera-rig.tsx";
import Clouds from "./clouds.tsx";
import Developer from "./developer.tsx";
import FloatingObject from "./floating-object.tsx";
import Island from "./island.tsx";
import Nature from "./nature.tsx";
import { PALETTE, SHOTS, type Vec3 } from "./palette.ts";
import Particles from "./particles.tsx";
import Studio from "./studio.tsx";
import {
  AtomIcon,
  BagIcon,
  CodeIcon,
  CubeIcon,
  DatabaseIcon,
  DiscIcon,
  GearIcon,
  HashIcon,
} from "./tech-icons.tsx";

export type HeroSceneProps = {
  exploring: boolean;
  compact: boolean;
  animate: boolean;
  running: boolean;
};

const HERO_OBJECTS: Array<{
  label: string;
  position: Vec3;
  scale: number;
  Icon: () => React.JSX.Element;
  compact: boolean;
}> = [
  { label: "Shopify", position: [-3.6, 3.2, 0.6], scale: 0.62, Icon: () => <BagIcon />, compact: true },
  { label: "WordPress", position: [3.8, 3.4, -0.4], scale: 0.62, Icon: () => <DiscIcon />, compact: true },
  { label: "React", position: [1.2, 4.2, -2.6], scale: 0.6, Icon: () => <AtomIcon />, compact: true },
  { label: "</> Code", position: [-1.4, 3.9, -2.4], scale: 0.5, Icon: () => <CodeIcon />, compact: false },
  { label: "Liquid", position: [4.4, 1.6, 2.2], scale: 0.45, Icon: () => <CubeIcon color={PALETTE.cyan} />, compact: false },
  { label: "APIs", position: [-4.3, 1.4, -1.6], scale: 0.45, Icon: () => <GearIcon />, compact: false },
  { label: "Databases", position: [-3.2, 0.6, 3.2], scale: 0.42, Icon: () => <DatabaseIcon />, compact: false },
  { label: "CSS", position: [3.1, 0.4, 3.6], scale: 0.42, Icon: () => <HashIcon />, compact: false },
];

function FloatingIsland({ compact, animate }: { compact: boolean; animate: boolean }) {
  const island = useRef<Group>(null);
  useFrame((state) => {
    if (!animate || !island.current) return;
    const t = state.clock.elapsedTime;
    island.current.position.y = Math.sin(t * 0.8) * 0.18;
    island.current.rotation.y = Math.sin(t * 0.15) * 0.06;
  });

  return (
    <group ref={island}>
      <Island segments={compact ? 10 : 18} />
      <Studio />
      <group position={[-0.6, 0.78, -0.75]}>
        <Developer pose="sitting" animate={animate} />
      </group>
      <Nature detailed={!compact} />
      <ContactShadows
        position={[0, 0.17, 0]}
        opacity={0.35}
        scale={9}
        blur={2.4}
        far={3}
        resolution={compact ? 256 : 512}
        frames={1}
      />
    </group>
  );
}

/** The hero's interactive floating developer island. */
export default function HeroScene({ exploring, compact, animate, running }: HeroSceneProps) {
  const shot = exploring ? SHOTS.closeup : compact ? SHOTS.overviewMobile : SHOTS.overview;
  const objects = compact ? HERO_OBJECTS.filter((object) => object.compact) : HERO_OBJECTS;

  return (
    <Canvas
      shadows={!compact}
      dpr={compact ? [1, 1.5] : [1, 2]}
      frameloop={running ? "always" : "never"}
      camera={{ position: shot.position, fov: 38, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      <hemisphereLight args={["#e9e4ff", "#9ee0c4", 0.9]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        castShadow={!compact}
        position={[6, 10, 6]}
        intensity={1.9}
        color="#fff6ec"
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
      <pointLight position={[-6, 2, -4]} intensity={30} color={PALETTE.purple} distance={18} />
      <pointLight position={[6, -2, 4]} intensity={20} color={PALETTE.cyan} distance={16} />

      <CameraRig shot={shot} parallax={exploring ? 0.25 : compact ? 0.4 : 0.9} instant={!animate} />

      <FloatingIsland compact={compact} animate={animate} />

      {objects.map(({ label, position, scale, Icon }) => (
        <FloatingObject key={label} label={label} position={position} scale={scale} animate={animate}>
          <Icon />
        </FloatingObject>
      ))}

      <Clouds count={compact ? 4 : 8} animate={animate} />
      <Particles count={compact ? 60 : 160} animate={animate} />
      {!compact && (
        <Sparkles count={40} scale={[9, 5, 9]} position={[0, 2, 0]} size={3} speed={animate ? 0.3 : 0} color={PALETTE.cyan} />
      )}
    </Canvas>
  );
}
