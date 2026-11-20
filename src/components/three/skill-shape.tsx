import type { SkillShape } from "@/lib/skills.ts";
import {
  AtomIcon,
  BagIcon,
  BoltIcon,
  BranchIcon,
  BrowserIcon,
  CodeIcon,
  CubeIcon,
  DatabaseIcon,
  DiscIcon,
  GearIcon,
  GemIcon,
  HashIcon,
  KnotIcon,
  RingIcon,
} from "./tech-icons.tsx";

/** Renders the 3D icon for a skill shape in the given color. */
export default function SkillShapeMesh({ shape, color }: { shape: SkillShape; color: string }) {
  switch (shape) {
    case "bag":
      return <BagIcon color={color} />;
    case "disc":
      return <DiscIcon color={color} />;
    case "code":
      return <CodeIcon />;
    case "atom":
      return <AtomIcon color={color} />;
    case "gear":
      return <GearIcon color={color} />;
    case "cube":
      return <CubeIcon color={color} />;
    case "database":
      return <DatabaseIcon color={color} />;
    case "hash":
      return <HashIcon color={color} />;
    case "gem":
      return <GemIcon color={color} />;
    case "knot":
      return <KnotIcon color={color} />;
    case "bolt":
      return <BoltIcon color={color} />;
    case "browser":
      return <BrowserIcon color={color} />;
    case "branch":
      return <BranchIcon color={color} />;
    case "ring":
      return <RingIcon color={color} />;
  }
}
