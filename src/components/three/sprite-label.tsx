import { useEffect, useMemo } from "react";
import { CanvasTexture, SRGBColorSpace } from "three";
import type { Vec3 } from "./palette.ts";

type SpriteLabelProps = {
  text: string;
  position: Vec3;
  /** World-space height of the pill. */
  height?: number;
  background?: string;
  border?: string;
  color?: string;
};

const FONT_PX = 40;
const PAD_X = 28;
const PAD_Y = 16;

/** Draws a rounded "pill" label to a canvas texture. */
function drawLabel(text: string, background: string, border: string, color: string) {
  const font = `600 ${FONT_PX}px "JetBrains Mono", ui-monospace, monospace`;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return { texture: new CanvasTexture(canvas), aspect: 1 };
  ctx.font = font;
  const width = Math.ceil(ctx.measureText(text).width) + PAD_X * 2;
  const height = FONT_PX + PAD_Y * 2;
  canvas.width = width;
  canvas.height = height;
  // Resizing resets the context state
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = background;
  ctx.strokeStyle = border;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(1.5, 1.5, width - 3, height - 3, (height - 3) / 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fillText(text, width / 2, height / 2 + 2);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return { texture, aspect: width / height };
}

/**
 * A camera-facing text label rendered inside the WebGL scene. Used instead of
 * drei's <Html>, whose separate React root crashes when unmounted mid-render.
 */
export default function SpriteLabel({
  text,
  position,
  height = 0.32,
  background = "rgba(23,22,58,0.88)",
  border = "rgba(255,255,255,0.4)",
  color = "#ffffff",
}: SpriteLabelProps) {
  const { texture, aspect } = useMemo(
    () => drawLabel(text, background, border, color),
    [text, background, border, color],
  );
  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <sprite position={position} scale={[height * aspect, height, 1]} renderOrder={10}>
      <spriteMaterial map={texture} transparent depthTest={false} depthWrite={false} toneMapped={false} />
    </sprite>
  );
}
