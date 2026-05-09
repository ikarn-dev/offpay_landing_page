"use client";

import { useEffect, useRef } from "react";
import PaymentFlowDiagram, {
  type PaymentFlowDefinition,
} from "@/components/sections/PaymentFlowDiagram";
import PrivateP2PFlow from "@/components/sections/PrivateP2PFlow";
import UmbraPrivacyFlow from "@/components/sections/UmbraPrivacyFlow";
import PrivateSwapFlow from "@/components/sections/PrivateSwapFlow";
import JupiterSwapFlow from "@/components/sections/JupiterSwapFlow";
import { animateHorizontalTrackSwapN } from "@/utils/animation";

export interface HowItWorksProps {
  headline: string;
  privateHeadline: string;
  umbraHeadline: string;
  swapHeadline: string;
  jupiterHeadline: string;
  subheadline: string;
}

const offlineFlow: PaymentFlowDefinition = {
  ariaLabel: "Offline payment flow",
  mockupLabel: "OffPay nearby wallets discovery screen",
  mockupSrc: "/mockups/offline.webp",
  mockupWidth: 672,
  mockupHeight: 1313,
  mockupCaption: "Prepare online once,",
  mockupCaptionAccent: "settle when signal returns.",
  nodes: [
    {
      id: "prepare",
      step: "01",
      title: "Check capability",
      description: "Load offline stablecoins, rent estimate, and nonce-slot status.",
      tone: "setup",
      size: "wide",
      iconSrc: "/node_icons/logo-bright.svg",
    },
    {
      id: "slots",
      step: "02",
      title: "Prepare slots",
      description: "Backend returns unsigned nonce-account transactions; wallet signs.",
      tone: "send",
      size: "tall",
    },
    {
      id: "sign",
      step: "03",
      title: "Sign offline",
      description: "Build a durable-nonce USDC/USDT transfer from cached token context.",
      tone: "receive",
      size: "wide",
    },
    {
      id: "handoff",
      step: "04",
      title: "QR or BLE handoff",
      description: "Share an OffPay receive request or signed payment payload nearby.",
      tone: "queue",
      size: "compact",
    },
    {
      id: "verify",
      step: "05",
      title: "Verify & encrypt",
      description: "Check nonceAdvance, signer, recipient, amount, token, and signatures.",
      tone: "queue",
      size: "wide",
      iconSrc: "/node_icons/logo-bright.svg",
    },
    {
      id: "settle",
      step: "06",
      title: "Settle on reconnect",
      description: "Submit queued signed blobs through /api/payment/settle.",
      tone: "settle",
      size: "tall",
      iconSrc: "/node_icons/logo-bright.svg",
    },
  ],
  desktopPositions: {
    prepare: { x: 20, y: 32 },
    slots: { x: 260, y: 28 },
    sign: { x: 188, y: 220 },
    handoff: { x: 444, y: 178 },
    verify: { x: 604, y: 38 },
    settle: { x: 730, y: 248 },
  },
  compactPositions: {
    prepare: { x: 0, y: 0 },
    slots: { x: 0, y: 112 },
    sign: { x: 0, y: 224 },
    handoff: { x: 0, y: 336 },
    verify: { x: 0, y: 448 },
    settle: { x: 0, y: 560 },
  },
  desktopEdges: [
    { id: "prepare-slots", source: "prepare", target: "slots", phase: 1 },
    { id: "slots-sign", source: "slots", target: "sign", phase: 2 },
    { id: "sign-handoff", source: "sign", target: "handoff", phase: 2 },
    { id: "handoff-verify", source: "handoff", target: "verify", phase: 3 },
    { id: "verify-settle", source: "verify", target: "settle", phase: 4 },
  ],
  compactEdges: [
    { id: "prepare-slots", source: "prepare", target: "slots", phase: 1 },
    { id: "slots-sign", source: "slots", target: "sign", phase: 2 },
    { id: "sign-handoff", source: "sign", target: "handoff", phase: 2 },
    { id: "handoff-verify", source: "handoff", target: "verify", phase: 3 },
    { id: "verify-settle", source: "verify", target: "settle", phase: 4 },
  ],
};

export default function HowItWorks({
  headline,
  privateHeadline,
  umbraHeadline,
  swapHeadline,
  jupiterHeadline,
}: HowItWorksProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const offlineTitleRef = useRef<HTMLHeadingElement | null>(null);
  const privateTitleRef = useRef<HTMLHeadingElement | null>(null);
  const umbraTitleRef = useRef<HTMLHeadingElement | null>(null);
  const swapTitleRef = useRef<HTMLHeadingElement | null>(null);
  const jupiterTitleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const offlineTitle = offlineTitleRef.current;
    const privateTitle = privateTitleRef.current;
    const umbraTitle = umbraTitleRef.current;
    const swapTitle = swapTitleRef.current;
    const jupiterTitle = jupiterTitleRef.current;
    if (
      !section ||
      !track ||
      !offlineTitle ||
      !privateTitle ||
      !umbraTitle ||
      !swapTitle ||
      !jupiterTitle
    ) {
      return;
    }

    return animateHorizontalTrackSwapN({
      triggerElement: section,
      track,
      titles: [offlineTitle, privateTitle, umbraTitle, swapTitle, jupiterTitle],
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
    });
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="hiw-scroll-section">
      <div className="hiw-scroll-sticky">
        <div className="section-container hiw-section hiw-scroll-frame">
          <div className="hiw-title-layer" aria-live="polite">
            <h2 ref={offlineTitleRef} className="hiw-title hiw-title--scene">
              {headline}
            </h2>
            <h2
              ref={privateTitleRef}
              className="hiw-title hiw-title--scene hiw-title--scene-next"
            >
              {privateHeadline}
            </h2>
            <h2
              ref={umbraTitleRef}
              className="hiw-title hiw-title--scene hiw-title--scene-next"
            >
              {umbraHeadline}
            </h2>
            <h2
              ref={swapTitleRef}
              className="hiw-title hiw-title--scene hiw-title--scene-next"
            >
              {swapHeadline}
            </h2>
            <h2
              ref={jupiterTitleRef}
              className="hiw-title hiw-title--scene hiw-title--scene-next"
            >
              {jupiterHeadline}
            </h2>
          </div>

          <div className="hiw-slide-stage">
            <div ref={trackRef} className="hiw-slide-track">
              <div className="hiw-flow-slide">
                <h2 className="hiw-title hiw-title--mobile">{headline}</h2>
                <PaymentFlowDiagram definition={offlineFlow} />
              </div>

              <div className="hiw-flow-slide hiw-flow-slide--private">
                <PrivateP2PFlow headline={privateHeadline} />
              </div>

              <div className="hiw-flow-slide hiw-flow-slide--umbra">
                <UmbraPrivacyFlow headline={umbraHeadline} />
              </div>

              <div className="hiw-flow-slide hiw-flow-slide--swap">
                <PrivateSwapFlow headline={swapHeadline} />
              </div>

              <div className="hiw-flow-slide hiw-flow-slide--jupiter">
                <JupiterSwapFlow headline={jupiterHeadline} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
