import { Badge } from "@/components/ui/badge";

export function HeroBadge() {
  return (
    <Badge variant="secondary" className="h-auto gap-2 px-3 py-1.5 text-sm font-bold leading-none">
      {/* Plain img to avoid Next.js Image preload for a tiny inline SVG */}
      <img
        src="/logo/solanaLogoMark.svg"
        alt="Solana Logo"
        width={16}
        height={16}
        style={{ width: "16px", height: "auto" }}
        className="shrink-0"
      />
      <span className="translate-y-[1px]">Built For Solana</span>
    </Badge>
  );
}
