/**
 * Security — showcases OffPay's self-custody and privacy guarantees.
 *
 * Content sourced from PRD §3 (Wallet Philosophy) and §7 (Umbra Protocol).
 * Client Component — uses scroll-triggered stagger animation.
 */

"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SecurityFeature } from "@/types";

gsap.registerPlugin(ScrollTrigger);

export interface SecurityProps {
  headline: string;
  subheadline: string;
  features: SecurityFeature[];
}

export default function Security({
  headline,
  subheadline,
  features,
}: SecurityProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Animate the header
    const header = el.querySelector<HTMLElement>("[data-sec-header]");
    if (header) {
      gsap.fromTo(header,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: header, start: "top 85%", toggleActions: "play none none none" }
        }
      );
    }

    // Animate each security card
    const cards = el.querySelectorAll<HTMLElement>("[data-sec-card]");
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 35, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: i * 0.06, ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll()
        .filter(st => st.trigger && el.contains(st.trigger))
        .forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      id="security"
      ref={sectionRef}
      className="section-spacing adaptive-section section-container"
      style={{ maxWidth: "1100px" }}
    >
      {/* Header */}
      <div
        data-sec-header
        style={{
          textAlign: "center",
          marginBottom: "clamp(2rem, 7svh, 4rem)",
          opacity: 0,
        }}
      >
        <h2
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 700,
            letterSpacing: "0",
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
            maxWidth: "620px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          {subheadline}
        </p>
      </div>

      {/* Feature grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
          gap: "clamp(1rem, 2vw, 1.5rem)",
        }}
      >
        {features.map((feature) => (
          <div
            key={String(feature.title)}
            data-sec-card
            style={{
              opacity: 0,
              padding: "clamp(1.35rem, 3vw, 2rem)",
              borderRadius: "20px",
              background: "var(--gradient-card)",
              border: "1px solid var(--color-border)",
              boxShadow:
                "0 16px 38px rgba(14, 42, 53, 0.12), inset 1px 1px 0 rgba(252, 252, 255, 0.78)",
              transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--gradient-card-hover)";
              e.currentTarget.style.borderColor = "rgba(14, 42, 53, 0.18)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--gradient-card)";
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, rgba(252,252,255,0.92), rgba(91,200,232,0.24))",
                border: "1px solid rgba(252,252,255,0.82)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                marginBottom: "1.25rem",
              }}
            >
              {feature.icon}
            </div>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--color-text)",
                margin: "0 0 0.5rem",
                letterSpacing: "0",
              }}
            >
              {feature.title}
            </h3>
            <p
              style={{
                fontSize: "0.92rem",
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
    </section>
  );
}
