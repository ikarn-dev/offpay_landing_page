import PaymentFlowDiagram, {
  type PaymentFlowDefinition,
} from "@/components/sections/PaymentFlowDiagram";

export interface JupiterSwapFlowProps {
  headline: string;
}

const jupiterSwapFlow: PaymentFlowDefinition = {
  ariaLabel: "Jupiter in-app swap flow",
  mockupLabel: "OffPay advanced swap screen showing target and repeat modes",
  mockupSrc: "/mockups/jup-swap.webp",
  mockupCaption: "Target, repeat, or swap now —",
  mockupCaptionAccent: "best price across every DEX.",
  nodes: [
    {
      id: "tokenList",
      step: "01",
      title: "Verified tokens",
      description: "Jupiter verified token list with safety checks via /api/swap/tokens.",
      tone: "setup",
    },
    {
      id: "quoteRoute",
      step: "02",
      title: "Best-price quote",
      description: "Debounced quotes with price impact, route breakdown, and expiry countdown.",
      tone: "magic",
    },
    {
      id: "advancedModes",
      step: "03",
      title: "Target & repeat",
      description: "Limit orders via Trigger API. Recurring DCA — daily, weekly, or monthly.",
      tone: "private",
    },
    {
      id: "signSwap",
      step: "04",
      title: "Sign & execute",
      description: "Sign unsigned tx locally. Execute via /api/swap/execute through backend proxy.",
      tone: "send",
    },
    {
      id: "refresh",
      step: "05",
      title: "Auto-refresh",
      description: "Balance and transaction history refreshed post-swap. Token safety re-checked.",
      tone: "settle",
    },
  ],
  desktopPositions: {
    tokenList: { x: 24, y: 138 },
    quoteRoute: { x: 244, y: 44 },
    advancedModes: { x: 244, y: 232 },
    signSwap: { x: 468, y: 138 },
    refresh: { x: 692, y: 138 },
  },
  compactPositions: {
    tokenList: { x: 0, y: 0 },
    quoteRoute: { x: 0, y: 116 },
    advancedModes: { x: 0, y: 232 },
    signSwap: { x: 0, y: 348 },
    refresh: { x: 0, y: 464 },
  },
  desktopEdges: [
    {
      id: "tokens-quote",
      source: "tokenList",
      target: "quoteRoute",
      phase: 1,
    },
    {
      id: "tokens-advanced",
      source: "tokenList",
      target: "advancedModes",
      phase: 1,
    },
    {
      id: "quote-sign",
      source: "quoteRoute",
      target: "signSwap",
      phase: 2,
    },
    {
      id: "advanced-sign",
      source: "advancedModes",
      target: "signSwap",
      phase: 2,
    },
    {
      id: "sign-refresh",
      source: "signSwap",
      target: "refresh",
      phase: 3,
    },
  ],
  compactEdges: [
    {
      id: "tokens-quote",
      source: "tokenList",
      target: "quoteRoute",
      phase: 1,
    },
    {
      id: "quote-advanced",
      source: "quoteRoute",
      target: "advancedModes",
      phase: 2,
    },
    {
      id: "advanced-sign",
      source: "advancedModes",
      target: "signSwap",
      phase: 3,
    },
    {
      id: "sign-refresh",
      source: "signSwap",
      target: "refresh",
      phase: 4,
    },
  ],
};

export default function JupiterSwapFlow({ headline }: JupiterSwapFlowProps) {
  return (
    <>
      <h2 className="hiw-title hiw-title--mobile">{headline}</h2>
      <PaymentFlowDiagram definition={jupiterSwapFlow} />
    </>
  );
}
