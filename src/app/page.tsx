/**
 * Home page — server component orchestrator.
 *
 * This file's only job is assembling sections in order and passing props.
 * No logic, no styles, no hardcoded strings — everything comes from constants.
 *
 * "use client" is intentionally absent: the page shell is a Server Component.
 * Individual interactive sections declare "use client" in their own files.
 */

import Hero from "@/components/sections/Hero";
import LayersProviders from "@/components/sections/LayersProviders";
import DemoVideo from "@/components/sections/DemoVideo";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Cta from "@/components/sections/Cta";
import Faq from "@/components/sections/Faq";
import GlowButton from "@/components/ui/GlowButton";
import type { Feature } from "@/types";

import {
  HERO_HEADLINE_LINE1,
  HERO_HEADLINE_LINE2,
  HERO_SUBHEADLINE,
  HERO_CTA_PRIMARY,
  FEATURES_LABEL,
  FEATURES_TAGLINE_BOLD,
  FEATURES_TAGLINE_ITALIC,
  HOW_IT_WORKS_HEADLINE,
  HOW_IT_WORKS_SUBHEADLINE,
  PRIVATE_P2P_HEADLINE,
  UMBRA_HEADLINE,
  PRIVATE_SWAP_HEADLINE,
  JUPITER_SWAP_HEADLINE,
  FAQ_HEADLINE,
  FAQ_ITEMS,
} from "@/constants";

// ---------------------------------------------------------------------------
// Feature data — aligned to PRD core differentiators
// ---------------------------------------------------------------------------

const FEATURES: Feature[] = [
  {
    icon: "📡",
    title: "Offline USDC/USDT",
    description:
      "Prepare durable nonce slots online, sign stablecoin transfers offline, move receipts over QR or nearby BLE, then settle on reconnect.",
    image: "/3d-assets/no-internet.png",
  },
  {
    icon: "🔐",
    title: "Private Stablecoin Sends",
    description:
      "USDC and USDT private routes are capability-gated, verified locally before signing, and retried through an encrypted fallback queue.",
    image: "/3d-assets/privacy.png",
  },
  {
    icon: "🔒",
    title: "Umbra Private Vault",
    description:
      "Shield and unshield supported mainnet balances from the same mobile wallet using Umbra SDK-powered vault flows.",
    image: "/3d-assets/swap.png",
  },
  {
    icon: "💲",
    title: "Swaps And Wallet UX",
    description:
      "Jupiter-backed swap routes, target and recurring modes, SNS lookup, QR scan, live activity, and local-cache warm starts.",
    image: "/3d-assets/money.png",
  },
];



// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <main>
      <Hero
        headlineLine1={HERO_HEADLINE_LINE1}
        headlineLine2={HERO_HEADLINE_LINE2}
        subheadline={HERO_SUBHEADLINE}
        ctaPrimary={
          <GlowButton label={HERO_CTA_PRIMARY} href="#waitlist" variant="primary" />
        }
      />

      <LayersProviders />

      <DemoVideo />

      <HowItWorks
        headline={HOW_IT_WORKS_HEADLINE}
        privateHeadline={PRIVATE_P2P_HEADLINE}
        umbraHeadline={UMBRA_HEADLINE}
        swapHeadline={PRIVATE_SWAP_HEADLINE}
        jupiterHeadline={JUPITER_SWAP_HEADLINE}
        subheadline={HOW_IT_WORKS_SUBHEADLINE}
      />


      <Faq headline={FAQ_HEADLINE} items={FAQ_ITEMS} />

      <Features
        sectionLabel={FEATURES_LABEL}
        taglineBold={FEATURES_TAGLINE_BOLD}
        taglineItalic={FEATURES_TAGLINE_ITALIC}
        features={FEATURES}
      />

      <Cta
        headline="Download OffPay."
        supporting="Join the private beta for the mobile Solana wallet with private stablecoin payments, offline-ready handoff, swaps, and Umbra shielded balances."
        action={
          <a href="#waitlist" className="btn btn-primary">
            {HERO_CTA_PRIMARY}
          </a>
        }
      />
    </main>
  );
}
