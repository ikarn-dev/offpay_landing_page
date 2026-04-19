/**
 * Site-wide constants.
 * All hardcoded strings, numbers, and configuration values belong here.
 * Components import from this file — never hardcode values inside components.
 */

import type { NavLink, FaqItem } from "@/types";

// ---------------------------------------------------------------------------
// Site metadata
// ---------------------------------------------------------------------------

export const SITE_NAME = "Offpay Wallet" as const;
export const SITE_TAGLINE = "Payments that just work." as const;
export const SITE_DESCRIPTION =
  "Build seamless payment experiences. One integration, endless possibilities." as const;
export const SITE_EMAIL = "hello@offpay.com" as const;
export const SITE_URL = "https://offpay.com" as const;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const NAV_LINKS: NavLink[] = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const HERO_EYEBROW = "Now in public beta" as const;
export const HERO_HEADLINE_LINE1 = "Payments that" as const;
export const HERO_HEADLINE_LINE2 = "just work." as const;
export const HERO_SUBHEADLINE =
  "Build seamless payment experiences. One integration, endless possibilities. No headaches, no hidden fees." as const;
export const HERO_CTA_PRIMARY = "Get started free" as const;
export const HERO_CTA_SECONDARY = "View documentation" as const;

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

export const STATS = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "$2B+", label: "Processed" },
  { value: "150+", label: "Countries" },
] as const;

// ---------------------------------------------------------------------------
// Features
// ---------------------------------------------------------------------------

export const FEATURES_HEADLINE = "Everything you need to ship faster" as const;
export const FEATURES_SUBHEADLINE =
  "A complete payments platform with everything built in." as const;

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------

export const PRICING_HEADLINE = "Simple, transparent pricing" as const;
export const PRICING_SUBHEADLINE =
  "No surprise fees. No lock-in. Cancel anytime." as const;

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export const TESTIMONIALS_HEADLINE = "Loved by builders worldwide" as const;
export const TESTIMONIALS_SUBHEADLINE =
  "Join thousands of companies already using OffPay." as const;

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const FAQ_HEADLINE = "Frequently asked questions" as const;

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How quickly can I integrate OffPay?",
    answer:
      "Most teams are up and running in under an hour. Our SDK ships with typed wrappers and drop-in UI components.",
  },
  {
    question: "What currencies and payment methods are supported?",
    answer:
      "OffPay supports 135+ currencies and 50+ payment methods including cards, wallets, and local payment schemes.",
  },
  {
    question: "Is there a free tier?",
    answer:
      "Yes. The Free plan includes up to 1 000 transactions per month with no monthly fee — just standard per-transaction pricing.",
  },
  {
    question: "How does OffPay handle compliance and security?",
    answer:
      "OffPay is PCI DSS Level 1 certified. We handle all compliance so you never have to touch raw card data.",
  },
  {
    question: "Can I migrate from my current payment provider?",
    answer:
      "Yes. We provide migration tooling and a dedicated onboarding engineer for Pro and Enterprise plans.",
  },
];

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const FOOTER_TAGLINE =
  "The payments infrastructure for the modern web." as const;
export const FOOTER_COPYRIGHT_YEAR = 2025 as const;

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
