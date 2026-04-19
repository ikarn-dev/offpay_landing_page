/**
 * Home page — server component orchestrator.
 *
 * This file's only job is assembling sections in order and passing props.
 * No logic, no styles, no hardcoded strings — everything comes from constants.
 *
 * "use client" is intentionally absent: the page shell is a Server Component.
 * Individual interactive sections declare "use client" in their own files.
 */

import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Cta from "@/components/Cta";
import Faq from "@/components/Faq";
import type { PricingPlan } from "@/types";
import type { Feature, Testimonial } from "@/types";

import {
  HERO_EYEBROW,
  HERO_HEADLINE_LINE1,
  HERO_HEADLINE_LINE2,
  HERO_SUBHEADLINE,
  HERO_CTA_PRIMARY,
  HERO_CTA_SECONDARY,
  STATS,
  FEATURES_HEADLINE,
  FEATURES_SUBHEADLINE,
  PRICING_HEADLINE,
  PRICING_SUBHEADLINE,
  TESTIMONIALS_HEADLINE,
  TESTIMONIALS_SUBHEADLINE,
  FAQ_HEADLINE,
  FAQ_ITEMS,
} from "@/constants";

// ---------------------------------------------------------------------------
// Feature data
// ---------------------------------------------------------------------------

const FEATURES: Feature[] = [
  {
    icon: "⚡",
    title: "Lightning Fast Integration",
    description:
      "Go from zero to accepting payments in under 15 minutes. Our SDK handles the heavy lifting so you can focus on your product.",
  },
  {
    icon: "🌍",
    title: "Global Coverage",
    description:
      "Accept payments in 135+ currencies with 50+ payment methods. Cards, wallets, bank transfers — all from a single API.",
  },
  {
    icon: "🔒",
    title: "Bank-Grade Security",
    description:
      "PCI DSS Level 1 certified. End-to-end encryption and tokenization keep your customers' data safe without extra effort.",
  },
  {
    icon: "📊",
    title: "Real-Time Analytics",
    description:
      "Monitor revenue, conversion rates, and failed payments in real time. Actionable insights delivered straight to your dashboard.",
  },
  {
    icon: "🔄",
    title: "Smart Retry Engine",
    description:
      "Automatically retries failed payments with intelligent routing. Recover up to 15% of otherwise-lost revenue.",
  },
  {
    icon: "🛠️",
    title: "Developer-First APIs",
    description:
      "Typed SDKs for every major language, comprehensive docs, and a sandbox that mirrors production exactly.",
  },
];

// ---------------------------------------------------------------------------
// Pricing data
// ---------------------------------------------------------------------------

const PLANS: PricingPlan[] = [
  {
    tier: "free",
    name: "Free",
    price: "$0",
    billingNote: "/month",
    description: "Perfect for side projects and testing.",
    features: [
      "Up to 1,000 transactions/mo",
      "2.9% + 30¢ per transaction",
      "Standard checkout",
      "Email support",
      "Community access",
    ],
    ctaLabel: "Start for free",
    highlighted: false,
  },
  {
    tier: "pro",
    name: "Pro",
    price: "$49",
    billingNote: "/month",
    description: "For growing businesses that need more.",
    features: [
      "Unlimited transactions",
      "2.4% + 25¢ per transaction",
      "Custom checkout UI",
      "Priority support",
      "Webhooks & events",
      "Advanced analytics",
    ],
    ctaLabel: "Start free trial",
    highlighted: true,
  },
  {
    tier: "enterprise",
    name: "Enterprise",
    price: "Custom",
    billingNote: "",
    description: "For large-scale operations with custom needs.",
    features: [
      "Volume discounts",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantees",
      "On-premise option",
      "24/7 phone support",
    ],
    ctaLabel: "Contact sales",
    highlighted: false,
  },
];

// ---------------------------------------------------------------------------
// Testimonial data
// ---------------------------------------------------------------------------

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "OffPay cut our payment integration time from weeks to hours. The developer experience is unmatched — it's the Stripe killer we've been waiting for.",
    authorName: "Sarah Chen",
    authorRole: "CTO",
    authorCompany: "Stackflow",
  },
  {
    quote:
      "We switched from our legacy provider and saw a 12% increase in successful transactions within the first month. The smart retry engine is magic.",
    authorName: "Marcus Williams",
    authorRole: "Head of Engineering",
    authorCompany: "Meridian",
  },
  {
    quote:
      "The real-time analytics dashboard alone is worth the price. We can finally see exactly where we're losing customers in the checkout flow.",
    authorName: "Priya Patel",
    authorRole: "Product Lead",
    authorCompany: "Craftbase",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <main>
      <Hero
        eyebrow={HERO_EYEBROW}
        headlineLine1={HERO_HEADLINE_LINE1}
        headlineLine2={HERO_HEADLINE_LINE2}
        subheadline={HERO_SUBHEADLINE}
        ctaPrimary={
          <a href="#pricing" className="btn btn-primary">
            {HERO_CTA_PRIMARY}
          </a>
        }
        ctaSecondary={
          <a href="#features" className="btn btn-secondary">
            {HERO_CTA_SECONDARY}
          </a>
        }
        stats={[...STATS]}
      />

      <Features
        headline={FEATURES_HEADLINE}
        subheadline={FEATURES_SUBHEADLINE}
        features={FEATURES}
      />

      <Pricing
        headline={PRICING_HEADLINE}
        subheadline={PRICING_SUBHEADLINE}
        plans={PLANS}
      />

      <Testimonials
        headline={TESTIMONIALS_HEADLINE}
        subheadline={TESTIMONIALS_SUBHEADLINE}
        testimonials={TESTIMONIALS}
      />

      <Faq headline={FAQ_HEADLINE} items={FAQ_ITEMS} />

      <Cta
        headline="Ready to get started?"
        supporting="Join thousands of developers building with OffPay. No credit card required."
        action={
          <a href="#pricing" className="btn btn-primary">
            {HERO_CTA_PRIMARY}
          </a>
        }
      />
    </main>
  );
}
