/**
 * HowItWorks — animated node/flow diagram showing the offline payment flow.
 *
 * Content sourced from PRD §5.1 (Durable Nonce Architecture).
 * Uses ui-layouts AnimatedBeam for connection beam animations.
 */

"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SetupIcon, SignIcon, QrCodeIcon, SettleIcon } from "@/components/ui/flow-nodes";

gsap.registerPlugin(ScrollTrigger);

/* ── Flow data ──────────────────────────────────────────────────────────── */

const FLOW_NODES = [
  {
    icon: <SetupIcon />,
    label: "Setup",
    description: "One-time nonce account creation on-chain (~0.0015 SOL)",
  },
  {
    icon: <SignIcon />,
    label: "Sign Offline",
    description: "Build & sign USDC transfer using cached durable nonce",
  },
  {
    icon: <QrCodeIcon />,
    label: "QR Exchange",
    description: "Receiver scans QR — Ed25519 verified instantly, no internet",
  },
  {
    icon: <SettleIcon />,
    label: "Settle Privately",
    description: "MagicBlock settles as encrypted commitment on reconnect",
  },
];

/* ── Component ──────────────────────────────────────────────────────────── */

export interface HowItWorksProps {
  headline: string;
  subheadline: string;
}

export default function HowItWorks({ headline, subheadline }: HowItWorksProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs for each node circle
  const node1Ref = useRef<HTMLDivElement>(null);
  const node2Ref = useRef<HTMLDivElement>(null);
  const node3Ref = useRef<HTMLDivElement>(null);
  const node4Ref = useRef<HTMLDivElement>(null);

  const nodeRefs = [node1Ref, node2Ref, node3Ref, node4Ref];

  // Scroll-triggered entrance animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const header = el.querySelector<HTMLElement>("[data-hiw-header]");
    if (header) {
      gsap.fromTo(
        header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    const nodes = el.querySelectorAll<HTMLElement>("[data-flow-node]");
    nodes.forEach((node, i) => {
      gsap.fromTo(
        node,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: i * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el.querySelector("[data-hiw-flow]"),
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.trigger && el.contains(st.trigger))
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      style={{
        padding: "6rem 1.5rem",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div
        data-hiw-header
        style={{ textAlign: "center", marginBottom: "4rem", opacity: 0 }}
      >
        <h2
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#fff",
            margin: "0 0 1rem",
          }}
        >
          {headline}
        </h2>
        <p
          style={{
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            color: "rgba(255,255,255,0.6)",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          {subheadline}
        </p>
      </div>

      {/* Flow diagram */}
      <div
        ref={containerRef}
        data-hiw-flow
        className="hiw-flow-container"
      >
        {/* Nodes */}
        {FLOW_NODES.map((node, i) => (
          <div
            key={node.label}
            data-flow-node
            className="hiw-flow-node"
            style={{ opacity: 0 }}
          >
            {/* Node icon */}
            <div
              ref={nodeRefs[i]}
              className="hiw-flow-node__icon-wrap"
            >
              {node.icon}
            </div>

            {/* Step badge */}
            <div className="hiw-flow-node__step">Step {i + 1}</div>

            {/* Label */}
            <h3 className="hiw-flow-node__label">{node.label}</h3>

            {/* Description */}
            <p className="hiw-flow-node__desc">{node.description}</p>
          </div>
        ))}

      </div>
    </section>
  );
}


