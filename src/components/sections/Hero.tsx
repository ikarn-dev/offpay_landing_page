/**
 * Hero — the above-the-fold section.
 *
 * Clean layout: headline, subheadline, single CTA.
 * Background: static gradient with HalftoneDots texture.
 */

"use client";

import { useRef, useEffect } from "react";
import { animateStaggerIn } from "@/utils/animation";
import MeshGradient from "@/components/ui/MeshGradient";

export interface HeroProps {
  headlineLine1: string;
  headlineLine2: string;
  subheadline: string;
  ctaPrimary: React.ReactNode;
  background?: React.ReactNode;
}

export default function Hero({
  headlineLine1,
  headlineLine2,
  subheadline,
  ctaPrimary,
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
        borderRadius: "var(--radius-xl)",
        margin: "8px",
      }}
    >
      {background && (
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {background}
        </div>
      )}

      <MeshGradient />

      <div
        ref={containerRef}
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: "var(--container-max)",
          padding: "0 var(--section-px)",
          margin: "0 auto",
          width: "100%",
        }}
      >
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
            color: "#fff",
          }}
        >
          {headlineLine1}
          <br />
          {headlineLine2}
        </h1>

        {/* Subheadline */}
        <p
          data-hero-item
          style={{
            opacity: 0,
            fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
            color: "#B0EFFF",
            maxWidth: "660px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          {subheadline}
        </p>

        {/* CTA */}
        <div
          data-hero-item
          style={{
            opacity: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {ctaPrimary}
        </div>
      </div>
    </section>
  );
}
