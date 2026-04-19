/**
 * Faq — Frequently Asked Questions accordion section.
 *
 * Responsibilities (this pass):
 *   • Renders headline.
 *   • Renders an accordion list of FaqItem entries.
 *   • Open/close state is managed locally per item.
 *   • Height animation uses CSS `grid-template-rows: 0fr ↔ 1fr` —
 *     compositor-safe, no layout properties animated.
 *
 * Props: all content injected.
 *
 * @product-input  Final FAQ copy, and whether multiple items can be open
 *                 simultaneously (currently single-open).
 */

"use client";

import { useState, useRef, useEffect, useId } from "react";
import { animateScrollFadeIn } from "@/utils/animation";
import type { FaqItem } from "@/types";

export interface FaqProps {
  headline: string;
  items: FaqItem[];
}

/** Individual accordion item — its own component to keep Faq clean. */
interface AccordionItemProps {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ item, isOpen, onToggle }: AccordionItemProps) {
  const id = useId();
  const panelId = `faq-panel-${id}`;
  const triggerId = `faq-trigger-${id}`;

  return (
    <div
      data-faq-item
      style={{
        opacity: 0,
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <h3 style={{ margin: 0 }}>
        <button
          id={triggerId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.25rem 0",
            background: "none",
            border: "none",
            color: "var(--color-text)",
            fontSize: "1.05rem",
            fontWeight: 500,
            cursor: "pointer",
            textAlign: "left",
            gap: "1rem",
            fontFamily: "inherit",
          }}
        >
          {item.question}
          {/* Chevron icon */}
          <span
            className="accordion-chevron"
            aria-hidden="true"
            data-open={isOpen ? "true" : "false"}
          >
            ▾
          </span>
        </button>
      </h3>

      {/* CSS grid trick: grid-template-rows transition */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="accordion-panel"
        data-open={isOpen ? "true" : "false"}
      >
        <div className="accordion-panel-inner">
          <p
            style={{
              margin: 0,
              padding: "0 0 1.25rem",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              color: "var(--color-text-muted)",
            }}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Faq({ headline, items }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const faqItems = section.querySelectorAll<HTMLElement>("[data-faq-item]");
    // Stagger via scroll trigger
    faqItems.forEach((el, i) => {
      tweenRef.current = animateScrollFadeIn(el, {
        triggerElement: el,
        delay: i * 0.05,
      });
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-labelledby="faq-heading"
      className="section-spacing"
    >
      <div className="section-container section-container--narrow">
        <div className="section-header">
          <h2 id="faq-heading">{headline}</h2>
        </div>

        <div>
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
