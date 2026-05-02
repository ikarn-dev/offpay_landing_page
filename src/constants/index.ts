/**
 * Site-wide constants.
 * All hardcoded strings, numbers, and configuration values belong here.
 * Components import from this file — never hardcode values inside components.
 */

import type { NavLink, FaqItem } from "@/types";

// ---------------------------------------------------------------------------
// Site metadata
// ---------------------------------------------------------------------------

export const SITE_NAME = "OffPay Wallet" as const;
export const SITE_TAGLINE = "Payments that just work." as const;
export const SITE_DESCRIPTION =
  "Build seamless payment experiences. One integration, endless possibilities." as const;
export const SITE_EMAIL = "hello@offpay.app" as const;
export const SITE_URL = "https://offpay.com" as const;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
];

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const HERO_HEADLINE_LINE1 = "Solana's first dual-mode," as const;
export const HERO_HEADLINE_LINE2 = "privacy-first wallet." as const;
export const HERO_SUBHEADLINE =
  "Pay offline, settle on-chain with zero-knowledge privacy and full self-custody." as const;
export const HERO_CTA_PRIMARY = "Join the waitlist" as const;

// ---------------------------------------------------------------------------
// Features
// ---------------------------------------------------------------------------

export const FEATURES_LABEL = "Features" as const;
export const FEATURES_TAGLINE_BOLD = "Offline payments," as const;
export const FEATURES_TAGLINE_ITALIC = "zero-knowledge privacy." as const;

// ---------------------------------------------------------------------------
// How It Works
// ---------------------------------------------------------------------------

export const HOW_IT_WORKS_HEADLINE = "How offline payments work" as const;
export const HOW_IT_WORKS_SUBHEADLINE =
  "Cryptographically secure P2P payments with zero internet — powered by Solana durable nonces." as const;

// ---------------------------------------------------------------------------
// Security
// ---------------------------------------------------------------------------

export const SECURITY_HEADLINE = "Self-custody. Zero knowledge. Zero trust." as const;
export const SECURITY_SUBHEADLINE =
  "Your keys never leave your device. Your transactions are invisible on-chain. OffPay holds nothing." as const;

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const FAQ_HEADLINE = "Frequently asked questions" as const;

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How do offline payments work without internet?",
    answer:
      "After a one-time on-chain setup (~0.0015 SOL), payments are signed locally using Solana durable nonces. Exchange details via QR code — no internet needed at the point of payment. Settlement happens privately when you reconnect.",
  },
  {
    question: "Can anyone see my private balance?",
    answer:
      "No. Private balances are stored in encrypted Solana PDAs. Only your device can decrypt them locally. No on-chain observer — including OffPay — sees your balance.",
  },
  {
    question: "Can the same offline payment be spent twice?",
    answer:
      "No. The durable nonce mechanism makes double-spend architecturally impossible. Once the nonce advances on first broadcast, any duplicate is rejected by the Solana network.",
  },
  {
    question: "Who holds my funds?",
    answer:
      "You do. Private keys live in Secure Enclave (iOS) or Android Keystore. OffPay never has access to your funds or keys.",
  },
  {
    question: "What does the safety badge check?",
    answer:
      "Wallet age, transaction count, funding quality, token quality, and spam patterns. It's a pure on-chain signal — no off-chain identity lookup.",
  },
  {
    question: "Do I need to sign up or create an account?",
    answer:
      "No. Connect an existing Solana wallet or create one in-app. No email, no phone — your wallet address is your identity.",
  },
  {
    question: "Is OffPay free?",
    answer:
      "Yes. All features are permanently free. No subscriptions, no premium tiers. Standard Solana network fees apply (~$0.00025 per transaction).",
  },
  {
    question: "Is OffPay open source?",
    answer:
      "Yes. The nonce module, transport module, and core app are MIT-licensed.",
  },
];

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const FOOTER_COPYRIGHT_YEAR = 2026 as const;

export const FOOTER_EMAIL = "hello@offpay.app" as const;
export const FOOTER_CTA_HEADING = "Download" as const;

export const FOOTER_SOCIAL_LABELS = ["Twitter / X", "GitHub"] as const;

// ---------------------------------------------------------------------------
// Animation defaults (consumed by the animation utility — do not use directly)
// ---------------------------------------------------------------------------

export const ANIM_DEFAULTS = {
  duration: 0.7,
  ease: "power3.out",
  stagger: 0.1,
  yOffset: 40,
} as const;

// ---------------------------------------------------------------------------
// Scroll utility
// ---------------------------------------------------------------------------

/** Minimum delta (px) before a direction change is reported. */
export const SCROLL_DIRECTION_THRESHOLD = 4 as const;
