/**
 * Features — showcases the 4 core product pillars + app mockup.
 *
 * Layout (reference: Finzora-style bento):
 *   • Header row: headline (left) + subheadline (right)
 *   • Content: 2-column split —
 *       left  = 2×2 grid of sharp-edged gradient cards
 *       right = tall mockup card (spans full height)
 *
 * Each card includes:
 *   • Mesh gradient background (#000000 → #001A4E → #0077CC)
 *   • HalftoneDots paper texture (@paper-design/shaders-react)
 *   • 3D asset image from public/3d-assets/
 *
 * Card style: sharp edges, no border-radius, no outer glow border.
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
  headlineItalic?: string;
  subheadline: string;
  features: Feature[];
}

export default function Features({
  headline,
  headlineItalic,
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
        {/* ── Header row: headline left, subtext right ───────────── */}
        <div className="features-header">
          <h2 id="features-heading" className="features-header__title">
            {headline}{" "}
            {headlineItalic && (
              <em className="features-header__title-italic">{headlineItalic}</em>
            )}
          </h2>
          <p className="features-header__sub">{subheadline}</p>
        </div>

        {/* ── Content: 2×2 cards left + mockup right ─────────────── */}
        <div className="features-layout">
          {/* Left — 2×2 grid of sharp-edged cards */}
          <div className="features-cards">
            {features.map((feature, i) => (
              <div
                key={i}
                data-feature-card
                className="feature-card"
                style={{ opacity: 0 }}
              >
                {/* Layer 1: Mesh gradient */}
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

                {/* Content — vertical: image top, text bottom */}
                <div className="feature-card__content">
                  {feature.image && (
                    <div className="feature-card__image">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        width={140}
                        height={140}
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

          {/* Right — mockup card with subtle bg */}
          <div
            data-feature-card
            className="features-mockup"
            style={{ opacity: 0 }}
          >
            <div className="features-mockup__inner">
              <Image
                src="/mockups/feat-mock.png"
                alt="OffPay app preview"
                width={360}
                height={780}
                className="features-mockup__image"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
