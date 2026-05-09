import PaymentFlowDiagram, {
  type PaymentFlowDefinition,
} from "@/components/sections/PaymentFlowDiagram";

export interface PrivateSwapFlowProps {
  headline: string;
}

const privateSwapFlow: PaymentFlowDefinition = {
  ariaLabel: "Private swap flow via Jupiter and MagicBlock",
  mockupLabel: "OffPay private swap screen",
  mockupSrc: "/mockups/private_swp.webp",
  mockupCaption: "Swap at the best price,",
  mockupCaptionAccent: "settle privately on-chain.",
  nodes: [
    {
      id: "selectTokens",
      step: "01",
      title: "Select pair",
      description: "Choose from Jupiter verified token list. USDC/USDT for private mode.",
      tone: "setup",
    },
    {
      id: "jupiterRoute",
      step: "02",
      title: "Jupiter best route",
      description: "Routes across Raydium, Orca, Meteora and all Solana DEXs via backend proxy.",
      tone: "magic",
    },
    {
      id: "privacyEnvelope",
      step: "03",
      title: "MagicBlock envelope",
      description: "USDC/USDT swaps wrapped in MagicBlock privacy layer. Toggle on for private settlement.",
      tone: "private",
      iconSrc: "/node_icons/MagicBlock-Logomark-Black.svg",
      iconAlt: "MagicBlock",
    },
    {
      id: "signExecute",
      step: "04",
      title: "Sign & execute",
      description: "Sign unsigned tx locally. Submit via /api/swap/execute through backend proxy.",
      tone: "send",
    },
    {
      id: "privateSettle",
      step: "05",
      title: "Private settlement",
      description: "MagicBlock settles swap privately — no amounts or parties visible on-chain.",
      tone: "settle",
    },
  ],
  desktopPositions: {
    selectTokens: { x: 24, y: 138 },
    jupiterRoute: { x: 244, y: 44 },
    privacyEnvelope: { x: 244, y: 232 },
    signExecute: { x: 468, y: 138 },
    privateSettle: { x: 692, y: 138 },
  },
  compactPositions: {
    selectTokens: { x: 0, y: 0 },
    jupiterRoute: { x: 0, y: 116 },
    privacyEnvelope: { x: 0, y: 232 },
    signExecute: { x: 0, y: 348 },
    privateSettle: { x: 0, y: 464 },
  },
  desktopEdges: [
    {
      id: "select-jupiter",
      source: "selectTokens",
      target: "jupiterRoute",
      phase: 1,
    },
    {
      id: "select-privacy",
      source: "selectTokens",
      target: "privacyEnvelope",
      phase: 1,
    },
    {
      id: "jupiter-sign",
      source: "jupiterRoute",
      target: "signExecute",
      phase: 2,
    },
    {
      id: "privacy-sign",
      source: "privacyEnvelope",
      target: "signExecute",
      phase: 2,
    },
    {
      id: "sign-settle",
      source: "signExecute",
      target: "privateSettle",
      phase: 3,
    },
  ],
  compactEdges: [
    {
      id: "select-jupiter",
      source: "selectTokens",
      target: "jupiterRoute",
      phase: 1,
    },
    {
      id: "jupiter-privacy",
      source: "jupiterRoute",
      target: "privacyEnvelope",
      phase: 2,
    },
    {
      id: "privacy-sign",
      source: "privacyEnvelope",
      target: "signExecute",
      phase: 3,
    },
    {
      id: "sign-settle",
      source: "signExecute",
      target: "privateSettle",
      phase: 4,
    },
  ],
};

export default function PrivateSwapFlow({ headline }: PrivateSwapFlowProps) {
  return (
    <>
      <h2 className="hiw-title hiw-title--mobile">{headline}</h2>
      <PaymentFlowDiagram definition={privateSwapFlow} />
    </>
  );
}
