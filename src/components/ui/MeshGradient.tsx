/**
 * MeshGradient — static radial gradient with HalftoneDots shader texture.
 *
 * Gradient: dark center (#000000) radiating outward through deep navy (#001A4E)
 * to azure blue (#0077CC) at the edges — matching the OnRamp reference but in
 * dark mode using the Azure Gradient Palette.
 *
 * Texture: @paper-design/shaders-react HalftoneDots overlay for the dotted
 * pattern visible in the reference.
 */

"use client";

import { HalftoneDots } from "@paper-design/shaders-react";

/* ------------------------------------------------------------------ */
/* Azure Gradient Palette                                              */
/*   #000000  — black (center)                                         */
/*   #001A4E  — deep navy (mid)                                        */
/*   #0077CC  — azure blue (edges)                                     */
/*   #00DFFF  — cyan (highlight)                                       */
/*   #B0EFFF  — light cyan (not used — too bright for dark theme)      */
/* ------------------------------------------------------------------ */

export interface MeshGradientProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function MeshGradient({ className, style }: MeshGradientProps) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        ...style,
      }}
    >
      {/* Static radial gradient — dark center, blue edges */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(
              180deg,
              #000000 0%,
              #000000 20%,
              #001A4E 55%,
              #0077CC 100%
            )
          `,
        }}
      />

      {/* HalftoneDots shader texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.35,
          mixBlendMode: "screen",
        }}
      >
        <HalftoneDots
          style={{ width: "100%", height: "100%" }}
          colorBack="#000000"
          colorFront="#0077CC"
          originalColors={false}
          type="gooey"
          grid="hex"
          inverted={false}
          size={0.4}
          radius={1.2}
          contrast={0.3}
          grainMixer={0.15}
          grainOverlay={0.15}
          grainSize={0.4}
        />
      </div>
    </div>
  );
}
