/**
 * Cta — standalone call-to-action banner section between content blocks.
 *
 * Responsibilities (this pass):
 *   • Renders a headline, supporting copy, and a primary action.
 *   • Scroll-triggered fade-in animation.
 *   • Background slot for compositor-safe decoration.
 *
 * Props: all content injected.
 *
 * @product-input  Final headline, copy, CTA destination, and background treatment.
 */

"use client";

import { useRef, useEffect } from "react";
import { animateScrollFadeIn } from "@/utils/animation";

export interface CtaProps {
  headline: string;
  supporting: string;
  /** CTA element (button or link). */
  action: React.ReactNode;
  /** Optional background decoration. */
  background?: React.ReactNode;
}

export default function Cta({ headline, supporting, action, background }: CtaProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    tweenRef.current = animateScrollFadeIn(content, {
      triggerElement: sectionRef.current,
      y: 30,
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cta-heading"
      className="section-spacing"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {background && (
        <div aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
          {background}
        </div>
      )}

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse at center, rgba(0, 119, 204, 0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        ref={contentRef}
        className="section-container"
        style={{
          opacity: 0,
          position: "relative",
          textAlign: "center",
        }}
      >
        <div
          className="glass-card"
          style={{
            padding: "clamp(2.5rem, 5vw, 4rem)",
            maxWidth: "700px",
            margin: "0 auto",
            borderColor: "var(--color-border-hover)",
          }}
        >
          <h2
            id="cta-heading"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              margin: "0 0 0.75rem",
            }}
          >
            {headline}
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "var(--color-text-muted)",
              margin: "0 0 2rem",
              lineHeight: 1.6,
            }}
          >
            {supporting}
          </p>
          {action}
        </div>
      </div>
    </section>
  );
}
