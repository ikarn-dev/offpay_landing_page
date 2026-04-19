/**
 * Testimonials — social proof section.
 *
 * Responsibilities (this pass):
 *   • Renders headline + subheadline.
 *   • Renders a grid / marquee of TestimonialCard components.
 *   • Scroll-triggered entrance animation.
 *
 * Props: all content injected.
 *
 * @product-input  Real quotes, author names/roles/companies, avatar images,
 *                 and layout choice (static grid vs. auto-scroll marquee).
 */

"use client";

import { useRef, useEffect } from "react";
import { animateScrollStaggerIn } from "@/utils/animation";
import type { Testimonial } from "@/types";

export interface TestimonialsProps {
  headline: string;
  subheadline: string;
  testimonials: Testimonial[];
}

export default function Testimonials({
  headline,
  subheadline,
  testimonials,
}: TestimonialsProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>("[data-testimonial-card]");
    tlRef.current = animateScrollStaggerIn(cards, {
      triggerElement: section,
      stagger: 0.1,
    });

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="section-spacing"
    >
      <div className="section-container">
        {/* Section header */}
        <div className="section-header">
          <h2 id="testimonials-heading">{headline}</h2>
          <p>{subheadline}</p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {testimonials.map((t, i) => (
            <figure
              key={i}
              data-testimonial-card
              className="glass-card"
              style={{ opacity: 0, padding: "2rem", margin: 0 }}
            >
              {/* Stars */}
              <div style={{ marginBottom: "1rem", display: "flex", gap: "0.15rem" }}>
                {[...Array(5)].map((_, si) => (
                  <svg key={si} width="16" height="16" viewBox="0 0 16 16" fill="var(--color-accent-light)">
                    <path d="M8 1.12l1.95 3.95 4.36.64-3.15 3.07.74 4.34L8 10.93l-3.9 2.19.74-4.34L1.69 5.71l4.36-.64L8 1.12z"/>
                  </svg>
                ))}
              </div>

              <blockquote style={{ margin: 0, marginBottom: "1.5rem" }}>
                <p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    color: "var(--color-text-muted)",
                    margin: 0,
                    fontStyle: "normal",
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>

              <figcaption style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                {t.avatarUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={t.avatarUrl}
                    alt={t.authorName}
                    width={40}
                    height={40}
                    style={{
                      borderRadius: "50%",
                      border: "2px solid var(--color-border)",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "var(--gradient-accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {t.authorName.charAt(0)}
                  </div>
                )}
                <div>
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "var(--color-text)",
                    }}
                  >
                    {t.authorName}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.8rem",
                      color: "var(--color-text-dim)",
                    }}
                  >
                    {t.authorRole}, {t.authorCompany}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
