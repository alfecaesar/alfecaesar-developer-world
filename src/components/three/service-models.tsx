import { useRef, useState, type ReactNode } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { MathUtils, type Group, type Mesh } from "three";
import { setCursorHover } from "@/lib/cursor-events.ts";
import { PALETTE, type Vec3 } from "./palette.ts";

type ModelProps = { animate: boolean; clicks: number };

/** Wraps a model with hover feedback (scale up + pointer cursor) and click handling. */
export function Clickable({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.scale.setScalar(MathUtils.damp(group.current.scale.x, hovered ? 1.06 : 1, 8, delta));
  });
  const over = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(true);
    setCursorHover(true);
    document.body.style.cursor = "pointer";
  };
  const out = () => {
    setHovered(false);
    setCursorHover(false);
    document.body.style.cursor = "";
  };
  return (
    <group
      ref={group}
      onPointerOver={over}
      onPointerOut={out}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      {children}
    </group>
  );
}

/** A box that drops into the cart from above. */
function FallingBox({ index, color }: { index: number; color: string }) {
  const mesh = useRef<Mesh>(null);
  const restY = 0.15 + Math.floor(index / 3) * 0.32;
  const x = ((index % 3) - 1) * 0.36;
  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.position.y = MathUtils.damp(mesh.current.position.y, restY, 6, delta);
  });
  return (
    <mesh ref={mesh} position={[x, 2.4, 0]} rotation={[0, index * 0.4, 0]}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

const BOX_COLORS = [PALETTE.pink, PALETTE.yellow, PALETTE.cyan, PALETTE.violet, PALETTE.blue, PALETTE.shopify];

const BASKET_WALLS: Array<{ p: Vec3; s: Vec3 }> = [
  { p: [0, 0.32, 0.4], s: [1.3, 0.66, 0.04] },
  { p: [0, 0.32, -0.4], s: [1.3, 0.66, 0.04] },
  { p: [0.65, 0.32, 0], s: [0.04, 0.66, 0.8] },
  { p: [-0.65, 0.32, 0], s: [0.04, 0.66, 0.8] },
];

const WHEELS: Vec3[] = [
  [-0.45, 0.1, 0.35],
  [0.45, 0.1, 0.35],
  [-0.45, 0.1, -0.35],
  [0.45, 0.1, -0.35],
];

/** Shopping cart: each click drops a product in (resets after six). */
export function CartModel({ clicks, animate }: ModelProps) {
  const wheels = useRef<Group>(null);
  const items = clicks % 7;
  useFrame((_, delta) => {
    if (animate && wheels.current) wheels.current.children.forEach((wheel) => (wheel.rotation.z -= delta * 2));
  });
  return (
    <group position={[0, -0.3, 0]}>
      {/* Basket */}
      <group position={[0, 0.55, 0]}>
        <mesh position={[0, -0.02, 0]}>
          <boxGeometry args={[1.3, 0.06, 0.8]} />
          <meshStandardMaterial color={PALETTE.frame} />
        </mesh>
        {BASKET_WALLS.map(({ p, s }) => (
          <mesh key={p.join()} position={p}>
            <boxGeometry args={s} />
            <meshStandardMaterial color={PALETTE.shopify} transparent opacity={0.55} />
          </mesh>
        ))}
        {/* Top rim */}
        <mesh position={[0, 0.66, 0]}>
          <boxGeometry args={[1.36, 0.06, 0.86]} />
          <meshStandardMaterial color={PALETTE.white} />
        </mesh>
        {Array.from({ length: items }, (_, i) => (
          <FallingBox key={`${Math.floor(clicks / 7)}-${i}`} index={i} color={BOX_COLORS[i % BOX_COLORS.length]} />
        ))}
      </group>
      {/* Handle */}
      <mesh position={[-0.85, 1.25, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
        <meshStandardMaterial color={PALETTE.frame} />
      </mesh>
      <mesh position={[-1.0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.9, 12]} />
        <meshStandardMaterial color={PALETTE.pink} />
      </mesh>
      {/* Wheels */}
      <group ref={wheels}>
        {WHEELS.map((p) => (
          <mesh key={p.join()} position={p} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.1, 0.05, 8, 16]} />
            <meshStandardMaterial color={PALETTE.frame} />
          </mesh>
        ))}
      </group>
      <mesh position={[0, 0.32, 0]}>
        <boxGeometry args={[1.0, 0.04, 0.7]} />
        <meshStandardMaterial color={PALETTE.deskLeg} />
      </mesh>
    </group>
  );
}

/** Website window: clicking toggles an exploded view of its layers. */
export function WindowModel({ clicks }: ModelProps) {
  const layers = useRef<Array<Group | null>>([]);
  const exploded = clicks % 2 === 1;
  useFrame((_, delta) => {
    layers.current.forEach((layer, i) => {
      if (!layer) return;
      const target = exploded ? i * 0.45 : i * 0.06;
      layer.position.z = MathUtils.damp(layer.position.z, target, 5, delta);
    });
  });
  const blocks: Array<{ pos: [number, number]; size: [number, number]; color: string }> = [
    { pos: [-0.35, 0.3], size: [1.1, 0.5], color: PALETTE.wordpress },
    { pos: [0.65, 0.3], size: [0.6, 0.5], color: PALETTE.violet },
    { pos: [-0.5, -0.35], size: [0.8, 0.5], color: PALETTE.cyan },
    { pos: [0.4, -0.35], size: [0.8, 0.5], color: PALETTE.pink },
  ];
  return (
    <group rotation={[0, -0.35, 0]} position={[0, 0.2, -0.4]}>
      <group ref={(node) => { layers.current[0] = node; }}>
        <RoundedBox args={[2.4, 1.7, 0.08]} radius={0.06}>
          <meshStandardMaterial color={PALETTE.white} />
        </RoundedBox>
      </group>
      <group ref={(node) => { layers.current[1] = node; }}>
        <mesh position={[0, 0.72, 0.05]}>
          <boxGeometry args={[2.4, 0.24, 0.04]} />
          <meshStandardMaterial color={PALETTE.frame} />
        </mesh>
        {[-1.05, -0.92, -0.79].map((x, i) => (
          <mesh key={x} position={[x, 0.72, 0.08]}>
            <sphereGeometry args={[0.045, 10, 10]} />
            <meshStandardMaterial color={[PALETTE.pink, PALETTE.yellow, PALETTE.leaf][i]} />
          </mesh>
        ))}
      </group>
      <group ref={(node) => { layers.current[2] = node; }}>
        {blocks.map(({ pos, size, color }) => (
          <RoundedBox key={pos.join()} args={[size[0], size[1], 0.06]} radius={0.03} position={[pos[0], pos[1] - 0.05, 0.05]}>
            <meshStandardMaterial color={color} />
          </RoundedBox>
        ))}
      </group>
      <group ref={(node) => { layers.current[3] = node; }}>
        <mesh position={[-0.55, 0.32, 0.05]}>
          <boxGeometry args={[0.7, 0.08, 0.03]} />
          <meshStandardMaterial color={PALETTE.white} />
        </mesh>
        <mesh position={[0.62, -0.62, 0.05]}>
          <boxGeometry args={[0.5, 0.14, 0.03]} />
          <meshStandardMaterial color={PALETTE.yellow} emissive={PALETTE.yellow} emissiveIntensity={0.3} />
        </mesh>
      </group>
    </group>
  );
}

const BAR_SETS = [
  [0.4, 0.75, 0.55, 1.0, 0.7],
  [0.8, 0.45, 0.95, 0.6, 0.85],
  [0.55, 1.0, 0.35, 0.8, 0.5],
];

/** App dashboard: clicking cycles the chart data. */
export function DashboardModel({ clicks, animate }: ModelProps) {
  const bars = useRef<Array<Mesh | null>>([]);
  const ring = useRef<Mesh>(null);
  const heights = BAR_SETS[clicks % BAR_SETS.length];
  useFrame((_, delta) => {
    bars.current.forEach((bar, i) => {
      if (!bar) return;
      const next = MathUtils.damp(bar.scale.y, heights[i], 6, delta);
      bar.scale.y = next;
      bar.position.y = -0.55 + next * 0.45;
    });
    if (animate && ring.current) ring.current.rotation.z -= delta * 0.8;
  });
  return (
    <group rotation={[-0.15, -0.3, 0]}>
      <RoundedBox args={[2.6, 1.8, 0.1]} radius={0.08}>
        <meshStandardMaterial color={PALETTE.screen} />
      </RoundedBox>
      {/* Sidebar */}
      <mesh position={[-1.08, 0, 0.06]}>
        <boxGeometry args={[0.32, 1.62, 0.02]} />
        <meshStandardMaterial color={PALETTE.frame} />
      </mesh>
      {[0.55, 0.3, 0.05, -0.2].map((y, i) => (
        <mesh key={y} position={[-1.08, y, 0.08]}>
          <boxGeometry args={[0.18, 0.06, 0.02]} />
          <meshStandardMaterial color={i === 0 ? PALETTE.cyan : PALETTE.violet} />
        </mesh>
      ))}
      {/* Bars */}
      {heights.map((_, i) => (
        <mesh key={i} ref={(node) => { bars.current[i] = node; }} position={[-0.6 + i * 0.26, -0.3, 0.12]}>
          <boxGeometry args={[0.16, 0.9, 0.08]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? PALETTE.cyan : PALETTE.purple}
            emissive={i % 2 === 0 ? PALETTE.cyan : PALETTE.purple}
            emissiveIntensity={0.35}
          />
        </mesh>
      ))}
      {/* Donut chart */}
      <mesh ref={ring} position={[0.82, 0.25, 0.1]}>
        <torusGeometry args={[0.28, 0.08, 10, 32, Math.PI * 1.4]} />
        <meshStandardMaterial color={PALETTE.pink} emissive={PALETTE.pink} emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.82, -0.5, 0.08]}>
        <boxGeometry args={[0.6, 0.22, 0.02]} />
        <meshStandardMaterial color={PALETTE.yellow} />
      </mesh>
    </group>
  );
}

/** Laptop: clicking closes and reopens the lid. */
export function LaptopModel({ clicks, animate }: ModelProps) {
  const lid = useRef<Group>(null);
  const cursor = useRef<Mesh>(null);
  const closed = clicks % 2 === 1;
  useFrame((state, delta) => {
    if (lid.current) {
      lid.current.rotation.x = MathUtils.damp(lid.current.rotation.x, closed ? -Math.PI / 2 + 0.05 : 0.25, 5, delta);
    }
    if (cursor.current) cursor.current.visible = !animate || Math.sin(state.clock.elapsedTime * 6) > 0;
  });
  const lines: Array<[number, number, string]> = [
    [0.55, 0.9, PALETTE.violet],
    [0.4, 0.6, PALETTE.cyan],
    [0.25, 1.1, PALETTE.pink],
    [0.1, 0.7, PALETTE.yellow],
    [-0.05, 0.95, PALETTE.cyan],
  ];
  return (
    <group rotation={[0.25, -0.5, 0]} position={[0, -0.4, 0]}>
      <RoundedBox args={[2.2, 0.1, 1.5]} radius={0.04}>
        <meshStandardMaterial color={PALETTE.wallTrim} />
      </RoundedBox>
      <mesh position={[0, 0.055, 0.15]}>
        <boxGeometry args={[1.9, 0.01, 0.8]} />
        <meshStandardMaterial color={PALETTE.frame} />
      </mesh>
      <mesh position={[0, 0.055, 0.62]}>
        <boxGeometry args={[0.6, 0.01, 0.25]} />
        <meshStandardMaterial color={PALETTE.deskLeg} />
      </mesh>
      {/* Lid pivots at the back edge */}
      <group ref={lid} position={[0, 0.05, -0.74]}>
        <group position={[0, 0.72, 0]}>
          <RoundedBox args={[2.2, 1.45, 0.06]} radius={0.04}>
            <meshStandardMaterial color={PALETTE.wallTrim} />
          </RoundedBox>
          <mesh position={[0, 0, 0.035]}>
            <planeGeometry args={[2.0, 1.25]} />
            <meshStandardMaterial color={PALETTE.screen} emissive={PALETTE.screen} emissiveIntensity={0.4} />
          </mesh>
          {lines.map(([y, w, color]) => (
            <mesh key={y} position={[-0.85 + w / 2, y - 0.2, 0.04]}>
              <planeGeometry args={[w, 0.07]} />
              <meshBasicMaterial color={color} />
            </mesh>
          ))}
          <mesh ref={cursor} position={[0.25, -0.4, 0.04]}>
            <planeGeometry args={[0.06, 0.1]} />
            <meshBasicMaterial color={PALETTE.white} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
