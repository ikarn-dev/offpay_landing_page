/**
 * Pricing — displays pricing plans side-by-side.
 *
 * Responsibilities (this pass):
 *   • Renders headline + subheadline.
 *   • Renders a PricingCard for each PricingPlan.
 *   • Scroll-triggered stagger animation.
 *
 * Props: all content injected.
 *
 * @product-input  Final plan names, prices, feature lists, and CTA destinations.
 */

"use client";

import { useRef, useEffect } from "react";
import { animateScrollStaggerIn } from "@/utils/animation";
import type { PricingPlan } from "@/types";

export interface PricingProps {
  headline: string;
  subheadline: string;
  plans: PricingPlan[];
}

export default function Pricing({ headline, subheadline, plans }: PricingProps) {
  const handleCtaClick = (plan: PricingPlan) => {
    // TODO: implement CTA click behaviour (e.g. router.push, analytics, etc.)
    console.log("CTA clicked for plan:", plan.tier);
  };
  const sectionRef = useRef<HTMLElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>("[data-pricing-card]");
    tlRef.current = animateScrollStaggerIn(cards, {
      triggerElement: section,
      stagger: 0.12,
    });

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      aria-labelledby="pricing-heading"
      className="section-spacing"
    >
      <div className="section-container">
        {/* Section header */}
        <div className="section-header">
          <h2 id="pricing-heading">{headline}</h2>
          <p>{subheadline}</p>
        </div>

        {/* Plan cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            alignItems: "start",
          }}
        >
          {plans.map((plan) => {
            const isPopular = plan.highlighted;
            return (
              <div
                key={plan.tier}
                data-pricing-card
                className="glass-card"
                style={{
                  opacity: 0,
                  padding: "2rem",
                  position: "relative",
                  borderColor: isPopular ? "var(--color-accent)" : undefined,
                  boxShadow: isPopular ? "0 0 40px var(--color-accent-glow)" : undefined,
                }}
                aria-label={`${plan.name} plan`}
              >
                {isPopular && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-12px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "var(--gradient-accent)",
                      color: "#fff",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      padding: "0.25rem 0.85rem",
                      borderRadius: "var(--radius-full)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Most popular
                  </div>
                )}

                <div style={{ marginBottom: "1.5rem" }}>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: isPopular ? "var(--color-accent-light)" : "var(--color-text-muted)",
                      margin: "0 0 0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {plan.name}
                  </p>
                  <p style={{ margin: "0 0 0.5rem", display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
                    <span
                      style={{
                        fontSize: "2.75rem",
                        fontWeight: 800,
                        letterSpacing: "-0.03em",
                        color: "var(--color-text)",
                      }}
                    >
                      {plan.price}
                    </span>
                    {plan.billingNote && (
                      <span style={{ fontSize: "0.85rem", color: "var(--color-text-dim)" }}>
                        {plan.billingNote}
                      </span>
                    )}
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.5 }}>
                    {plan.description}
                  </p>
                </div>

                <ul
                  role="list"
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 2rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.65rem",
                  }}
                >
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        fontSize: "0.9rem",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                        <path d="M13.5 4.5L6.5 11.5L2.5 7.5" stroke="var(--color-accent-light)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={isPopular ? "btn btn-primary" : "btn btn-secondary"}
                  style={{ width: "100%" }}
                  onClick={() => handleCtaClick(plan)}
                >
                  {plan.ctaLabel}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
