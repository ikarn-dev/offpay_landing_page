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
  mockupWidth: 576,
  mockupHeight: 1161,
  mockupCaption: "Mainnet vault actions,",
  mockupCaptionAccent: "signed on-device.",
  nodes: [
    {
      id: "gate",
      step: "01",
      title: "Mainnet gate",
      description: "Umbra actions require mainnet, supported tokens, and execution capability.",
      tone: "setup",
      size: "wide",
      iconSrc: "/node_icons/logo-bright.svg",
    },
    {
      id: "rpc",
      step: "02",
      title: "Backend RPC deps",
      description: "Umbra SDK reads accounts, blockhashes, slots, and statuses via OffPay RPC.",
      tone: "backend",
      size: "tall",
      iconSrc: "/node_icons/logo-bright.svg",
    },
    {
      id: "register",
      step: "03",
      title: "Register vault",
      description: "Client signer creates the encrypted-balance account and confirms status.",
      tone: "private",
      size: "compact",
    },
    {
      id: "balances",
      step: "04",
      title: "Query balances",
      description: "Read encrypted balances for supported Umbra tokens from the client SDK path.",
      tone: "receive",
      size: "wide",
    },
    {
      id: "shield",
      step: "05",
      title: "Shield",
      description: "Deposit public balance into an encrypted balance after fee-account checks.",
      tone: "magic",
      size: "compact",
    },
    {
      id: "withdraw",
      step: "06",
      title: "Withdraw",
      description: "Move encrypted balance back to a public wallet and verify signatures landed.",
      tone: "settle",
      size: "wide",
    },
  ],
  desktopPositions: {
    gate: { x: 36, y: 48 },
    rpc: { x: 44, y: 252 },
    register: { x: 318, y: 34 },
    balances: { x: 352, y: 236 },
    shield: { x: 632, y: 44 },
    withdraw: { x: 626, y: 252 },
  },
  compactPositions: {
    gate: { x: 0, y: 0 },
    rpc: { x: 0, y: 112 },
    register: { x: 0, y: 224 },
    balances: { x: 0, y: 336 },
    shield: { x: 0, y: 448 },
    withdraw: { x: 0, y: 560 },
  },
  desktopEdges: [
    {
      id: "gate-rpc",
      source: "gate",
      target: "rpc",
      phase: 1,
    },
    {
      id: "gate-register",
      source: "gate",
      target: "register",
      phase: 1,
    },
    {
      id: "rpc-balances",
      source: "rpc",
      target: "balances",
      phase: 2,
    },
    {
      id: "register-shield",
      source: "register",
      target: "shield",
      phase: 3,
    },
    {
      id: "balances-withdraw",
      source: "balances",
      target: "withdraw",
      phase: 4,
    },
  ],
  compactEdges: [
    {
      id: "gate-rpc",
      source: "gate",
      target: "rpc",
      phase: 1,
    },
    {
      id: "rpc-register",
      source: "rpc",
      target: "register",
      phase: 2,
    },
    {
      id: "register-balances",
      source: "register",
      target: "balances",
      phase: 3,
    },
    { id: "balances-shield", source: "balances", target: "shield", phase: 3 },
    {
      id: "shield-withdraw",
      source: "shield",
      target: "withdraw",
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
