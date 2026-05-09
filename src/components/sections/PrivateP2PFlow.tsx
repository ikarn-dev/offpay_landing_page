import PaymentFlowDiagram, {
  type PaymentFlowDefinition,
} from "@/components/sections/PaymentFlowDiagram";

export interface PrivateP2PFlowProps {
  headline: string;
}

const privateP2pFlow: PaymentFlowDefinition = {
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

export default function PrivateP2PFlow({ headline }: PrivateP2PFlowProps) {
  return (
    <>
      <h2 className="hiw-title hiw-title--mobile">{headline}</h2>
      <PaymentFlowDiagram definition={privateP2pFlow} />
    </>
  );
}
