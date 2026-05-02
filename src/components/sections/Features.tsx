

"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HalftoneDots } from "@paper-design/shaders-react";
import type { Feature } from "@/types";

gsap.registerPlugin(ScrollTrigger);

export interface FeaturesProps {
  sectionLabel?: string;
  taglineBold?: string;
  taglineItalic?: string;
  features: Feature[];
}

export default function Features({
  sectionLabel,
  taglineBold,
  taglineItalic,
  features,
}: FeaturesProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>("[data-feature-card]");

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      triggersRef.current.forEach((st) => st.kill());
      ScrollTrigger.getAll()
        .filter((st) => {
          const trigger = st.trigger;
          return trigger && section.contains(trigger);
        })
        .forEach((st) => st.kill());
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
        {/* ── Centered section title + tagline ─────────────────────── */}
        <div className="section-header" style={{ marginBottom: "2.5rem" }}>
          {sectionLabel && (
            <h2
              id="features-heading"
              style={{
                whiteSpace: "nowrap",
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                margin: "0 auto 1rem",
              }}
            >
              {sectionLabel}
            </h2>
          )}
          <p className="features-tagline">
            {taglineBold && <strong className="features-tagline__bold">{taglineBold}</strong>}{" "}
            {taglineItalic && <em className="features-tagline__italic">{taglineItalic}</em>}
          </p>
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
