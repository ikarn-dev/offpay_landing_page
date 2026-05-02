/**
 * HowItWorks — visual step-by-step walkthrough of the offline payment flow.
 *
 * Content sourced from PRD §5.1 (Durable Nonce Architecture).
 * Client Component — uses scroll-triggered stagger animation.
 */

"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { HowItWorksStep } from "@/types";

gsap.registerPlugin(ScrollTrigger);

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

    // Animate the header
    const header = el.querySelector<HTMLElement>("[data-hiw-header]");
    if (header) {
      gsap.fromTo(header,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: header, start: "top 85%", toggleActions: "play none none none" }
        }
      );
    }

    // Animate each step card
    const cards = el.querySelectorAll<HTMLElement>("[data-hiw-step]");
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: i * 0.08, ease: "power2.out",
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
      id="how-it-works"
      ref={sectionRef}
      style={{
        padding: "6rem 1.5rem",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div data-hiw-header style={{ textAlign: "center", marginBottom: "4rem", opacity: 0 }}>
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
        {steps.map((step) => (
          <div
            key={step.step}
            data-hiw-step
            style={{
              opacity: 0,
              display: "grid",
              gridTemplateColumns: "60px 1fr",
              gap: "1.5rem",
              alignItems: "start",
              padding: "2rem",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
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
    </section>
  );
}
