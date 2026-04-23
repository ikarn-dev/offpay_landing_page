/**
 * Features — redesigned section showcasing the 3 core product pillars.
 *
 * Layout:
 *   • Two-column top row: left = heading + subtext + CTAs + ratings,
 *     right = mockup image
 *   • Bottom row: feature cards in a horizontal row (existing grid, unchanged)
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
  mockupImage?: string;
  ctas?: React.ReactNode;
  ratings?: { value: string; label: string }[];
}

export default function Features({
  headline,
  subheadline,
  features,
  mockupImage,
  ctas,
  ratings,
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
      style={{ position: "relative" }}
    >
      {/* Background split container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: "0 0 55%", background: "#e8f5e9" }} />
        <div style={{ flex: "1 1 45%", background: "var(--color-bg)" }} />
      </div>

      <div className="section-container relative z-10">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "2rem",
            alignItems: "stretch",
          }}
        >
          {/* ── Left Column: Text + Cards ─────────────────────────────── */}
          <div style={{ flex: "1 1 65%", display: "flex", flexDirection: "column" }}>
            
            {/* Upper area text */}
            <div style={{ marginBottom: "4rem" }}>
              <h2
                id="features-heading"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  margin: "0 0 1rem",
                  color: "var(--color-text)",
                  lineHeight: 1.2,
                  textWrap: "balance",
                }}
              >
                {headline}
              </h2>
              <p
                style={{
                  fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.7,
                  margin: "0 0 2rem",
                  fontFamily: "var(--font-body)",
                }}
              >
                {subheadline}
              </p>

              {ctas && (
                <div style={{ marginBottom: "2rem" }}>{ctas}</div>
              )}

              {ratings && ratings.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    gap: "2rem",
                    flexWrap: "wrap",
                    alignItems: "baseline",
                  }}
                >
                  {ratings.map((rating, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "1.75rem",
                          fontWeight: 700,
                          color: "var(--color-text)",
                          lineHeight: 1,
                        }}
                      >
                        {rating.value}
                      </span>
                      <span
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--color-text-muted)",
                        }}
                      >
                        {rating.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Lower area cards */}
            <div className="features-grid" style={{ flex: 1, alignContent: "flex-end" }}>
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

          {/* ── Right Column: Mockup Image ─────────────────────────────── */}
          {mockupImage && (
            <div
              style={{
                flex: "1 1 30%",
                position: "relative",
                minHeight: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src={mockupImage}
                alt="App mockup"
                width={500}
                height={900}
                style={{
                  width: "100%",
                  height: "115%",
                  maxWidth: "500px",
                  objectFit: "contain",
                  position: "absolute",
                  top: "-5%",
                }}
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
