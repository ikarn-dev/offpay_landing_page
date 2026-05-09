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
  mockupCaption: "Discover nearby,",
  mockupCaptionAccent: "pay without internet.",
  nodes: [
    {
      id: "prepare",
      step: "01",
      title: "Online setup",
      description: "Prepare durable nonce slots.",
      tone: "setup",
    },
    {
      id: "sign",
      step: "02",
      title: "Sign offline",
      description: "Build and verify USDC/USDT locally.",
      tone: "send",
    },
    {
      id: "handoff",
      step: "03",
      title: "QR/BLE handoff",
      description: "Share receipt and verify on receiver.",
      tone: "receive",
    },
    {
      id: "queue",
      step: "04",
      title: "Encrypted queue",
      description: "Store signed blobs and pending backup metadata.",
      tone: "queue",
    },
    {
      id: "settle",
      step: "05",
      title: "Online settlement",
      description: "On reconnect, decrypt queue and submit /api/payment/settle.",
      tone: "settle",
    },
  ],
  desktopPositions: {
    prepare: { x: 24, y: 138 },
    sign: { x: 244, y: 44 },
    handoff: { x: 244, y: 232 },
    queue: { x: 468, y: 138 },
    settle: { x: 692, y: 138 },
  },
  compactPositions: {
    prepare: { x: 0, y: 0 },
    sign: { x: 0, y: 116 },
    handoff: { x: 0, y: 232 },
    queue: { x: 0, y: 348 },
    settle: { x: 0, y: 464 },
  },
  desktopEdges: [
    { id: "prepare-sign", source: "prepare", target: "sign", phase: 1 },
    { id: "prepare-handoff", source: "prepare", target: "handoff", phase: 1 },
    { id: "sign-queue", source: "sign", target: "queue", phase: 2 },
    { id: "handoff-queue", source: "handoff", target: "queue", phase: 2 },
    { id: "queue-settle", source: "queue", target: "settle", phase: 3 },
  ],
  compactEdges: [
    { id: "prepare-sign", source: "prepare", target: "sign", phase: 1 },
    { id: "sign-handoff", source: "sign", target: "handoff", phase: 2 },
    { id: "handoff-queue", source: "handoff", target: "queue", phase: 3 },
    { id: "queue-settle", source: "queue", target: "settle", phase: 4 },
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
