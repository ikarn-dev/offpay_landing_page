/**
 * FooterCtaCard — rounded CTA card with download buttons.
 *
 * Renders the top-right zone of the footer: a rounded card with
 * the same mesh gradient + paper texture as the feature cards,
 * "Download" heading, App Store + Play Store buttons with inline
 * "Coming Soon" sub-label, and a direct APK download button.
 */

"use client";

import { FOOTER_CTA_HEADING } from "@/constants";
import { HalftoneDots } from "@paper-design/shaders-react";

/** Shared button styles */
const btnStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.4rem",
  background: "rgba(0, 26, 78, 0.55)",
  backdropFilter: "blur(4px)",
  color: "#fff",
  borderRadius: "var(--radius-sm)",
  padding: "0.35rem 0.6rem",
  textDecoration: "none",
  fontSize: "0.7rem",
  fontWeight: 600,
  fontFamily: "var(--font-body)",
  transition: "opacity var(--duration-base) var(--ease-out)",
  whiteSpace: "nowrap" as const,
  lineHeight: 1.3,
  border: "1px solid rgba(255, 255, 255, 0.1)",
};

const iconStyle: React.CSSProperties = {
  flexShrink: 0,
  display: "block",
  width: "14px",
  height: "14px",
};

export default function FooterCtaCard() {
  return (
    <div className="footer-cta-card" style={{ position: "relative", overflow: "hidden" }}>
      {/* Layer 1: Mesh gradient — same as feature cards */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, #000000 0%, #001A4E 65%, #0077CC 100%)",
        }}
      />

      {/* Layer 2: HalftoneDots paper texture — same config as feature cards */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.25,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      >
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

      {/* Content — above gradient + texture */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <h3
          style={{
            fontSize: "clamp(0.9rem, 1.8vw, 1.2rem)",
            fontWeight: 700,
            color: "#fff",
            fontFamily: "var(--font-heading)",
            margin: "0 0 0.6rem",
            letterSpacing: "-0.01em",
            textAlign: "center",
          }}
        >
          {FOOTER_CTA_HEADING}
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
          }}
        >
          {/* App Store */}
          <a href="#waitlist" aria-label="Download on App Store" style={btnStyle}>
            <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
              <span style={{ fontSize: "0.45rem", fontWeight: 400, opacity: 0.7 }}>Coming Soon</span>
              <span>App Store</span>
            </span>
          </a>

          {/* Play Store */}
          <a href="#waitlist" aria-label="Download on Google Play" style={btnStyle}>
            <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle}>
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-2.302 2.302L15.396 12l2.302-2.492zM5.864 3.458L16.8 9.79l-2.302 2.302L5.864 3.458z" />
            </svg>
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
              <span style={{ fontSize: "0.45rem", fontWeight: 400, opacity: 0.7 }}>Coming Soon</span>
              <span>Google Play</span>
            </span>
          </a>

          {/* Direct APK */}
          <a href="#waitlist" aria-label="Download APK directly" style={btnStyle}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={iconStyle}
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Direct APK
          </a>
        </div>
      </div>
    </div>
  );
}
