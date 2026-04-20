import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function HeroBadge() {
  return (
    <Badge variant="secondary" className="h-auto gap-2 px-3 py-1.5 text-sm font-bold leading-none">
      <Image
        src="/logo/solanaLogoMark.svg"
        alt="Solana Logo"
        width={16}
        height={16}
        style={{ width: "auto", height: "16px" }}
        className="shrink-0"
      />
      <span className="translate-y-[1px]">Built For Solana</span>
    </Badge>
  );
}
