/**
 * BrandLogoStrip — horizontal marquee of partner / customer logos.
 *
 * Responsibilities (this pass):
 *   • Renders two mirrored logo rows for a seamless infinite scroll effect.
 *   • Animation is CSS-driven (transform only) — zero JS needed at runtime,
 *     so no GSAP dependency here. CSS `@keyframes` on translateX runs on the
 *     compositor thread and never triggers layout.
 *   • `prefers-reduced-motion` is respected via the CSS animation-duration: 0
 *     override in globals.css.
 *
 * Props: all content injected.
 *
 * @product-input  Logo file paths, names, and desired scroll speed.
 */

import type { BrandLogo } from "@/types";

export interface BrandLogoStripProps {
  logos: BrandLogo[];
  /** Aria label for the landmark. Defaults to "Trusted by". */
  ariaLabel?: string;
}

export default function BrandLogoStrip({
  logos,
  ariaLabel = "Trusted by",
}: BrandLogoStripProps) {
  // Duplicate logos to create the seamless marquee effect
  const doubled = [...logos, ...logos];

  return (
    <section
      aria-label={ariaLabel}
      style={{
        paddingTop: "2rem",
        paddingBottom: "2rem",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="marquee-container" aria-hidden="true">
        <div className="marquee-track">
          {doubled.map((logo, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              loading="lazy"
              style={{ opacity: 0.4, filter: "grayscale(1)" }}
            />
          ))}
        </div>
      </div>

      {/* Visually hidden list for accessibility */}
      <ul
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          borderWidth: 0,
        }}
      >
        {logos.map((logo) => (
          <li key={logo.name}>{logo.name}</li>
        ))}
      </ul>
    </section>
  );
}
