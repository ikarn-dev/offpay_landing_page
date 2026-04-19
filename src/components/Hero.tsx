/**
 * Hero — the above-the-fold section.
 *
 * Responsibilities (this pass):
 *   • Renders eyebrow, headline, subheadline, CTA group, and stats row.
 *   • Runs staggered entrance animations via the shared animation utility.
 *   • Background decoration slot for compositor-safe visual elements.
 *
 * Props: all content injected — no hardcoded strings.
 *
 * @product-input  Final headline copy, CTA destinations, stat values.
 */

"use client";

import { useRef, useEffect } from "react";
import { animateStaggerIn } from "@/utils/animation";
import type { Stat } from "@/types";

export interface HeroProps {
  /** Short badge / pill text above the headline. */
  eyebrow: string;
  /** First line of the main headline. */
  headlineLine1: string;
  /** Second line of the main headline (accent colour applied by content pass). */
  headlineLine2: string;
  /** Supporting paragraph beneath the headline. */
  subheadline: string;
  /** Primary CTA element (button or link). */
  ctaPrimary: React.ReactNode;
  /** Secondary CTA element. */
  ctaSecondary: React.ReactNode;
  /** Array of stats rendered in the bottom row. */
  stats: Stat[];
  /** Optional background decoration (grid, gradient blob, etc.). */
  background?: React.ReactNode;
}

export default function Hero({
  eyebrow,
  headlineLine1,
  headlineLine2,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  stats,
  background,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>("[data-hero-item]");
    tlRef.current = animateStaggerIn(targets, { stagger: 0.12, y: 30 });

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  return (
    <section
      aria-label="Hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "6rem",
        paddingBottom: "4rem",
      }}
    >
      {/* Background decoration — compositor safe, purely visual */}
      {background && (
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {background}
        </div>
      )}

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "600px",
          background: "radial-gradient(ellipse at center, rgba(124, 58, 237, 0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        ref={containerRef}
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: "var(--container-narrow)",
          padding: "0 var(--section-px)",
          margin: "0 auto",
        }}
      >
        {/* Eyebrow badge */}
        <div data-hero-item style={{ opacity: 0, marginBottom: "1.5rem" }}>
          <span className="badge">
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
            {eyebrow}
          </span>
        </div>

        {/* Headline */}
        <h1
          data-hero-item
          style={{
            opacity: 0,
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            margin: "0 0 1.5rem",
          }}
        >
          {headlineLine1}
          <br />
          <span className="gradient-text">{headlineLine2}</span>
        </h1>

        {/* Subheadline */}
        <p
          data-hero-item
          style={{
            opacity: 0,
            fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
            color: "var(--color-text-muted)",
            maxWidth: "560px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          {subheadline}
        </p>

        {/* CTA group */}
        <div
          data-hero-item
          style={{
            opacity: 0,
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: "4rem",
          }}
        >
          {ctaPrimary}
          {ctaSecondary}
        </div>

        {/* Stats row */}
        <div
          data-hero-item
          style={{
            opacity: 0,
            display: "flex",
            justifyContent: "center",
            gap: "3rem",
            flexWrap: "wrap",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                textAlign: "center",
                paddingLeft: i > 0 ? "3rem" : 0,
                borderLeft: i > 0 ? "1px solid var(--color-border)" : "none",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
                className="gradient-text"
              >
                {stat.value}
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "0.85rem",
                  color: "var(--color-text-muted)",
                  marginTop: "0.25rem",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
