import PaymentFlowDiagram, {
  type PaymentFlowDefinition,
} from "@/components/sections/PaymentFlowDiagram";

export interface PrivateP2PFlowProps {
  headline: string;
}

const privateP2pFlow: PaymentFlowDefinition = {
  ariaLabel: "Private P2P payment flow",
  mockupLabel: "OffPay private payment summary screen",
  mockupSrc: "/mockups/p2p.webp",
  mockupWidth: 672,
  mockupHeight: 1313,
  mockupCaption: "Private stablecoin send,",
  mockupCaptionAccent: "verified before signing.",
  nodes: [
    {
      id: "capabilities",
      step: "01",
      title: "Capability gate",
      description: "Check private init, balance, send, settle, and stablecoin support.",
      tone: "setup",
      size: "wide",
      iconSrc: "/node_icons/logo-bright.svg",
    },
    {
      id: "init",
      step: "02",
      title: "Init mint",
      description: "Call /api/payment/private-init-mint and sign setup if required.",
      tone: "backend",
      size: "compact",
      iconSrc: "/node_icons/logo-bright.svg",
    },
    {
      id: "magicblock",
      step: "03",
      title: "MagicBlock tx",
      description: "Request /api/payment/private-send for a private unsigned tx.",
      tone: "magic",
      size: "tall",
      iconSrc: "/node_icons/MagicBlock-Logomark-Black.svg",
    },
    {
      id: "verify",
      step: "04",
      title: "Verify route",
      description: "Validate signer, mint, amount, recipient, and private-route metadata.",
      tone: "private",
      size: "wide",
    },
    {
      id: "broadcast",
      step: "05",
      title: "Sign & broadcast",
      description: "Wallet signs locally; backend RPC broadcasts the signed blob.",
      tone: "send",
      size: "compact",
      iconSrc: "/node_icons/logo-bright.svg",
    },
    {
      id: "settle",
      step: "06",
      title: "Retry backup",
      description: "Retryable failures become encrypted pending backups for settlement.",
      tone: "settle",
      size: "wide",
    },
  ],
  desktopPositions: {
    capabilities: { x: 272, y: 12 },
    init: { x: 36, y: 140 },
    magicblock: { x: 288, y: 144 },
    verify: { x: 544, y: 92 },
    broadcast: { x: 188, y: 304 },
    settle: { x: 520, y: 306 },
  },
  compactPositions: {
    capabilities: { x: 0, y: 0 },
    init: { x: 0, y: 112 },
    magicblock: { x: 0, y: 224 },
    verify: { x: 0, y: 336 },
    broadcast: { x: 0, y: 448 },
    settle: { x: 0, y: 560 },
  },
  desktopEdges: [
    {
      id: "capabilities-init",
      source: "capabilities",
      target: "init",
      phase: 1,
    },
    {
      id: "init-magicblock",
      source: "init",
      target: "magicblock",
      phase: 2,
    },
    {
      id: "magicblock-verify",
      source: "magicblock",
      target: "verify",
      phase: 2,
    },
    {
      id: "verify-broadcast",
      source: "verify",
      target: "broadcast",
      phase: 3,
    },
    {
      id: "broadcast-settle",
      source: "broadcast",
      target: "settle",
      phase: 4,
    },
  ],
  compactEdges: [
    {
      id: "capabilities-init",
      source: "capabilities",
      target: "init",
      phase: 1,
    },
    { id: "init-magicblock", source: "init", target: "magicblock", phase: 2 },
    { id: "magicblock-verify", source: "magicblock", target: "verify", phase: 2 },
    { id: "verify-broadcast", source: "verify", target: "broadcast", phase: 3 },
    {
      id: "broadcast-settle",
      source: "broadcast",
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
