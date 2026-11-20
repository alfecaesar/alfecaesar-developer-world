import { RoundedBox } from "@react-three/drei";
import { NeonBrackets } from "./studio.tsx";
import { PALETTE } from "./palette.ts";

/** Small stylized tech icons built from primitives. Each fits a ~1 unit box. */

export function CodeIcon() {
  return (
    <group>
      <RoundedBox args={[1.5, 1, 0.18]} radius={0.12}>
        <meshStandardMaterial color={PALETTE.frame} />
      </RoundedBox>
      <group position={[0, 0, 0.11]} scale={0.6}>
        <NeonBrackets />
      </group>
    </group>
  );
}

export function AtomIcon({ color = PALETTE.cyan }: { color?: string }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} />
      </mesh>
      {[0, Math.PI / 3, -Math.PI / 3].map((rotation) => (
        <mesh key={rotation} rotation={[Math.PI / 2, rotation, 0]} scale={[1, 0.38, 1]}>
          <torusGeometry args={[0.6, 0.035, 8, 40]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

export function BagIcon({ color = PALETTE.shopify }: { color?: string }) {
  return (
    <group>
      <RoundedBox args={[0.9, 0.85, 0.5]} radius={0.1} position={[0, -0.1, 0]}>
        <meshStandardMaterial color={color} />
      </RoundedBox>
      <mesh position={[0, 0.35, 0]}>
        <torusGeometry args={[0.24, 0.05, 8, 20, Math.PI]} />
        <meshStandardMaterial color={PALETTE.white} />
      </mesh>
      <mesh position={[0, -0.08, 0.26]}>
        <boxGeometry args={[0.32, 0.08, 0.02]} />
        <meshStandardMaterial color={PALETTE.white} />
      </mesh>
    </group>
  );
}

export function DiscIcon({ color = PALETTE.wordpress }: { color?: string }) {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[0.55, 0.55, 0.16, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.09, 0]}>
        <torusGeometry args={[0.4, 0.05, 8, 32]} />
        <meshStandardMaterial color={PALETTE.white} />
      </mesh>
      <mesh position={[0, 0.09, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.05, 8, 32]} />
        <meshStandardMaterial color={PALETTE.white} />
      </mesh>
    </group>
  );
}

export function GearIcon({ color = PALETTE.violet }: { color?: string }) {
  return (
    <group>
      <mesh>
        <torusGeometry args={[0.38, 0.14, 10, 24]} />
        <meshStandardMaterial color={color} flatShading />
      </mesh>
      {Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2).map((angle) => (
        <mesh key={angle} position={[Math.cos(angle) * 0.56, Math.sin(angle) * 0.56, 0]} rotation={[0, 0, angle]}>
          <boxGeometry args={[0.2, 0.18, 0.2]} />
          <meshStandardMaterial color={color} flatShading />
        </mesh>
      ))}
    </group>
  );
}

export function CubeIcon({ color = PALETTE.yellow }: { color?: string }) {
  return (
    <RoundedBox args={[0.85, 0.85, 0.85]} radius={0.12}>
      <meshStandardMaterial color={color} />
    </RoundedBox>
  );
}

export function DatabaseIcon({ color = PALETTE.blue }: { color?: string }) {
  return (
    <group>
      {[-0.3, 0, 0.3].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.24, 24]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
      {[-0.15, 0.15].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <cylinderGeometry args={[0.46, 0.46, 0.04, 24]} />
          <meshStandardMaterial color={PALETTE.white} />
        </mesh>
      ))}
    </group>
  );
}

export function GemIcon({ color = PALETTE.violet }: { color?: string }) {
  return (
    <mesh scale={[0.7, 0.9, 0.7]}>
      <octahedronGeometry args={[0.7, 0]} />
      <meshStandardMaterial color={color} flatShading emissive={color} emissiveIntensity={0.15} />
    </mesh>
  );
}

export function KnotIcon({ color = PALETTE.pink }: { color?: string }) {
  return (
    <mesh>
      <torusKnotGeometry args={[0.36, 0.12, 64, 10]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
    </mesh>
  );
}

export function BoltIcon({ color = PALETTE.yellow }: { color?: string }) {
  return (
    <group rotation={[0, 0, -0.35]}>
      <mesh position={[0.08, 0.22, 0]}>
        <coneGeometry args={[0.3, 0.7, 3]} />
        <meshStandardMaterial color={color} flatShading emissive={color} emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[-0.08, -0.22, 0]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.3, 0.7, 3]} />
        <meshStandardMaterial color={color} flatShading emissive={color} emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

export function BrowserIcon({ color = PALETTE.blue }: { color?: string }) {
  return (
    <group>
      <RoundedBox args={[1.3, 1, 0.14]} radius={0.08}>
        <meshStandardMaterial color={PALETTE.white} />
      </RoundedBox>
      <mesh position={[0, 0.37, 0.075]}>
        <boxGeometry args={[1.2, 0.16, 0.02]} />
        <meshStandardMaterial color={color} />
      </mesh>
      {[0.18, 0, -0.18].map((y, i) => (
        <mesh key={y} position={[-0.15 + i * 0.05, y - 0.05, 0.075]}>
          <boxGeometry args={[0.7 - i * 0.15, 0.08, 0.02]} />
          <meshStandardMaterial color={i === 1 ? PALETTE.cyan : PALETTE.violet} />
        </mesh>
      ))}
    </group>
  );
}

export function BranchIcon({ color = PALETTE.pink }: { color?: string }) {
  const nodes: Array<[number, number]> = [
    [-0.3, -0.4],
    [-0.3, 0.4],
    [0.3, 0.1],
  ];
  return (
    <group>
      {nodes.map(([x, y]) => (
        <mesh key={`${x}${y}`} position={[x, y, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25} />
        </mesh>
      ))}
      <mesh position={[-0.3, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
        <meshStandardMaterial color={PALETTE.frame} />
      </mesh>
      <mesh position={[0, -0.15, 0]} rotation={[0, 0, -0.75]}>
        <cylinderGeometry args={[0.05, 0.05, 0.75, 8]} />
        <meshStandardMaterial color={PALETTE.frame} />
      </mesh>
    </group>
  );
}

export function RingIcon({ color = PALETTE.cyan }: { color?: string }) {
  return (
    <group>
      <mesh>
        <torusGeometry args={[0.45, 0.13, 14, 36]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={PALETTE.white} emissive={color} emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

export function HashIcon({ color = PALETTE.pink }: { color?: string }) {
  return (
    <group rotation={[0, 0, 0.15]}>
      {[-0.17, 0.17].map((x) => (
        <mesh key={`v${x}`} position={[x, 0, 0]}>
          <boxGeometry args={[0.12, 0.95, 0.14]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
      {[-0.17, 0.17].map((y) => (
        <mesh key={`h${y}`} position={[0, y, 0]}>
          <boxGeometry args={[0.95, 0.12, 0.14]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}
