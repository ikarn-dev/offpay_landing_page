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
  subheadline: React.ReactNode;
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
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            margin: "0 0 1.5rem",
            color: "#dce8f8",
            textShadow: "0 0 40px rgba(0, 119, 204, 0.25), 0 2px 8px rgba(0, 0, 0, 0.4)",
            textWrap: "balance",
          }}
        >
          {headlineLine1}
          <br />
          {headlineLine2}
        </h1>

        {/* Subheadline */}
        <p
          className="hero-subheadline"
          data-hero-item
          style={{
            opacity: 0,
            fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)",
            fontFamily: "var(--font-heading)",
            background: "linear-gradient(135deg, #B0EFFF 0%, #00DFFF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: "0 auto 2.5rem",
            lineHeight: 1.4,
            fontWeight: 700,
            textAlign: "center",
            maxWidth: "660px",
            padding: "0 1rem",
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
