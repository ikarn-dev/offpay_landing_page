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
  { name: "Solana", src: "/providers/solana.png" },
  { name: "Jupiter", src: "/providers/jup.png" },
  { name: "MagicBlock", src: "/providers/magicblock.png" },
  { name: "Umbra", src: "/providers/umbra.png" },
];

const sliderLogos = providers.map((p) => (
  <div key={p.name} className="provider-cell">
    <img
      src={p.src}
      alt={p.name}
      width={28}
      height={28}
      style={{
        width: "28px",
        height: "auto",
        margin: 0,
        padding: 0,
        borderRadius: "6px",
        objectFit: "contain",
      }}
      className="shrink-0"
    />
    <span className="provider-cell__name translate-y-[1px]">{p.name}</span>
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
