import { useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import { PALETTE } from "./palette.ts";

type CodeSegment = { key: string; x: number; y: number; width: number; color: string };

const CODE_COLORS = [PALETTE.violet, PALETTE.cyan, PALETTE.pink, PALETTE.yellow, "#c9c6ff"];

/** Builds deterministic "syntax highlighted" code lines for a screen. */
function buildCodeLines(lines: number, width: number, height: number, seed: number) {
  const segments: Array<CodeSegment> = [];
  const lineHeight = height / (lines + 1);
  let value = seed;
  const next = () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
  for (let line = 0; line < lines; line++) {
    const indent = [0, 1, 2, 2, 1, 2, 3, 1, 0][line % 9] * width * 0.06;
    let x = -width / 2 + width * 0.07 + indent;
    const y = height / 2 - lineHeight * (line + 1);
    const count = 1 + Math.floor(next() * 3);
    for (let s = 0; s < count; s++) {
      const w = width * (0.08 + next() * 0.2);
      if (x + w > width / 2 - width * 0.05) break;
      segments.push({
        key: `${line}-${s}`,
        x: x + w / 2,
        y,
        width: w,
        color: CODE_COLORS[Math.floor(next() * CODE_COLORS.length)],
      });
      x += w + width * 0.025;
    }
  }
  return { segments, lineHeight };
}

/** A glowing code editor rendered from simple planes (no font downloads). */
function CodeScreen({
  width,
  height,
  lines,
  seed,
}: {
  width: number;
  height: number;
  lines: number;
  seed: number;
}) {
  const { segments, lineHeight } = useMemo(
    () => buildCodeLines(lines, width, height, seed),
    [lines, width, height, seed],
  );
  return (
    <group>
      <mesh>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color={PALETTE.screen} toneMapped={false} />
      </mesh>
      {/* Editor title bar dots */}
      {[PALETTE.pink, PALETTE.yellow, PALETTE.leaf].map((color, i) => (
        <mesh
          key={color}
          position={[-width / 2 + width * 0.05 + i * width * 0.04, height / 2 - height * 0.06, 0.002]}
        >
          <circleGeometry args={[height * 0.025, 12]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      ))}
      {segments.map((segment) => (
        <mesh key={segment.key} position={[segment.x, segment.y - lineHeight * 0.3, 0.002]}>
          <planeGeometry args={[segment.width, lineHeight * 0.42]} />
          <meshBasicMaterial color={segment.color} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function Plant({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.13, 0.1, 0.24, 10]} />
        <meshStandardMaterial color={PALETTE.pot} flatShading />
      </mesh>
      {[
        [0, 0.38, 0, 0.17],
        [0.09, 0.3, 0.05, 0.12],
        [-0.08, 0.32, -0.04, 0.13],
      ].map(([x, y, z, r]) => (
        <mesh key={`${x}-${y}`} castShadow position={[x, y, z]}>
          <icosahedronGeometry args={[r, 0]} />
          <meshStandardMaterial color={PALETTE.leaf} flatShading />
        </mesh>
      ))}
    </group>
  );
}

function Books({ position, rotation = 0 }: { position: [number, number, number]; rotation?: number }) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {[PALETTE.book1, PALETTE.book2, PALETTE.book3].map((color, i) => (
        <mesh key={color} castShadow position={[0, 0.03 + i * 0.065, 0]} rotation={[0, i * 0.18, 0]}>
          <boxGeometry args={[0.36, 0.06, 0.26]} />
          <meshStandardMaterial color={color} flatShading />
        </mesh>
      ))}
    </group>
  );
}

function Chair({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <RoundedBox castShadow args={[0.62, 0.1, 0.58]} radius={0.04} position={[0, -0.05, 0]}>
        <meshStandardMaterial color={PALETTE.purple} />
      </RoundedBox>
      <RoundedBox castShadow args={[0.56, 0.55, 0.08]} radius={0.04} position={[0, 0.32, 0.3]}>
        <meshStandardMaterial color={PALETTE.purple} />
      </RoundedBox>
      <mesh castShadow position={[0, -0.32, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.45, 8]} />
        <meshStandardMaterial color={PALETTE.frame} />
      </mesh>
      <mesh position={[0, -0.53, 0]}>
        <cylinderGeometry args={[0.3, 0.32, 0.04, 5]} />
        <meshStandardMaterial color={PALETTE.frame} flatShading />
      </mesh>
    </group>
  );
}

function Desk() {
  return (
    <group position={[0.15, 0, -1.5]}>
      <RoundedBox castShadow receiveShadow args={[2.3, 0.08, 0.95]} radius={0.03} position={[0, 0.86, 0]}>
        <meshStandardMaterial color={PALETTE.desk} />
      </RoundedBox>
      {[
        [-1.05, -0.38],
        [1.05, -0.38],
        [-1.05, 0.38],
        [1.05, 0.38],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} castShadow position={[x, 0.42, z]}>
          <boxGeometry args={[0.06, 0.82, 0.06]} />
          <meshStandardMaterial color={PALETTE.deskLeg} />
        </mesh>
      ))}

      {/* Desktop monitor */}
      <group position={[0.05, 0.9, -0.22]}>
        <mesh castShadow position={[0, 0.12, 0]}>
          <boxGeometry args={[0.08, 0.24, 0.06]} />
          <meshStandardMaterial color={PALETTE.frame} />
        </mesh>
        <mesh position={[0, 0.01, 0.02]}>
          <boxGeometry args={[0.36, 0.02, 0.22]} />
          <meshStandardMaterial color={PALETTE.frame} />
        </mesh>
        <RoundedBox castShadow args={[1.42, 0.84, 0.06]} radius={0.03} position={[0, 0.62, 0]}>
          <meshStandardMaterial color={PALETTE.frame} />
        </RoundedBox>
        <group position={[0, 0.62, 0.032]}>
          <CodeScreen width={1.32} height={0.74} lines={10} seed={7} />
        </group>
        <pointLight position={[0, 0.6, 0.5]} color={PALETTE.cyan} intensity={1.6} distance={2.6} />
      </group>

      {/* Laptop */}
      <group position={[0.85, 0.9, 0.08]} rotation={[0, -0.45, 0]}>
        <mesh castShadow position={[0, 0.015, 0]}>
          <boxGeometry args={[0.56, 0.03, 0.38]} />
          <meshStandardMaterial color="#d9d6f5" />
        </mesh>
        <group position={[0, 0.03, -0.19]} rotation={[-0.32, 0, 0]}>
          <mesh castShadow position={[0, 0.19, 0]}>
            <boxGeometry args={[0.56, 0.38, 0.02]} />
            <meshStandardMaterial color="#d9d6f5" />
          </mesh>
          <group position={[0, 0.19, 0.011]}>
            <CodeScreen width={0.5} height={0.32} lines={6} seed={21} />
          </group>
        </group>
      </group>

      {/* Keyboard, mug, books, plant */}
      <RoundedBox castShadow args={[0.6, 0.025, 0.2]} radius={0.01} position={[-0.05, 0.915, 0.2]}>
        <meshStandardMaterial color="#e8e5ff" />
      </RoundedBox>
      <mesh castShadow position={[-0.6, 0.97, 0.22]}>
        <cylinderGeometry args={[0.07, 0.06, 0.14, 12]} />
        <meshStandardMaterial color={PALETTE.cyan} />
      </mesh>
      <Books position={[-0.9, 0.9, -0.15]} rotation={0.25} />
      <Plant position={[1.0, 0.9, -0.3]} scale={0.8} />
    </group>
  );
}

/** The developer studio diorama: floor, walls, desk setup, chair, decor. */
export default function Studio() {
  return (
    <group position={[-0.4, 0, -0.3]}>
      <RoundedBox receiveShadow args={[4.6, 0.16, 3.8]} radius={0.06} position={[0, 0.08, -0.3]}>
        <meshStandardMaterial color={PALETTE.floor} />
      </RoundedBox>
      <RoundedBox receiveShadow args={[4.75, 0.08, 3.95]} radius={0.04} position={[0, 0.02, -0.3]}>
        <meshStandardMaterial color={PALETTE.floorEdge} />
      </RoundedBox>

      {/* Back and side walls */}
      <RoundedBox castShadow receiveShadow args={[4.6, 2.1, 0.16]} radius={0.05} position={[0, 1.2, -2.12]}>
        <meshStandardMaterial color={PALETTE.wall} />
      </RoundedBox>
      <RoundedBox castShadow receiveShadow args={[0.16, 2.1, 3.8]} radius={0.05} position={[-2.22, 1.2, -0.3]}>
        <meshStandardMaterial color={PALETTE.wall} />
      </RoundedBox>
      <mesh position={[0, 2.28, -2.12]}>
        <boxGeometry args={[4.6, 0.06, 0.2]} />
        <meshStandardMaterial color={PALETTE.wallTrim} />
      </mesh>

      {/* Wall art: a "</>" neon sign */}
      <group position={[-1.35, 1.75, -2.02]}>
        <RoundedBox args={[0.9, 0.5, 0.04]} radius={0.03}>
          <meshStandardMaterial color={PALETTE.frame} />
        </RoundedBox>
        <group position={[0, 0, 0.03]} scale={0.32}>
          <NeonBrackets />
        </group>
      </group>

      {/* Window with sky */}
      <group position={[1.15, 1.6, -2.02]}>
        <RoundedBox args={[1.1, 0.8, 0.04]} radius={0.03}>
          <meshStandardMaterial color={PALETTE.wallTrim} />
        </RoundedBox>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[0.98, 0.68]} />
          <meshBasicMaterial color="#bfe9ff" toneMapped={false} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <boxGeometry args={[0.03, 0.68, 0.01]} />
          <meshStandardMaterial color={PALETTE.white} />
        </mesh>
      </group>

      {/* Shelf with books on the side wall */}
      <group position={[-2.08, 1.35, -0.5]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.05, 0.26]} />
          <meshStandardMaterial color={PALETTE.floorEdge} />
        </mesh>
        {[PALETTE.book2, PALETTE.book1, PALETTE.book3, PALETTE.purple, PALETTE.cyan].map(
          (color, i) => (
            <mesh key={color} castShadow position={[-0.42 + i * 0.12, 0.16, 0]} rotation={[0, 0, i === 4 ? 0.3 : 0]}>
              <boxGeometry args={[0.08, 0.28, 0.2]} />
              <meshStandardMaterial color={color} />
            </mesh>
          ),
        )}
        <Plant position={[0.38, 0.03, 0]} scale={0.7} />
      </group>

      {/* Rug */}
      <mesh receiveShadow position={[0.2, 0.17, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.1, 32]} />
        <meshStandardMaterial color="#cfc6ff" />
      </mesh>

      <Desk />
      <Chair position={[-0.2, 0.62, -0.45]} />
      <Plant position={[-1.8, 0.16, 1.1]} scale={1.6} />
    </group>
  );
}

/** "</>" built from three glowing bars. */
export function NeonBrackets({ color = PALETTE.cyan }: { color?: string }) {
  return (
    <group>
      <mesh position={[-0.55, 0.18, 0]} rotation={[0, 0, 0.7]}>
        <boxGeometry args={[0.5, 0.12, 0.08]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh position={[-0.55, -0.18, 0]} rotation={[0, 0, -0.7]}>
        <boxGeometry args={[0.5, 0.12, 0.08]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh rotation={[0, 0, -1.2]}>
        <boxGeometry args={[0.95, 0.12, 0.08]} />
        <meshBasicMaterial color={PALETTE.pink} toneMapped={false} />
      </mesh>
      <mesh position={[0.55, 0.18, 0]} rotation={[0, 0, -0.7]}>
        <boxGeometry args={[0.5, 0.12, 0.08]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh position={[0.55, -0.18, 0]} rotation={[0, 0, 0.7]}>
        <boxGeometry args={[0.5, 0.12, 0.08]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
}
