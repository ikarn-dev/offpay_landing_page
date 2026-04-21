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

export const FEATURES_HEADLINE = "Five layers. One wallet." as const;
export const FEATURES_SUBHEADLINE =
  "Every feature is free, forever. No subscriptions. No premium tiers." as const;

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
    question: "Do I need to sign up or create an account?",
    answer:
      "No. Connect an existing Solana wallet (Phantom, Solflare) or create one in-app. No email, no phone — your wallet address is your identity.",
  },
  {
    question: "Is OffPay free?",
    answer:
      "Yes. All features are permanently free. No subscriptions, no premium tiers, no feature gates. On-chain transactions incur standard Solana network fees (~$0.00025).",
  },
  {
    question: "Does my phone need internet to make an offline payment?",
    answer:
      "No. After a one-time setup (requires internet to create the nonce account, ~0.0015 SOL once), all offline payments require zero internet.",
  },
  {
    question: "Can anyone see my private balance?",
    answer:
      "No. Private balances are stored in encrypted Solana PDAs. Only your device decrypts them locally using your wallet key. No on-chain observer — including OffPay — sees a number.",
  },
  {
    question: "Who holds my funds?",
    answer:
      "You do. USDC lives in your on-chain token account controlled exclusively by your private key. Shielded USDC lives in Umbra's encrypted PDAs. OffPay holds nothing.",
  },
  {
    question: "Can the same offline payment be spent twice?",
    answer:
      "No. The durable nonce mechanism makes this architecturally impossible. Once the nonce advances on first broadcast, any second transaction using the same nonce is rejected by the Solana network.",
  },
];

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const FOOTER_TAGLINE =
  "Privacy-first payments on Solana. Offline-native. Non-custodial." as const;
export const FOOTER_COPYRIGHT_YEAR = 2026 as const;

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
