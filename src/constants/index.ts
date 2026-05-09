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
export const SITE_TAGLINE = "Private payments. Offline resilience." as const;
export const SITE_DESCRIPTION =
  "OffPay is a self-custody Solana wallet for private stablecoin payments, offline durable nonce handoff, in-app swaps, and Umbra shielded balances." as const;
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

export const HERO_HEADLINE_LINE1 = "OffPay" as const;
export const HERO_HEADLINE_LINE2 = "Private stablecoins. Offline Solana." as const;
export const HERO_SUBHEADLINE =
  "The Solana wallet built for private payments, offline USDC/USDT handoff, in-app swaps, and Umbra shielded balances." as const;
export const HERO_CTA_PRIMARY = "Get early access" as const;

// ---------------------------------------------------------------------------
// Features
// ---------------------------------------------------------------------------

export const FEATURES_LABEL = "Features" as const;
export const FEATURES_TAGLINE_BOLD = "Stablecoin payments," as const;
export const FEATURES_TAGLINE_ITALIC = "offline and private." as const;

// ---------------------------------------------------------------------------
// How It Works
// ---------------------------------------------------------------------------

export const HOW_IT_WORKS_HEADLINE = "How offline payments work" as const;
export const HOW_IT_WORKS_SUBHEADLINE =
  "Prepare durable nonce slots online, sign USDC/USDT transfers locally, share receipts over QR or nearby BLE, then settle on reconnect." as const;
export const PRIVATE_P2P_HEADLINE = "Private P2P through MagicBlock" as const;

// ---------------------------------------------------------------------------
// Security
// ---------------------------------------------------------------------------

export const SECURITY_HEADLINE = "Self-custody with server-side provider boundaries." as const;
export const SECURITY_SUBHEADLINE =
  "Keys stay on-device, private and offline transactions are verified locally before signing, and provider traffic routes through api.offpay.app." as const;

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const FAQ_HEADLINE = "Frequently asked questions" as const;

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How do offline payments work without internet?",
    answer:
      "You prepare durable nonce slots while online, then sign USDC or USDT transfers locally when offline. The signed receipt can move by QR or nearby BLE and settles through OffPay when connectivity returns.",
  },
  {
    question: "Do offline and private payments work with every token?",
    answer:
      "No. Private and offline P2P payments are stablecoin-first: USDC or USDT. SOL is still used for network fees, and normal online transfers can support other wallet tokens when available.",
  },
  {
    question: "What does OffPay verify before signing?",
    answer:
      "The client checks signer, recipient, mint, amount, nonce ordering, account indexes, and expected route details before private or offline transactions are approved for signing.",
  },
  {
    question: "Who holds my funds?",
    answer:
      "You do. Wallet secrets stay in device storage and are gated by local passcode or biometrics when enabled. OffPay never has access to your funds or private keys.",
  },
  {
    question: "Does the mobile app call Helius, Jupiter, MagicBlock, or QuickNode directly?",
    answer:
      "No. The client uses https://api.offpay.app for protected API calls, RPC proxying, swaps, capabilities, private payments, and settlement. Provider keys stay server-side.",
  },
  {
    question: "What happens if a private or offline payment cannot submit right away?",
    answer:
      "The signed transaction blob is encrypted into a local pending backup queue. On launch, reconnect, foreground, or retry backoff, the settlement engine submits queued payments and clears confirmed items.",
  },
  {
    question: "Where does Umbra fit?",
    answer:
      "Umbra powers the private vault flow for shielded balances. In the current client, Umbra vault actions are mainnet-only and feature visibility is capability-gated.",
  },
  {
    question: "Can OffPay work manually offline forever?",
    answer:
      "No. Offline payment setup requires an online preparation step, and settlement happens when the app reconnects. Manual offline mode intentionally blocks backend and network requests.",
  },
];

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const FOOTER_COPYRIGHT_YEAR = 2026 as const;

export const FOOTER_EMAIL = "hello@offpay.app" as const;
export const FOOTER_CTA_HEADING = "Early access" as const;

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
