/**
 * HowItWorks — visual step-by-step walkthrough of the offline payment flow.
 *
 * Content sourced from PRD §5.1 (Durable Nonce Architecture).
 * Client Component — uses scroll-triggered stagger animation.
 */

"use client";

import { useRef, useEffect } from "react";
import type { HowItWorksStep } from "@/types";

export interface HowItWorksProps {
  headline: string;
  subheadline: string;
  steps: HowItWorksStep[];
}

export default function HowItWorks({
  headline,
  subheadline,
  steps,
}: HowItWorksProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  }, []);

  return (
    <section
      id="how-it-works"
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
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          {subheadline}
        </p>
      </div>

      {/* Steps */}
      <div
        style={{
          display: "grid",
          gap: "2rem",
        }}
      >
        {steps.map((step, idx) => (
          <div
            key={step.step}
            style={{
              display: "grid",
              gridTemplateColumns: "60px 1fr",
              gap: "1.5rem",
              alignItems: "start",
              padding: "2rem",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
              animation: `fadeSlideIn 0.6s ease ${idx * 0.12}s both`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            {/* Step number + icon */}
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg, rgba(0,119,204,0.25), rgba(0,26,78,0.4))",
                border: "1px solid rgba(0,119,204,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                flexShrink: 0,
              }}
            >
              {step.icon}
            </div>

            {/* Content */}
            <div>
              <div
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "rgba(0,223,255,0.9)",
                  marginBottom: "0.4rem",
                }}
              >
                Step {step.step}
              </div>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "#fff",
                  margin: "0 0 0.5rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
