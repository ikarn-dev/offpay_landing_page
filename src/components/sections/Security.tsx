/**
 * Security — showcases OffPay's self-custody and privacy guarantees.
 *
 * Content sourced from PRD §3 (Wallet Philosophy) and §7 (Umbra Protocol).
 * Client Component — uses scroll-triggered stagger animation.
 */

"use client";

import { useRef, useEffect } from "react";
import type { SecurityFeature } from "@/types";

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
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  }, []);

  return (
    <section
      id="security"
      ref={sectionRef}
      style={{
        padding: "6rem 1.5rem",
        maxWidth: "1100px",
        margin: "0 auto",
        opacity: 0,
        transform: "translateY(30px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
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
        {features.map((feature, idx) => (
          <div
            key={String(feature.title)}
            style={{
              padding: "2rem",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
              animation: `secFadeIn 0.6s ease ${idx * 0.1}s both`,
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

      <style>{`
        @keyframes secFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
