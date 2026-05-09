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
  mockupWidth: 576,
  mockupHeight: 1161,
  mockupCaption: "Jupiter route,",
  mockupCaptionAccent: "MagicBlock envelope.",
  nodes: [
    {
      id: "gate",
      step: "01",
      title: "Privacy capability",
      description: "Enable only when swap privacy-envelope routes are available.",
      tone: "setup",
      size: "wide",
      iconSrc: "/node_icons/logo-bright.svg",
    },
    {
      id: "executor",
      step: "02",
      title: "One-time executor",
      description: "Client creates an ephemeral executor wallet for the envelope session.",
      tone: "private",
      size: "tall",
    },
    {
      id: "prepare",
      step: "03",
      title: "Prepare envelope",
      description: "Call /api/swap/privacy-envelope/prepare with executor, pair, amount, slippage.",
      tone: "magic",
      size: "wide",
      iconSrc: "/node_icons/MagicBlock-Logomark-Black.svg",
    },
    {
      id: "fund",
      step: "04",
      title: "Init & fund",
      description: "Active wallet and executor sign required initialization and funding txs.",
      tone: "send",
      size: "compact",
    },
    {
      id: "quote",
      step: "05",
      title: "Quote finalize",
      description: "Executor signs the Jupiter quote; expired quotes refresh before finalize.",
      tone: "backend",
      size: "tall",
      iconSrc: "/node_icons/logo-bright.svg",
    },
    {
      id: "settle",
      step: "06",
      title: "Settlement tx",
      description: "Sign and broadcast returned settlement transaction; app records output amount.",
      tone: "settle",
      size: "wide",
    },
  ],
  desktopPositions: {
    gate: { x: 18, y: 212 },
    executor: { x: 188, y: 38 },
    prepare: { x: 372, y: 148 },
    fund: { x: 212, y: 308 },
    quote: { x: 612, y: 32 },
    settle: { x: 704, y: 270 },
  },
  compactPositions: {
    gate: { x: 0, y: 0 },
    executor: { x: 0, y: 112 },
    prepare: { x: 0, y: 224 },
    fund: { x: 0, y: 336 },
    quote: { x: 0, y: 448 },
    settle: { x: 0, y: 560 },
  },
  desktopEdges: [
    {
      id: "gate-executor",
      source: "gate",
      target: "executor",
      phase: 1,
    },
    {
      id: "executor-prepare",
      source: "executor",
      target: "prepare",
      phase: 1,
    },
    {
      id: "prepare-fund",
      source: "prepare",
      target: "fund",
      phase: 2,
    },
    {
      id: "fund-quote",
      source: "fund",
      target: "quote",
      phase: 3,
    },
    {
      id: "quote-settle",
      source: "quote",
      target: "settle",
      phase: 4,
    },
  ],
  compactEdges: [
    {
      id: "gate-executor",
      source: "gate",
      target: "executor",
      phase: 1,
    },
    {
      id: "executor-prepare",
      source: "executor",
      target: "prepare",
      phase: 2,
    },
    {
      id: "prepare-fund",
      source: "prepare",
      target: "fund",
      phase: 3,
    },
    { id: "fund-quote", source: "fund", target: "quote", phase: 3 },
    {
      id: "quote-settle",
      source: "quote",
      target: "settle",
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
