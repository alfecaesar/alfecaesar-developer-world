import { Float, Sparkles } from "@react-three/drei";
import type { ServiceKind } from "@/lib/services.ts";
import { PALETTE } from "./palette.ts";
import PointerTilt from "./pointer-tilt.tsx";
import { CartModel, Clickable, DashboardModel, LaptopModel, WindowModel } from "./service-models.tsx";
import StageCanvas from "./stage.tsx";

export type ServiceSceneProps = {
  kind: ServiceKind;
  accent: string;
  clicks: number;
  onInteract: () => void;
  compact: boolean;
  animate: boolean;
  running: boolean;
};

const MODELS = {
  cart: CartModel,
  window: WindowModel,
  dashboard: DashboardModel,
  laptop: LaptopModel,
} as const;

/** One interactive 3D illustration for a service, floating above a small pad. */
export default function ServiceScene({ kind, accent, clicks, onInteract, compact, animate, running }: ServiceSceneProps) {
  const Model = MODELS[kind];
  return (
    <StageCanvas compact={compact} running={running} cameraPosition={[0, 0.8, 6]} fov={34}>
      <PointerTilt strength={animate ? 0.4 : 0}>
        <Float speed={animate ? 1.4 : 0} rotationIntensity={animate ? 0.15 : 0} floatIntensity={animate ? 0.5 : 0}>
          <Clickable onClick={onInteract}>
            <Model clicks={clicks} animate={animate} />
          </Clickable>
        </Float>
        <mesh position={[0, -1.35, 0]}>
          <cylinderGeometry args={[1.6, 1.3, 0.18, 40]} />
          <meshStandardMaterial color={PALETTE.stone} />
        </mesh>
        <mesh position={[0, -1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.35, 1.48, 48]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.9} />
        </mesh>
      </PointerTilt>
      {!compact && <Sparkles count={20} scale={[5, 3, 3]} size={2.5} speed={animate ? 0.3 : 0} color={accent} />}
    </StageCanvas>
  );
}
