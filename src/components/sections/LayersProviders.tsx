/**
 * LayersProviders — showcases the technology stack powering OffPay.
 *
 * Uses the LogoSlider component with provider logos from /providers/.
 * Full-width slider with section title using custom fonts from assets.
 */

"use client";

import Image from "next/image";
import { LogoSlider } from "@/components/ui/logo-slider";

const logos = [
  <Image key="solana" src="/providers/solana.png" alt="Solana" width={56} height={56} style={{ borderRadius: "14px", objectFit: "contain" }} />,
  <Image key="jupiter" src="/providers/jup.png" alt="Jupiter" width={56} height={56} style={{ borderRadius: "14px", objectFit: "contain" }} />,
  <Image key="magicblock" src="/providers/magicblock.png" alt="MagicBlock" width={56} height={56} style={{ borderRadius: "14px", objectFit: "contain" }} />,
  <Image key="umbra" src="/providers/umbra.png" alt="Umbra" width={56} height={56} style={{ borderRadius: "14px", objectFit: "contain" }} />,
];

export default function LayersProviders() {
  return (
    <section id="layers" style={{ paddingTop: "var(--section-py)", paddingBottom: "var(--section-py)" }}>
      <div className="section-container">
        <div className="section-header" style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: "normal" }}>
            Powered by the best in Solana
          </h2>
        </div>
      </div>

      {/* Slider — full viewport width, no container constraint */}
      <LogoSlider
        logos={logos}
        speed={60}
        direction="left"
      />
    </section>
  );
}
