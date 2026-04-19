/**
 * Global type definitions for the OffPay landing page.
 * All shared interfaces and type aliases live here.
 * Component-specific prop types are co-located in their respective files.
 */

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export interface NavLink {
  label: string;
  href: string;
}

// ---------------------------------------------------------------------------
// Common primitives
// ---------------------------------------------------------------------------

/** A stat displayed in the Hero or Stats section. */
export interface Stat {
  value: string;
  label: string;
}

/** A single feature card. */
export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

/** A single pricing tier. */
export type PricingTier = "free" | "pro" | "enterprise";

export interface PricingPlan {
  tier: PricingTier;
  name: string;
  price: string;
  billingNote: string;
  description: string;
  features: string[];
  ctaLabel: string;
  highlighted: boolean;
}

/** A single testimonial / social proof item. */
export interface Testimonial {
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
  avatarUrl?: string;
}

/** A logo displayed in the social-proof / marquee strip. */
export interface BrandLogo {
  name: string;
  /** Public-folder path, e.g. "/logos/stripe.svg" */
  src: string;
  width: number;
  height: number;
}

/** A single FAQ item. */
export interface FaqItem {
  question: string;
  answer: string;
}

// ---------------------------------------------------------------------------
// Scroll utility
// ---------------------------------------------------------------------------

/** Subscriber callback registered via the scroll performance utility. */
export type ScrollSubscriber = (scrollY: number, direction: ScrollDirection) => void;

export type ScrollDirection = "up" | "down" | "idle";

// ---------------------------------------------------------------------------
// Animation utility
// ---------------------------------------------------------------------------

/** Options accepted by the shared animation utility functions. */
export interface FadeInOptions {
  delay?: number;
  duration?: number;
  y?: number;
  ease?: string;
}

export interface StaggerContainerOptions {
  stagger?: number;
  delay?: number;
  y?: number;
  duration?: number;
  ease?: string;
}
