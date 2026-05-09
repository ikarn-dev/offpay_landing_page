"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Background,
  BackgroundVariant,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
  type ReactFlowInstance,
} from "@xyflow/react";

gsap.registerPlugin(ScrollTrigger);

export interface HowItWorksProps {
  headline: string;
  subheadline: string;
}

type FlowTone =
  | "setup"
  | "send"
  | "receive"
  | "queue"
  | "settle"
  | "magic"
  | "private"
  | "backend";

type PaymentStepData = {
  step: string;
  title: string;
  description: string;
  tone: FlowTone;
  compact: boolean;
  iconSrc?: string;
  iconAlt?: string;
};

type PaymentStepSourceData = Omit<PaymentStepData, "compact"> & {
  id: string;
};

type PaymentStepNode = Node<PaymentStepData, "paymentStep">;

type FlowPositionMap = Record<string, { x: number; y: number }>;

type FlowEdgeSource = {
  id: string;
  source: string;
  target: string;
  phase: 1 | 2 | 3 | 4;
};

type FlowDefinition = {
  ariaLabel: string;
  mockupLabel: string;
  nodes: PaymentStepSourceData[];
  desktopPositions: FlowPositionMap;
  compactPositions: FlowPositionMap;
  desktopEdges: FlowEdgeSource[];
  compactEdges: FlowEdgeSource[];
};

const offlineFlow: FlowDefinition = {
  ariaLabel: "Offline payment flow",
  mockupLabel: "Offline mockup image will appear here",
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

const privateP2pFlow: FlowDefinition = {
  ariaLabel: "Private P2P payment flow",
  mockupLabel: "Private P2P mockup image will appear here",
  nodes: [
    {
      id: "capabilities",
      step: "01",
      title: "Capability gate",
      description: "Check private init, send, and RPC broadcast.",
      tone: "setup",
    },
    {
      id: "magicblock",
      step: "02",
      title: "MagicBlock route",
      description: "Offer the private payment path when available.",
      tone: "magic",
      iconSrc: "/node_icons/MagicBlock-Logomark-Black.svg",
      iconAlt: "MagicBlock",
    },
    {
      id: "init",
      step: "03",
      title: "Init mint",
      description: "Call /api/payment/private-init-mint.",
      tone: "backend",
    },
    {
      id: "privateSend",
      step: "04",
      title: "Private send",
      description: "Fetch and verify the unsigned private tx.",
      tone: "private",
    },
    {
      id: "settle",
      step: "05",
      title: "Settle queue",
      description: "Retry signed blobs through /api/payment/settle.",
      tone: "settle",
    },
  ],
  desktopPositions: {
    capabilities: { x: 24, y: 138 },
    magicblock: { x: 244, y: 44 },
    init: { x: 244, y: 232 },
    privateSend: { x: 468, y: 138 },
    settle: { x: 692, y: 138 },
  },
  compactPositions: {
    capabilities: { x: 0, y: 0 },
    magicblock: { x: 0, y: 116 },
    init: { x: 0, y: 232 },
    privateSend: { x: 0, y: 348 },
    settle: { x: 0, y: 464 },
  },
  desktopEdges: [
    {
      id: "capabilities-magicblock",
      source: "capabilities",
      target: "magicblock",
      phase: 1,
    },
    { id: "capabilities-init", source: "capabilities", target: "init", phase: 1 },
    {
      id: "magicblock-private-send",
      source: "magicblock",
      target: "privateSend",
      phase: 2,
    },
    {
      id: "init-private-send",
      source: "init",
      target: "privateSend",
      phase: 2,
    },
    {
      id: "private-send-settle",
      source: "privateSend",
      target: "settle",
      phase: 3,
    },
  ],
  compactEdges: [
    {
      id: "capabilities-magicblock",
      source: "capabilities",
      target: "magicblock",
      phase: 1,
    },
    { id: "magicblock-init", source: "magicblock", target: "init", phase: 2 },
    { id: "init-private-send", source: "init", target: "privateSend", phase: 3 },
    {
      id: "private-send-settle",
      source: "privateSend",
      target: "settle",
      phase: 4,
    },
  ],
};

function createPaymentNodes(
  nodeData: PaymentStepSourceData[],
  positions: FlowPositionMap,
  compact: boolean
): PaymentStepNode[] {
  return nodeData.map(({ id, ...data }) => ({
    id,
    type: "paymentStep",
    position: positions[id],
    data: {
      ...data,
      compact,
    },
  }));
}

function createPaymentEdges(edgeData: FlowEdgeSource[]): Edge[] {
  return edgeData.map((edge) => ({
    ...edge,
    type: "smoothstep",
    className: `hiw-edge hiw-edge--phase-${edge.phase}`,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#2EAED2",
      width: 16,
      height: 16,
    },
    style: {
      stroke: "#2EAED2",
      strokeWidth: 2,
    },
  }));
}

function PaymentStepNode({ data }: NodeProps<PaymentStepNode>) {
  const targetPosition = data.compact ? Position.Top : Position.Left;
  const sourcePosition = data.compact ? Position.Bottom : Position.Right;

  return (
    <article className={`hiw-node-card hiw-node-card--${data.tone}`}>
      <Handle
        type="target"
        position={targetPosition}
        className="hiw-node-card__handle"
      />
      <div className="hiw-node-card__step" aria-hidden="true">
        {data.step}
      </div>
      <div>
        <div className="hiw-node-card__title-row">
          {data.iconSrc && (
            <span className="hiw-node-card__icon-wrap" aria-hidden="true">
              <Image
                src={data.iconSrc}
                alt={data.iconAlt ?? ""}
                width={18}
                height={18}
                className="hiw-node-card__icon"
              />
            </span>
          )}
          <h3 className="hiw-node-card__title">{data.title}</h3>
        </div>
        <p className="hiw-node-card__description">{data.description}</p>
      </div>
      <Handle
        type="source"
        position={sourcePosition}
        className="hiw-node-card__handle"
      />
    </article>
  );
}

const nodeTypes = {
  paymentStep: PaymentStepNode,
};

function FlowCanvas({ definition }: { definition: FlowDefinition }) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const flowRef = useRef<ReactFlowInstance<PaymentStepNode, Edge> | null>(null);
  const [isCompactFlow, setIsCompactFlow] = useState(false);
  const [layoutVersion, setLayoutVersion] = useState(0);

  const positions = isCompactFlow
    ? definition.compactPositions
    : definition.desktopPositions;
  const edgeData = isCompactFlow
    ? definition.compactEdges
    : definition.desktopEdges;
  const paymentNodes = useMemo(
    () => createPaymentNodes(definition.nodes, positions, isCompactFlow),
    [definition.nodes, isCompactFlow, positions]
  );
  const paymentEdges = useMemo(() => createPaymentEdges(edgeData), [edgeData]);
  const fitPadding = isCompactFlow ? 0.18 : 0.2;

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    let frame = 0;
    const updateLayout = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setIsCompactFlow(panel.clientWidth < 640);
        setLayoutVersion((value) => value + 1);
      });
    };

    updateLayout();
    const resizeObserver = new ResizeObserver(updateLayout);
    resizeObserver.observe(panel);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      flowRef.current?.fitView({ padding: fitPadding, duration: 180 });
    });

    return () => cancelAnimationFrame(frame);
  }, [fitPadding, layoutVersion, paymentEdges, paymentNodes]);

  return (
    <div
      ref={panelRef}
      className="hiw-flow-panel"
      aria-label={definition.ariaLabel}
    >
      <ReactFlow
        key={`${definition.ariaLabel}-${isCompactFlow ? "compact" : "desktop"}`}
        nodes={paymentNodes}
        edges={paymentEdges}
        nodeTypes={nodeTypes}
        onInit={(instance) => {
          flowRef.current = instance;
          instance.fitView({ padding: fitPadding });
        }}
        fitView
        fitViewOptions={{ padding: fitPadding }}
        minZoom={0.35}
        maxZoom={1.35}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Lines}
          gap={20}
          size={1}
          color="rgba(252, 252, 255, 0.26)"
        />
      </ReactFlow>
    </div>
  );
}

function FlowSlide({ definition }: { definition: FlowDefinition }) {
  return (
    <div className="hiw-layout">
      <FlowCanvas definition={definition} />

      <div className="hiw-mockup-card" aria-label={definition.mockupLabel}>
        <div className="hiw-mockup-card__placeholder">
          {definition.mockupLabel}
        </div>
      </div>
    </div>
  );
}

export default function HowItWorks({ headline }: HowItWorksProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const offlineSlideRef = useRef<HTMLDivElement | null>(null);
  const privateSlideRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const offlineSlide = offlineSlideRef.current;
    const privateSlide = privateSlideRef.current;

    if (!section || !stage || !offlineSlide || !privateSlide) return;

    const context = gsap.context(() => {
      gsap.set(offlineSlide, { opacity: 1, xPercent: 0 });
      gsap.set(privateSlide, { opacity: 0, xPercent: 108 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=920",
            scrub: 0.65,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        .to(
          offlineSlide,
          {
            opacity: 0,
            xPercent: -18,
            ease: "none",
            duration: 1,
          },
          0
        )
        .to(
          privateSlide,
          {
            opacity: 1,
            xPercent: 0,
            ease: "none",
            duration: 1,
          },
          0
        );

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="section-spacing adaptive-section section-container hiw-section"
    >
      <h2 className="hiw-title">{headline}</h2>

      <div ref={stageRef} className="hiw-slide-stage">
        <div ref={offlineSlideRef} className="hiw-slide hiw-slide--offline">
          <FlowSlide definition={offlineFlow} />
        </div>

        <div ref={privateSlideRef} className="hiw-slide hiw-slide--private">
          <FlowSlide definition={privateP2pFlow} />
        </div>
      </div>
    </section>
  );
}
