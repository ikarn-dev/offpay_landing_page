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
      style={{
        padding: "6rem 1.5rem",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div data-sec-header style={{ textAlign: "center", marginBottom: "4rem", opacity: 0 }}>
        <h2
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#fff",
            margin: "0 0 1rem",
          }}
        >
          {headline}
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            color: "rgba(255,255,255,0.6)",
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
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {features.map((feature) => (
          <div
            key={String(feature.title)}
            data-sec-card
            style={{
              opacity: 0,
              padding: "2rem",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background:
                  "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(6,182,212,0.15))",
                border: "1px solid rgba(16,185,129,0.3)",
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
                color: "#fff",
                margin: "0 0 0.5rem",
                letterSpacing: "-0.01em",
              }}
            >
              {feature.title}
            </h3>
            <p
              style={{
                fontSize: "0.92rem",
                color: "rgba(255,255,255,0.55)",
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
