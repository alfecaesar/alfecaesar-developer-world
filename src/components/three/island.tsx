import { PALETTE } from "./palette.ts";

/** The floating rock island: grass cap, soil band, rock underside and crystals. */
export default function Island({ segments }: { segments: number }) {
  return (
    <group>
      <mesh receiveShadow position={[0, -0.2, 0]}>
        <cylinderGeometry args={[4.3, 4.1, 0.4, segments]} />
        <meshStandardMaterial color={PALETTE.grass} flatShading roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[4.1, 3.8, 0.45, segments]} />
        <meshStandardMaterial color={PALETTE.soil} flatShading roughness={1} />
      </mesh>
      <mesh position={[0, -2.55, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[3.8, 3.5, Math.max(7, segments / 2), 3]} />
        <meshStandardMaterial color={PALETTE.rock} flatShading roughness={0.85} />
      </mesh>
      {ROCK_CHUNKS.map((chunk) => (
        <mesh key={chunk.key} position={chunk.position} scale={chunk.scale}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={PALETTE.rockDark} flatShading roughness={0.9} />
        </mesh>
      ))}
      {CRYSTALS.map((crystal) => (
        <mesh
          key={crystal.key}
          position={crystal.position}
          rotation={crystal.rotation}
          scale={crystal.scale}
        >
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={PALETTE.crystal}
            emissive={PALETTE.cyan}
            emissiveIntensity={0.6}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

const ROCK_CHUNKS = [
  { key: "a", position: [2.4, -1.6, 1.6], scale: [1.1, 0.9, 1] },
  { key: "b", position: [-2.2, -1.9, 1.2], scale: [1, 1.1, 0.9] },
  { key: "c", position: [0.4, -2.2, -2.4], scale: [1.2, 1, 1] },
  { key: "d", position: [-1.2, -3.1, -0.6], scale: [0.8, 0.9, 0.8] },
  { key: "e", position: [1.1, -3.5, 0.9], scale: [0.6, 0.7, 0.6] },
] satisfies Array<{ key: string; position: [number, number, number]; scale: [number, number, number] }>;

const CRYSTALS = [
  { key: "a", position: [0.2, -4.55, 0.1], rotation: [0, 0.3, 0], scale: [0.35, 0.7, 0.35] },
  { key: "b", position: [1.6, -2.4, 2.3], rotation: [0.4, 0, -0.5], scale: [0.2, 0.4, 0.2] },
  { key: "c", position: [-2.3, -2.6, 0.4], rotation: [-0.3, 0, 0.6], scale: [0.22, 0.45, 0.22] },
] satisfies Array<{ key: string; position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number] }>;
