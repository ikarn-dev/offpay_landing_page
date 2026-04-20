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

      {/* Animated Waves Overlay — pure SVG/CSS, GPU-accelerated, no layout thrashing */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.6,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      >
        <style>
          {`
            @keyframes mesh-wave-slide-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes mesh-wave-slide-right {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
          `}
        </style>

        {/* Wave 1 (Back, taller, slower, moving left) */}
        <svg
          viewBox="0 0 800 400"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            width: "200%",
            height: "70%",
            left: 0,
            bottom: 0,
            animation: "mesh-wave-slide-left 25s linear infinite",
            transformOrigin: "bottom center",
            willChange: "transform",
          }}
        >
          <path
            d="M0,200 C100,100 300,300 400,200 C500,100 700,300 800,200 L800,400 L0,400 Z"
            fill="url(#wave-grad-1)"
          />
          <defs>
            <linearGradient id="wave-grad-1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#001A4E" stopOpacity="0" />
              <stop offset="100%" stopColor="#001A4E" stopOpacity="0.7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Wave 2 (Front, shallower, faster, moving right) */}
        <svg
          viewBox="0 0 800 400"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            width: "200%",
            height: "45%",
            left: 0,
            bottom: 0,
            animation: "mesh-wave-slide-right 18s linear infinite",
            transformOrigin: "bottom center",
            willChange: "transform",
          }}
        >
          <path
            d="M0,200 C150,300 250,100 400,200 C550,300 650,100 800,200 L800,400 L0,400 Z"
            fill="url(#wave-grad-2)"
          />
          <defs>
            <linearGradient id="wave-grad-2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0077CC" stopOpacity="0" />
              <stop offset="100%" stopColor="#0077CC" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

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
