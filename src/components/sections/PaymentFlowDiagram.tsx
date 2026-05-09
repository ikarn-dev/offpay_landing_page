"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
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

export type PaymentFlowTone =
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
  tone: PaymentFlowTone;
  compact: boolean;
  iconSrc?: string;
  iconAlt?: string;
};

export type PaymentStepSourceData = Omit<PaymentStepData, "compact"> & {
  id: string;
};

type PaymentStepNode = Node<PaymentStepData, "paymentStep">;

export type FlowPositionMap = Record<string, { x: number; y: number }>;

export type FlowEdgeSource = {
  id: string;
  source: string;
  target: string;
  phase: 1 | 2 | 3 | 4;
};

export type PaymentFlowDefinition = {
  ariaLabel: string;
  mockupLabel: string;
  nodes: PaymentStepSourceData[];
  desktopPositions: FlowPositionMap;
  compactPositions: FlowPositionMap;
  desktopEdges: FlowEdgeSource[];
  compactEdges: FlowEdgeSource[];
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

function FlowCanvas({ definition }: { definition: PaymentFlowDefinition }) {
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

export default function PaymentFlowDiagram({
  definition,
}: {
  definition: PaymentFlowDefinition;
}) {
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
