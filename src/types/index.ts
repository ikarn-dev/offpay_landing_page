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

/** A single feature card. */
export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

/** A single step in the How It Works flow. */
export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

/** A single security feature card. */
export interface SecurityFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

/** A single FAQ item. */
export interface FaqItem {
  question: string;
  answer: string;
}

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
