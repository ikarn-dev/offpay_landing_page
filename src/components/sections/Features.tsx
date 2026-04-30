/**
 * Features — showcases the 3 core product pillars.
 *
 * Layout: centered section header + 3 feature cards in a horizontal grid.
 *
 * Each card includes:
 *   • Mesh gradient background (#000000 → #001A4E → #0077CC)
 *   • HalftoneDots paper texture (@paper-design/shaders-react)
 *   • 3D asset image from public/3d-assets/ as primary visual
 *
 * Props: all content injected from page.tsx.
 */

"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { animateScrollStaggerIn } from "@/utils/animation";
import { HalftoneDots } from "@paper-design/shaders-react";
import type { Feature } from "@/types";

export interface FeaturesProps {
  headline: string;
  subheadline: string;
  features: Feature[];
}

export default function Features({
  headline,
  subheadline,
  features,
}: FeaturesProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>("[data-feature-card]");
    tlRef.current = animateScrollStaggerIn(cards, {
      triggerElement: section,
      stagger: 0.15,
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
        {/* Section header — matches HowItWorks / Security pattern */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <h2
            id="features-heading"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--color-text)",
              margin: "0 0 1rem",
            }}
          >
            {headline}
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--color-text-muted)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.6,
              fontFamily: "var(--font-body)",
            }}
          >
            {subheadline}
          </p>
        </div>

        {/* Feature cards */}
        <div className="features-grid">
          {features.map((feature, i) => (
            <div
              key={i}
              data-feature-card
              className="feature-card"
              style={{ opacity: 0 }}
            >
              {/* Layer 1: Mesh gradient background */}
              <div className="feature-card__gradient" aria-hidden="true" />

              {/* Layer 2: HalftoneDots texture */}
              <div className="feature-card__texture" aria-hidden="true">
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

              {/* Content */}
              <div className="feature-card__content">
                {feature.image && (
                  <div className="feature-card__image">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={200}
                      height={200}
                      style={{ objectFit: "contain" }}
                      priority={i === 0}
                    />
                  </div>
                )}

                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__desc">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
