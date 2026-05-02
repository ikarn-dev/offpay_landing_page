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
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";
import Security from "@/components/sections/Security";
import Cta from "@/components/sections/Cta";
import Faq from "@/components/sections/Faq";
import GlowButton from "@/components/ui/GlowButton";
import type { Feature, HowItWorksStep, SecurityFeature } from "@/types";

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
  SECURITY_HEADLINE,
  SECURITY_SUBHEADLINE,
  FAQ_HEADLINE,
  FAQ_ITEMS,
} from "@/constants";

// ---------------------------------------------------------------------------
// Feature data — aligned to PRD core differentiators
// ---------------------------------------------------------------------------

const FEATURES: Feature[] = [
  {
    icon: "📡",
    title: "Offline Payments",
    description:
      "USDC/USDT transfers signed offline using Solana durable nonces. QR-based exchange after a one-time on-chain setup.",
    image: "/3d-assets/no-internet.png",
  },
  {
    icon: "🔐",
    title: "ZK-Shielded Transfers",
    description:
      "USDC/USDT private transfers via Umbra Protocol. Sender, receiver, and amount hidden with zero-knowledge proofs.",
    image: "/3d-assets/privacy.png",
  },
  {
    icon: "🔒",
    title: "Private Settlement",
    description:
      "MagicBlock settles online and offline transactions as encrypted commitments on-chain. No metadata exposed.",
    image: "/3d-assets/swap.png",
  },
  {
    icon: "💲",
    title: "Multi-Currency Portfolio",
    description:
      "Portfolio values displayed in your preferred local fiat currency.",
    image: "/3d-assets/money.png",
  },
];

// ---------------------------------------------------------------------------
// How It Works — offline payment flow from PRD §5.1
// ---------------------------------------------------------------------------

const STEPS: HowItWorksStep[] = [
  {
    step: 1,
    icon: "🔧",
    title: "One-time online setup",
    description:
      "Create a nonce account on-chain (~0.0015 SOL, once). The nonce value and authority key are cached securely on your device.",
  },
  {
    step: 2,
    icon: "✍️",
    title: "Sign offline",
    description:
      "Build and sign a USDC transfer using the cached durable nonce — no internet, no blockhash expiry. Optionally embed a ZK proof for full privacy.",
  },
  {
    step: 3,
    icon: "📲",
    title: "Exchange via QR code",
    description:
      "The receiver scans a QR code containing the payment request. Instant Ed25519 signature verification confirms authenticity on their device — no internet needed.",
  },
  {
    step: 4,
    icon: "✅",
    title: "Settle privately on reconnect",
    description:
      "When internet returns, pending transactions are routed through MagicBlock PER — settling as a single encrypted commitment on-chain.",
  },
];

// ---------------------------------------------------------------------------
// Security features — from PRD §3 and §7
// ---------------------------------------------------------------------------

const SECURITY_FEATURES: SecurityFeature[] = [
  {
    icon: "🔑",
    title: "Non-Custodial",
    description:
      "Private keys are stored in Secure Enclave (iOS) or Android Keystore. OffPay never has access to your funds or keys.",
  },
  {
    icon: "👁️‍🗨️",
    title: "Viewing Keys",
    description:
      "Selectively disclose transaction history for audits without exposing your full wallet. Share a scoped viewing key, not your secrets.",
  },
  {
    icon: "🧮",
    title: "Client-Side ZK Proofs",
    description:
      "Zero-knowledge proofs are generated entirely on your device — no RPC call, no server involvement. Works offline.",
  },
  {
    icon: "🚫",
    title: "No Login. No Data Collection.",
    description:
      "No email, no phone, no identity verification. Your wallet address is your identity. OffPay collects nothing.",
  },
  {
    icon: "🧱",
    title: "Spam Token Filter",
    description:
      "Airdropped phishing tokens are auto-hidden using Helius wallet data and Jupiter token verification. Review and restore anytime.",
  },
  {
    icon: "🔒",
    title: "Encrypted Settlement",
    description:
      "On-chain footprint is a single encrypted commitment per session. No amount, no timing, no sequence, no parties visible.",
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

      <Features
        sectionLabel={FEATURES_LABEL}
        taglineBold={FEATURES_TAGLINE_BOLD}
        taglineItalic={FEATURES_TAGLINE_ITALIC}
        features={FEATURES}
      />

      <HowItWorks
        headline={HOW_IT_WORKS_HEADLINE}
        subheadline={HOW_IT_WORKS_SUBHEADLINE}
        steps={STEPS}
      />

      <Security
        headline={SECURITY_HEADLINE}
        subheadline={SECURITY_SUBHEADLINE}
        features={SECURITY_FEATURES}
      />

      <Faq headline={FAQ_HEADLINE} items={FAQ_ITEMS} />

      <Cta
        headline="Ready to pay without internet?"
        supporting="OffPay is in pre-development. Join the waitlist to be first in line for the private beta."
        action={
          <a href="#waitlist" className="btn btn-primary">
            {HERO_CTA_PRIMARY}
          </a>
        }
      />
    </main>
  );
}
