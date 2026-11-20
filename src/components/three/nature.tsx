import { PALETTE, type Vec3 } from "./palette.ts";

function Tree({ position, scale = 1, variant = 0 }: { position: Vec3; scale?: number; variant?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.07, 0.1, 0.7, 6]} />
        <meshStandardMaterial color={PALETTE.trunk} flatShading />
      </mesh>
      {variant === 0 ? (
        <>
          <mesh castShadow position={[0, 0.95, 0]}>
            <coneGeometry args={[0.45, 0.8, 7]} />
            <meshStandardMaterial color={PALETTE.leaf} flatShading />
          </mesh>
          <mesh castShadow position={[0, 1.35, 0]}>
            <coneGeometry args={[0.33, 0.6, 7]} />
            <meshStandardMaterial color={PALETTE.leafDark} flatShading />
          </mesh>
        </>
      ) : (
        <mesh castShadow position={[0, 1.0, 0]}>
          <icosahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial color={variant === 1 ? PALETTE.leaf : PALETTE.pink} flatShading />
        </mesh>
      )}
    </group>
  );
}

function Lamp({ position }: { position: Vec3 }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 0.8, 8]} />
        <meshStandardMaterial color={PALETTE.frame} />
      </mesh>
      <mesh position={[0, 0.85, 0]}>
        <sphereGeometry args={[0.1, 14, 14]} />
        <meshStandardMaterial color={PALETTE.yellow} emissive={PALETTE.yellow} emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

const PATH_STONES: Array<{ key: string; position: Vec3; scale: number }> = [
  { key: "1", position: [0.9, 0.02, 1.95], scale: 1 },
  { key: "2", position: [1.35, 0.02, 2.55], scale: 0.9 },
  { key: "3", position: [1.95, 0.02, 3.0], scale: 0.85 },
  { key: "4", position: [2.65, 0.02, 3.25], scale: 0.75 },
];

/** Trees, lamps, a stone pathway and small hovering platforms around the studio. */
export default function Nature({ detailed }: { detailed: boolean }) {
  return (
    <group>
      <Tree position={[2.9, 0, -1.4]} scale={1.1} />
      <Tree position={[3.25, 0, 0.2]} scale={0.8} variant={1} />
      <Tree position={[-3.1, 0, 1.6]} scale={0.9} variant={2} />
      {detailed && <Tree position={[-2.5, 0, 2.7]} scale={0.7} />}
      {detailed && <Tree position={[2.2, 0, -2.8]} scale={0.75} variant={1} />}

      {PATH_STONES.map((stone) => (
        <mesh
          key={stone.key}
          receiveShadow
          position={stone.position}
          scale={[stone.scale, 1, stone.scale]}
        >
          <cylinderGeometry args={[0.28, 0.3, 0.06, 8]} />
          <meshStandardMaterial color={PALETTE.stone} flatShading />
        </mesh>
      ))}

      <Lamp position={[2.1, 0, 1.9]} />
      {detailed && <Lamp position={[-2.9, 0, -0.6]} />}

      {/* Small bushes */}
      {[
        [-0.9, 0.12, 2.6, 0.22],
        [-0.55, 0.1, 2.85, 0.16],
        [3.4, 0.12, 1.4, 0.2],
      ].map(([x, y, z, r]) => (
        <mesh key={`${x}-${z}`} castShadow position={[x, y, z]}>
          <icosahedronGeometry args={[r, 0]} />
          <meshStandardMaterial color={PALETTE.leafDark} flatShading />
        </mesh>
      ))}
    </group>
  );
}
