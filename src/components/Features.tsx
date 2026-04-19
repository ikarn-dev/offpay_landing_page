/**
 * Features — section that showcases the product's key capabilities.
 *
 * Responsibilities (this pass):
 *   • Renders a section headline + subheadline.
 *   • Renders a grid of FeatureCard components.
 *   • Scroll-triggered stagger animation via the shared animation utility.
 *
 * Props: all content injected.
 *
 * @product-input  Feature icons, titles, descriptions, and layout preference
 *                 (grid columns, card style).
 */

"use client";

import { useRef, useEffect } from "react";
import { animateScrollStaggerIn } from "@/utils/animation";
import type { Feature } from "@/types";

export interface FeaturesProps {
  headline: string;
  subheadline: string;
  features: Feature[];
}

export default function Features({ headline, subheadline, features }: FeaturesProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>("[data-feature-card]");
    tlRef.current = animateScrollStaggerIn(cards, {
      triggerElement: section,
      stagger: 0.1,
    });

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      aria-labelledby="features-heading"
      className="section-spacing"
    >
      <div className="section-container">
        {/* Section header */}
        <div className="section-header">
          <h2 id="features-heading">{headline}</h2>
          <p>{subheadline}</p>
        </div>

        {/* Feature cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {features.map((feature, i) => (
            <div
              key={i}
              data-feature-card
              className="glass-card"
              style={{ opacity: 0, padding: "2rem" }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "var(--radius-md)",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  marginBottom: "1.25rem",
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 600,
                  margin: "0 0 0.5rem",
                  color: "var(--color-text)",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
