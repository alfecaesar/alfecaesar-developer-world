import type { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { PALETTE, type Vec3 } from "./palette.ts";

type StageCanvasProps = {
  compact: boolean;
  running: boolean;
  cameraPosition: Vec3;
  fov?: number;
  children: ReactNode;
};

/** Shared canvas and soft studio lighting for the smaller section scenes. */
export default function StageCanvas({ compact, running, cameraPosition, fov = 36, children }: StageCanvasProps) {
  return (
    <Canvas
      dpr={compact ? [1, 1.5] : [1, 2]}
      frameloop={running ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      {/* Declarative camera so framing updates when the breakpoint changes */}
      <PerspectiveCamera
        makeDefault
        position={cameraPosition}
        fov={fov}
        near={0.1}
        far={80}
        onUpdate={(camera) => camera.lookAt(0, 0, 0)}
      />
      <hemisphereLight args={["#ece8ff", "#9ee0c4", 1]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 6]} intensity={1.8} color="#fff6ec" />
      <pointLight position={[-5, 2, -3]} intensity={24} color={PALETTE.purple} distance={16} />
      <pointLight position={[5, -1, 4]} intensity={16} color={PALETTE.cyan} distance={14} />
      {children}
    </Canvas>
  );
}
