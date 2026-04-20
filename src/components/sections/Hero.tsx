/**
 * Hero — the above-the-fold section.
 *
 * Clean layout: headline, subheadline, single CTA.
 * Background: static gradient with HalftoneDots texture.
 */

"use client";

import { useRef, useEffect } from "react";
import { animateStaggerIn } from "@/utils/animation";
import MeshGradient from "@/components/ui/MeshGradient";
import { LiquidMetalButton } from "@/components/ui/liquid-metal";

export interface HeroProps {
  headlineLine1: string;
  headlineLine2: string;
  subheadline: React.ReactNode;
  ctaPrimary: React.ReactNode;
  background?: React.ReactNode;
}

export default function Hero({
  headlineLine1,
  headlineLine2,
  subheadline,
  ctaPrimary,
  background,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>("[data-hero-item]");
    tlRef.current = animateStaggerIn(targets, { stagger: 0.12, y: 30 });

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  return (
    <section
      aria-label="Hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "6rem",
        paddingBottom: "4rem",
        borderRadius: "var(--radius-xl)",
        margin: "8px",
      }}
    >
      {background && (
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {background}
        </div>
      )}

      <MeshGradient />

      <div
        ref={containerRef}
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: "var(--container-max)",
          padding: "0 var(--section-px)",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Powered By Badge */}
        <div
          data-hero-item
          style={{
            opacity: 0,
            display: "flex",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <LiquidMetalButton
            icon={
              <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4">
                <path
                  d="M6.5 22.5L10.2 18.6C10.4 18.4 10.7 18.3 11 18.3H27.2C27.7 18.3 27.9 18.9 27.6 19.2L23.9 23.1C23.7 23.3 23.4 23.4 23.1 23.4H6.9C6.4 23.4 6.2 22.8 6.5 22.5Z"
                  fill="url(#solHero1)"
                />
                <path
                  d="M6.5 9.2L10.2 13.1C10.4 13.3 10.7 13.4 11 13.4H27.2C27.7 13.4 27.9 12.8 27.6 12.5L23.9 8.6C23.7 8.4 23.4 8.3 23.1 8.3H6.9C6.4 8.3 6.2 8.9 6.5 9.2Z"
                  fill="url(#solHero2)"
                />
                <path
                  d="M6.5 15.8L10.2 11.9C10.4 11.7 10.7 11.6 11 11.6H27.2C27.7 11.6 27.9 12.2 27.6 12.5L23.9 16.4C23.7 16.6 23.4 16.7 23.1 16.7H6.9C6.4 16.7 6.2 16.1 6.5 15.8Z"
                  fill="url(#solHero1)"
                />
                <defs>
                  <linearGradient id="solHero1" x1="6" y1="8" x2="28" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9945FF" />
                    <stop offset="1" stopColor="#14F195" />
                  </linearGradient>
                  <linearGradient id="solHero2" x1="6" y1="8" x2="28" y2="24" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#9945FF" />
                    <stop offset="1" stopColor="#14F195" />
                  </linearGradient>
                </defs>
              </svg>
            }
            size="sm"
            borderWidth={3}
            metalConfig={{
              colorBack: "#001A4E",
              colorTint: "#00DFFF",
              distortion: 0.15,
              speed: 0.4,
            }}
          >
            Powered by Solana
          </LiquidMetalButton>
        </div>

        {/* Headline */}
        <h1
          data-hero-item
          style={{
            opacity: 0,
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            margin: "0 0 1.5rem",
            color: "#dce8f8",
            textShadow: "0 0 40px rgba(0, 119, 204, 0.25), 0 2px 8px rgba(0, 0, 0, 0.4)",
            textWrap: "balance",
          }}
        >
          {headlineLine1}
          <br />
          {headlineLine2}
        </h1>

        {/* Subheadline */}
        <p
          className="hero-subheadline"
          data-hero-item
          style={{
            opacity: 0,
            fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)",
            fontFamily: "var(--font-heading)",
            background: "linear-gradient(135deg, #B0EFFF 0%, #00DFFF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: "0 auto 2.5rem",
            lineHeight: 1.4,
            fontWeight: 700,
            textAlign: "center",
            maxWidth: "660px",
            padding: "0 1rem",
          }}
        >
          {subheadline}
        </p>

        {/* CTA */}
        <div
          data-hero-item
          style={{
            opacity: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {ctaPrimary}
        </div>
      </div>
    </section>
  );
}
