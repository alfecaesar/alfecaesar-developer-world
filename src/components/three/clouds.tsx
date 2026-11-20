import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { PALETTE, type Vec3 } from "./palette.ts";

type CloudSpec = { key: string; radius: number; height: number; angle: number; speed: number; scale: number };

function Puff({ position, scale }: { position: Vec3; scale: number }) {
  return (
    <group position={position} scale={scale}>
      {[
        [0, 0, 0, 0.55],
        [0.55, -0.08, 0.1, 0.42],
        [-0.55, -0.1, 0, 0.4],
        [0.2, 0.25, -0.1, 0.38],
      ].map(([x, y, z, r]) => (
        <mesh key={`${x}-${y}`} position={[x, y, z]}>
          <icosahedronGeometry args={[r, 1]} />
          <meshStandardMaterial color={PALETTE.white} flatShading roughness={1} transparent opacity={0.95} />
        </mesh>
      ))}
    </group>
  );
}

/** Clouds that slowly orbit the island. */
export default function Clouds({ count, animate }: { count: number; animate: boolean }) {
  const group = useRef<Group>(null);
  const clouds = useMemo<Array<CloudSpec>>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        key: `cloud-${i}`,
        radius: 6 + (i % 3) * 1.6,
        height: -1.5 + ((i * 1.7) % 4.5),
        angle: (i / count) * Math.PI * 2,
        speed: 0.6 + (i % 4) * 0.15,
        scale: 0.7 + ((i * 0.37) % 0.6),
      })),
    [count],
  );

  useFrame((_, delta) => {
    if (!animate || !group.current) return;
    group.current.children.forEach((child, i) => {
      const spec = clouds[i];
      spec.angle += delta * 0.03 * spec.speed;
      child.position.set(
        Math.cos(spec.angle) * spec.radius,
        spec.height,
        Math.sin(spec.angle) * spec.radius,
      );
    });
  });

  return (
    <group ref={group}>
      {clouds.map((cloud) => (
        <Puff
          key={cloud.key}
          scale={cloud.scale}
          position={[
            Math.cos(cloud.angle) * cloud.radius,
            cloud.height,
            Math.sin(cloud.angle) * cloud.radius,
          ]}
        />
      ))}
    </group>
  );
}
