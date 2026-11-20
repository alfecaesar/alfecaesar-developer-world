import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { PALETTE } from "./palette.ts";

type DeveloperProps = {
  pose: "sitting" | "standing";
  animate: boolean;
};

/**
 * A stylized developer built from primitives. Sitting faces -z (toward the
 * desk); standing faces +z and waves.
 */
export default function Developer({ pose, animate }: DeveloperProps) {
  const head = useRef<Group>(null);
  const torso = useRef<Group>(null);
  const leftArm = useRef<Group>(null);
  const rightArm = useRef<Group>(null);
  const sitting = pose === "sitting";

  useFrame((state) => {
    if (!animate) return;
    const t = state.clock.elapsedTime;
    if (head.current) {
      head.current.rotation.y = Math.sin(t * 0.6) * 0.22;
      head.current.rotation.x = (sitting ? 0.08 : 0) + Math.sin(t * 1.3) * 0.04;
    }
    if (torso.current) torso.current.scale.y = 1 + Math.sin(t * 2) * 0.02;
    if (sitting) {
      // Typing: small alternating bobs
      if (leftArm.current) leftArm.current.rotation.x = 1.15 + Math.sin(t * 13) * 0.06;
      if (rightArm.current) rightArm.current.rotation.x = 1.15 + Math.sin(t * 13 + 1.6) * 0.06;
    } else if (rightArm.current) {
      // Friendly wave
      rightArm.current.rotation.z = 2.6 + Math.sin(t * 5) * 0.35;
    }
  });

  return (
    <group>
      {/* Legs */}
      {[-0.12, 0.12].map((x) =>
        sitting ? (
          <group key={x}>
            <mesh castShadow position={[x, 0.12, -0.22]} rotation={[Math.PI / 2, 0, 0]}>
              <capsuleGeometry args={[0.09, 0.32, 4, 10]} />
              <meshStandardMaterial color={PALETTE.pants} />
            </mesh>
            <mesh castShadow position={[x, -0.15, -0.46]}>
              <capsuleGeometry args={[0.08, 0.36, 4, 10]} />
              <meshStandardMaterial color={PALETTE.pants} />
            </mesh>
            <mesh castShadow position={[x, -0.42, -0.52]}>
              <boxGeometry args={[0.15, 0.09, 0.24]} />
              <meshStandardMaterial color={PALETTE.shoe} />
            </mesh>
          </group>
        ) : (
          <group key={x}>
            <mesh castShadow position={[x, -0.25, 0]}>
              <capsuleGeometry args={[0.09, 0.55, 4, 10]} />
              <meshStandardMaterial color={PALETTE.pants} />
            </mesh>
            <mesh castShadow position={[x, -0.62, 0.05]}>
              <boxGeometry args={[0.15, 0.09, 0.26]} />
              <meshStandardMaterial color={PALETTE.shoe} />
            </mesh>
          </group>
        ),
      )}

      {/* Torso */}
      <group ref={torso} position={[0, 0.42, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.22, 0.32, 6, 14]} />
          <meshStandardMaterial color={PALETTE.hoodie} />
        </mesh>
        {/* Hoodie pocket stripe */}
        <mesh position={[0, -0.08, sitting ? -0.215 : 0.215]}>
          <boxGeometry args={[0.24, 0.1, 0.02]} />
          <meshStandardMaterial color={PALETTE.violet} />
        </mesh>
      </group>

      {/* Arms (pivot at shoulders) */}
      <group ref={leftArm} position={[-0.29, 0.6, 0]} rotation={[sitting ? 1.15 : 0, 0, sitting ? 0 : -0.15]}>
        <mesh castShadow position={[0, -0.2, 0]}>
          <capsuleGeometry args={[0.07, 0.3, 4, 10]} />
          <meshStandardMaterial color={PALETTE.hoodie} />
        </mesh>
        <mesh position={[0, -0.42, 0]}>
          <sphereGeometry args={[0.07, 10, 10]} />
          <meshStandardMaterial color={PALETTE.skin} />
        </mesh>
      </group>
      <group ref={rightArm} position={[0.29, 0.6, 0]} rotation={[sitting ? 1.15 : 0, 0, sitting ? 0 : 2.6]}>
        <mesh castShadow position={[0, -0.2, 0]}>
          <capsuleGeometry args={[0.07, 0.3, 4, 10]} />
          <meshStandardMaterial color={PALETTE.hoodie} />
        </mesh>
        <mesh position={[0, -0.42, 0]}>
          <sphereGeometry args={[0.07, 10, 10]} />
          <meshStandardMaterial color={PALETTE.skin} />
        </mesh>
      </group>

      {/* Head */}
      <group ref={head} position={[0, 0.98, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.26, 20, 20]} />
          <meshStandardMaterial color={PALETTE.skin} />
        </mesh>
        <mesh castShadow position={[0, 0.07, sitting ? 0.03 : -0.03]} scale={[1.06, 0.92, 1.04]}>
          <sphereGeometry args={[0.27, 20, 20, 0, Math.PI * 2, 0, Math.PI / 1.8]} />
          <meshStandardMaterial color={PALETTE.hair} />
        </mesh>
        {!sitting && (
          <group position={[0, -0.02, 0.24]}>
            {/* Eyes, glasses and smile for the front-facing pose */}
            {[-0.09, 0.09].map((x) => (
              <group key={x} position={[x, 0.02, 0]}>
                <mesh>
                  <sphereGeometry args={[0.028, 10, 10]} />
                  <meshStandardMaterial color={PALETTE.hair} />
                </mesh>
                <mesh position={[0, 0, 0.005]}>
                  <torusGeometry args={[0.06, 0.012, 8, 20]} />
                  <meshStandardMaterial color={PALETTE.frame} />
                </mesh>
              </group>
            ))}
            <mesh position={[0, -0.09, -0.01]} rotation={[0, 0, Math.PI]}>
              <torusGeometry args={[0.05, 0.012, 8, 16, Math.PI]} />
              <meshStandardMaterial color="#c4566f" />
            </mesh>
          </group>
        )}
        {/* Headphones */}
        <mesh position={[0, 0.02, 0]}>
          <torusGeometry args={[0.3, 0.03, 8, 24, Math.PI]} />
          <meshStandardMaterial color={PALETTE.frame} />
        </mesh>
        {[-0.29, 0.29].map((x) => (
          <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.09, 0.09, 0.07, 14]} />
            <meshStandardMaterial color={PALETTE.cyan} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
