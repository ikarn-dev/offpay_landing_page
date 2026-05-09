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
    title: "Offline stablecoin slots",
    description:
      "Prepare 10-50 durable nonce payment slots online, sign USDC/USDT transfers locally offline, and settle queued signed blobs when the app reconnects.",
    image: "/3d-assets/no-internet.png",
  },
  {
    icon: "🔐",
    title: "MagicBlock private sends",
    description:
      "Private USDC/USDT sends initialize mint state when needed, fetch MagicBlock unsigned transactions, verify route details locally, then sign on-device.",
    image: "/3d-assets/privacy.png",
  },
  {
    icon: "🔒",
    title: "Umbra mainnet vault",
    description:
      "Register encrypted balances, query shielded token balances, shield public funds, and withdraw through Umbra SDK flows with backend RPC adapters.",
    image: "/3d-assets/swap.png",
  },
  {
    icon: "💲",
    title: "Jupiter swap stack",
    description:
      "Fetch verified tokens and prices, quote and execute normal swaps, and gate target, recurring, and privacy-envelope swap modes through backend capabilities.",
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


      <Features
        sectionLabel={FEATURES_LABEL}
        taglineBold={FEATURES_TAGLINE_BOLD}
        taglineItalic={FEATURES_TAGLINE_ITALIC}
        features={FEATURES}
      />

      <Faq headline={FAQ_HEADLINE} items={FAQ_ITEMS} />

      <Cta
        headline="Download OffPay."
        supporting="Join the private beta for the self-custody Solana wallet that keeps provider keys server-side, signs locally, queues offline payments, and gates every advanced flow through live backend capabilities."
        action={
          <a href="#waitlist" className="btn btn-primary">
            {HERO_CTA_PRIMARY}
          </a>
        }
      />
    </main>
  );
}
