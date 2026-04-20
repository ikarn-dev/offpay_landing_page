/**
 * Features — redesigned section showcasing the 3 core product pillars.
 *
 * Each card includes:
 *   • Mesh gradient background (same palette as Hero: #000000 → #001A4E → #0077CC)
 *   • HalftoneDots paper texture (same @paper-design/shaders-react lib + config as Hero)
 *   • Apple Liquid Glass edge glow (soft luminous border, not a hard outline)
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

export default function Features({ headline, subheadline, features }: FeaturesProps) {
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
        {/* Section header */}
        <div className="section-header">
          <h2 id="features-heading" style={{ fontFamily: "var(--font-migra)", fontWeight: "normal" }}>{headline}</h2>
          <p style={{ fontFamily: "var(--font-body)" }}>{subheadline}</p>
        </div>

        {/* Feature cards grid */}
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

              {/* Layer 2: HalftoneDots texture — same lib + config as Hero */}
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

              {/* Content */}
              <div className="feature-card__content">
                {/* 3D image */}
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

                {/* Text */}
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
