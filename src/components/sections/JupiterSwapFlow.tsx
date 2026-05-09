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
  mockupWidth: 1023,
  mockupHeight: 1211,
  mockupCaption: "Quote, sign, execute,",
  mockupCaptionAccent: "or schedule advanced orders.",
  nodes: [
    {
      id: "tokenList",
      step: "01",
      title: "Tokens & prices",
      description: "Fetch verified tokens and USD prices from backend Jupiter routes.",
      tone: "setup",
      size: "wide",
      iconSrc: "/node_icons/logo-bright.svg",
    },
    {
      id: "quote",
      step: "02",
      title: "Live quote",
      description: "Debounced /api/swap/quote returns route summary, fee, slippage, and expiry.",
      tone: "magic",
      size: "tall",
    },
    {
      id: "checks",
      step: "03",
      title: "Local checks",
      description: "Verify balance, SOL fee buffer, receive ATA rent, and quote freshness.",
      tone: "receive",
      size: "compact",
    },
    {
      id: "signSwap",
      step: "04",
      title: "Sign & execute",
      description: "Wallet signs the unsigned transaction; backend executes quoteId.",
      tone: "send",
      size: "wide",
    },
    {
      id: "advanced",
      step: "05",
      title: "Target orders",
      description: "Trigger flow signs auth challenge, deposit tx, then creates the order.",
      tone: "private",
      size: "tall",
    },
    {
      id: "recurring",
      step: "06",
      title: "Repeat swaps",
      description: "Recurring flow creates a plan, signs its tx, and executes through backend.",
      tone: "settle",
      size: "wide",
      iconSrc: "/node_icons/logo-bright.svg",
    },
  ],
  desktopPositions: {
    tokenList: { x: 28, y: 62 },
    quote: { x: 286, y: 18 },
    checks: { x: 300, y: 246 },
    signSwap: { x: 540, y: 140 },
    advanced: { x: 710, y: 22 },
    recurring: { x: 704, y: 288 },
  },
  compactPositions: {
    tokenList: { x: 0, y: 0 },
    quote: { x: 0, y: 112 },
    checks: { x: 0, y: 224 },
    signSwap: { x: 0, y: 336 },
    advanced: { x: 0, y: 448 },
    recurring: { x: 0, y: 560 },
  },
  desktopEdges: [
    {
      id: "tokens-quote",
      source: "tokenList",
      target: "quote",
      phase: 1,
    },
    {
      id: "quote-checks",
      source: "quote",
      target: "checks",
      phase: 2,
    },
    {
      id: "checks-sign",
      source: "checks",
      target: "signSwap",
      phase: 2,
    },
    {
      id: "quote-advanced",
      source: "quote",
      target: "advanced",
      phase: 3,
    },
    {
      id: "advanced-recurring",
      source: "advanced",
      target: "recurring",
      phase: 4,
    },
    {
      id: "sign-recurring",
      source: "signSwap",
      target: "recurring",
      phase: 4,
    },
  ],
  compactEdges: [
    {
      id: "tokens-quote",
      source: "tokenList",
      target: "quote",
      phase: 1,
    },
    {
      id: "quote-checks",
      source: "quote",
      target: "checks",
      phase: 2,
    },
    {
      id: "checks-sign",
      source: "checks",
      target: "signSwap",
      phase: 3,
    },
    { id: "sign-advanced", source: "signSwap", target: "advanced", phase: 3 },
    {
      id: "advanced-recurring",
      source: "advanced",
      target: "recurring",
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
