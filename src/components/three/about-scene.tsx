import { Suspense, useLayoutEffect, useRef } from "react";
import type { ComponentType } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";
import type { Group, PerspectiveCamera, Texture } from "three";
import FloatingObject from "./floating-object.tsx";
import StageCanvas from "./stage.tsx";
import { AtomIcon, BagIcon, CodeIcon, DiscIcon } from "./tech-icons.tsx";

export type AboutSceneProps = { compact: boolean; animate: boolean; running: boolean };

const PORTRAIT_URL =
  "https://tenayrdhmsvcgkxkoqhk.supabase.co/storage/v1/object/public/assets/others/avatar.png";

/** Distance of the background from the camera. Must be farther than the badges. */
const BACKGROUND_DISTANCE = 14;
/** Slight oversize so no hairline gaps show at the edges. */
const OVERSCAN = 1.03;

/** Which part of the image stays visible when cropped: 0 = top/left, 0.5 = center, 1 = bottom/right. */
const FOCUS_Y = 0.25;
const FOCUS_X = 0.5;

type Badge = {
  label: string;
  /** Position as a fraction of the visible half-width / half-height (-1 to 1). */
  x: number;
  y: number;
  z: number;
  scale: number;
  Icon: ComponentType;
};

const BADGES: ReadonlyArray<Badge> = [
  { label: "Shopify", x: -0.72, y: 0.5, z: 0.4, scale: 0.5, Icon: BagIcon },
  { label: "Front-End", x: -0.62, y: -0.3, z: 0.7, scale: 0.4, Icon: CodeIcon },
  { label: "WordPress", x: 0.72, y: 0.4, z: 0.4, scale: 0.5, Icon: DiscIcon },
  { label: "React", x: 0.62, y: -0.4, z: 0.7, scale: 0.42, Icon: AtomIcon },
];

/** Portrait glued to the camera and scaled to cover the whole canvas, on any screen shape. */
function PortraitBackground() {
  const texture = useTexture(PORTRAIT_URL) as Texture;
  const rig = useRef<Group>(null);
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  const size = useThree((s) => s.size);

  useLayoutEffect(() => {
    texture.colorSpace = SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  // Follow the camera so the plane always faces the lens, whatever the camera does
  useFrame(() => {
    if (!rig.current) return;
    rig.current.position.copy(camera.position);
    rig.current.quaternion.copy(camera.quaternion);
  });

  // Visible area at the background's distance, from the canvas's real pixel size
  const visibleH = 2 * Math.tan((camera.fov * Math.PI) / 360) * BACKGROUND_DISTANCE;
  const visibleW = visibleH * (size.width / Math.max(size.height, 1));

  const image = texture.image as { width: number; height: number } | undefined;
  const imageAspect = image && image.height ? image.width / image.height : 0.8;

  // Cover: scale until both dimensions fill the canvas, then crop the overflow
  const canvasAspect = visibleW / visibleH;
  const width = (imageAspect >= canvasAspect ? visibleH * imageAspect : visibleW) * OVERSCAN;
  const height = width / imageAspect;

  // Shift (in camera space) so the chosen focus point stays in view
  const offsetX = (0.5 - FOCUS_X) * (width - visibleW);
  const offsetY = (FOCUS_Y - 0.5) * (height - visibleH);

  return (
    <group ref={rig}>
      <mesh position={[offsetX, offsetY, -BACKGROUND_DISTANCE]} renderOrder={-1}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial map={texture} toneMapped={false} depthWrite={false} />
      </mesh>
    </group>
  );
}

function FloatingBadges({ animate }: { animate: boolean }) {
  const viewport = useThree((s) => s.viewport);
  const halfW = viewport.width / 2;
  const halfH = viewport.height / 2;

  return (
    <>
      {BADGES.map(({ label, x, y, z, scale, Icon }) => (
        <FloatingObject
          key={label}
          label={label}
          position={[x * halfW, y * halfH, z]}
          scale={scale}
          animate={animate}
        >
          <Icon />
        </FloatingObject>
      ))}
    </>
  );
}

/** Full-bleed portrait background with animated tech badges at either side. */
export default function AboutScene({ compact, animate, running }: AboutSceneProps) {
  return (
    <StageCanvas compact={compact} running={running} cameraPosition={[0, 0, compact ? 9 : 8]}>
      <Suspense fallback={null}>
        <PortraitBackground />
      </Suspense>
      <FloatingBadges animate={animate} />
    </StageCanvas>
  );
}