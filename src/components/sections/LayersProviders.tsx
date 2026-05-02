/**
 * LayersProviders — showcases the technology stack powering OffPay.
 *
 * Scrolling slider where each provider has its own sharp-edged bordered cell,
 * flush against each other with no gaps.
 */

"use client";

/* Using plain <img> to avoid Next.js Image wrapper that breaks flex alignment */
import { LogoSlider } from "@/components/ui/logo-slider";

const providers = [
  { name: "Solana", src: "/logo/solanaLogo.svg" },
  { name: "Jupiter", src: "/logo/logowithtext-dark.svg" },
  { name: "MagicBlock", src: "/logo/MagicBlock-Logo-White.svg" },
  { name: "Umbra", src: "/logo/umbra.svg" },
  { name: "Helius", src: "/logo/Helius-Horizontal-Logo-White.svg" },
  { name: "QuickNode", src: "/logo/quicknode.svg" },
];

const sliderLogos = providers.map((p) => (
  <div key={p.name} className="provider-cell">
    <img
      src={p.src}
      alt={p.name}
      style={{
        height: "24px",
        width: "auto",
        margin: 0,
        padding: 0,
        objectFit: "contain",
        filter: "brightness(0.9)",
      }}
      className="shrink-0"
    />
  </div>
));

export default function LayersProviders() {
  return (
    <section
      id="layers"
      style={{
        paddingTop: "var(--section-py)",
        paddingBottom: "var(--section-py)",
      }}
    >
      <div className="section-container">
        <div className="section-header" style={{ marginBottom: "2.5rem" }}>
          <h2 style={{
            whiteSpace: "nowrap",
            fontSize: "clamp(1.1rem, 2.5vw, 1.75rem)",
            margin: "0 auto",
          }}>
            Powered by the best in Solana
          </h2>
        </div>
      </div>

      <LogoSlider
        logos={sliderLogos}
        speed={60}
        direction="left"
        className="providers-slider"
      />
    </section>
  );
}
