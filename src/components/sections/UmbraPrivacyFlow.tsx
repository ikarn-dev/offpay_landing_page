import PaymentFlowDiagram, {
  type PaymentFlowDefinition,
} from "@/components/sections/PaymentFlowDiagram";

export interface UmbraPrivacyFlowProps {
  headline: string;
}

const umbraFlow: PaymentFlowDefinition = {
  ariaLabel: "Umbra ZK privacy flow",
  mockupLabel: "Umbra shielded vault mockup",
  mockupSrc: "/mockups/umbra.webp",
  mockupCaption: "Shield your balance,",
  mockupCaptionAccent: "invisible on-chain.",
  nodes: [
    {
      id: "register",
      step: "01",
      title: "Register stealth keys",
      description: "Generate Umbra viewing & spending keys on-device.",
      tone: "setup",
    },
    {
      id: "shield",
      step: "02",
      title: "Shield balance",
      description: "Move USDC/USDT into encrypted PDA via ZK proof.",
      tone: "private",
    },
    {
      id: "privateSend",
      step: "03",
      title: "ZK private send",
      description: "Transfer between Umbra addresses — no metadata on-chain.",
      tone: "magic",
    },
    {
      id: "unshield",
      step: "04",
      title: "Unshield & claim",
      description: "Exit private pool to any Solana address with nullifier.",
      tone: "receive",
    },
    {
      id: "audit",
      step: "05",
      title: "Selective disclosure",
      description: "Share viewing keys for compliance without full history.",
      tone: "settle",
    },
  ],
  desktopPositions: {
    register: { x: 24, y: 138 },
    shield: { x: 244, y: 44 },
    privateSend: { x: 244, y: 232 },
    unshield: { x: 468, y: 138 },
    audit: { x: 692, y: 138 },
  },
  compactPositions: {
    register: { x: 0, y: 0 },
    shield: { x: 0, y: 116 },
    privateSend: { x: 0, y: 232 },
    unshield: { x: 0, y: 348 },
    audit: { x: 0, y: 464 },
  },
  desktopEdges: [
    {
      id: "register-shield",
      source: "register",
      target: "shield",
      phase: 1,
    },
    {
      id: "register-privateSend",
      source: "register",
      target: "privateSend",
      phase: 1,
    },
    {
      id: "shield-unshield",
      source: "shield",
      target: "unshield",
      phase: 2,
    },
    {
      id: "privateSend-unshield",
      source: "privateSend",
      target: "unshield",
      phase: 2,
    },
    {
      id: "unshield-audit",
      source: "unshield",
      target: "audit",
      phase: 3,
    },
  ],
  compactEdges: [
    {
      id: "register-shield",
      source: "register",
      target: "shield",
      phase: 1,
    },
    {
      id: "shield-privateSend",
      source: "shield",
      target: "privateSend",
      phase: 2,
    },
    {
      id: "privateSend-unshield",
      source: "privateSend",
      target: "unshield",
      phase: 3,
    },
    {
      id: "unshield-audit",
      source: "unshield",
      target: "audit",
      phase: 4,
    },
  ],
};

export default function UmbraPrivacyFlow({ headline }: UmbraPrivacyFlowProps) {
  return (
    <>
      <h2 className="hiw-title hiw-title--mobile">{headline}</h2>
      <PaymentFlowDiagram definition={umbraFlow} />
    </>
  );
}
