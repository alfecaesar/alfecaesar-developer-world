import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { Vector3 } from "three";
import type { Vec3 } from "./palette.ts";

type Shot = { position: Vec3; target: Vec3 };

/**
 * Drives the camera: GSAP tweens between shots, plus a gentle mouse parallax
 * layered on top so the world reacts to the pointer.
 */
export default function CameraRig({
  shot,
  parallax,
  instant,
}: {
  shot: Shot;
  parallax: number;
  instant: boolean;
}) {
  const { camera, pointer } = useThree();
  const base = useRef(new Vector3(...shot.position));
  const target = useRef(new Vector3(...shot.target));
  const smoothedPointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const duration = instant ? 0 : 1.8;
    const tweens = [
      gsap.to(base.current, {
        x: shot.position[0],
        y: shot.position[1],
        z: shot.position[2],
        duration,
        ease: "power3.inOut",
      }),
      gsap.to(target.current, {
        x: shot.target[0],
        y: shot.target[1],
        z: shot.target[2],
        duration,
        ease: "power3.inOut",
      }),
    ];
    return () => tweens.forEach((tween) => tween.kill());
  }, [shot, instant]);

  useFrame((_, delta) => {
    const ease = 1 - Math.exp(-delta * 3);
    smoothedPointer.current.x += (pointer.x - smoothedPointer.current.x) * ease;
    smoothedPointer.current.y += (pointer.y - smoothedPointer.current.y) * ease;
    camera.position.set(
      base.current.x + smoothedPointer.current.x * parallax,
      base.current.y + smoothedPointer.current.y * parallax * 0.5,
      base.current.z,
    );
    camera.lookAt(target.current);
  });

  return null;
}
