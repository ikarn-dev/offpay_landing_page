/**
 * Navbar — floating horizontal top navigation in Apple Liquid Glass style.
 *
 * Glass container with frosted backdrop, Lucide icons + labels,
 * active-state pill (nested glass layer), and smooth transitions.
 */

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Home,
  Star,
  CreditCard,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import type { NavLink } from "@/types";

export interface NavbarProps {
  logo: React.ReactNode;
  links: NavLink[];
  cta: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/* Icon resolver                                                      */
/* ------------------------------------------------------------------ */

const ICON_MAP: Record<string, typeof Home> = {
  dashboard: Home,
  features: Star,
  pricing: CreditCard,
  testimonials: MessageSquare,
  faq: HelpCircle,
};

function NavIcon({
  label,
  isActive,
}: {
  label: string;
  isActive: boolean;
}) {
  const Icon = ICON_MAP[label.toLowerCase()] ?? Star;
  return (
    <Icon
      size={20}
      strokeWidth={isActive ? 0 : 1.5}
      fill={isActive ? "#fff" : "none"}
      color="#fff"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function Navbar({ logo, links, cta }: NavbarProps) {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  /* hide-on-scroll-down, reveal-on-scroll-up */
  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    if (y > lastScrollY.current && y > 80) setHidden(true);
    else setHidden(false);
    lastScrollY.current = y;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <nav
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: hidden
          ? "translateX(-50%) translateY(-140%)"
          : "translateX(-50%) translateY(0)",
        zIndex: 50,
        /* Glass container */
        borderRadius: "28px",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        background: "rgba(255, 255, 255, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        boxShadow:
          "0 8px 32px rgba(255, 255, 255, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
        /* Layout */
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "8px 12px 8px 20px",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
        transition:
          "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
        willChange: "transform",
        opacity: hidden ? 0 : 1,
      }}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div
        style={{ marginRight: "16px", flexShrink: 0 }}
        aria-label="Homepage"
      >
        {logo}
      </div>

      {/* Separator */}
      <div
        style={{
          width: "1px",
          height: "24px",
          background: "rgba(255, 255, 255, 0.15)",
          flexShrink: 0,
          marginRight: "8px",
        }}
      />

      {/* Nav Links */}
      <ul
        role="list"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {links.map((link) => {
          const isActive = activeItem === link.label;
          const isHovered = hoveredItem === link.label && !isActive;

          return (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setActiveItem(link.label)}
                onMouseEnter={() => setHoveredItem(link.label)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 18px",
                  textDecoration: "none",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: isActive ? 500 : 400,
                  letterSpacing: "-0.01em",
                  opacity: isActive ? 1 : 0.8,
                  /* Active pill — nested glass */
                  borderRadius: "999px",
                  background: isActive
                    ? "rgba(255, 255, 255, 0.18)"
                    : isHovered
                      ? "rgba(255, 255, 255, 0.08)"
                      : "transparent",
                  border: isActive
                    ? "1px solid rgba(255, 255, 255, 0.28)"
                    : "1px solid transparent",
                  boxShadow: isActive
                    ? "inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)"
                    : "none",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                <NavIcon label={link.label} isActive={isActive} />
                <span>{link.label}</span>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Separator */}
      <div
        style={{
          width: "1px",
          height: "24px",
          background: "rgba(255, 255, 255, 0.15)",
          flexShrink: 0,
          marginLeft: "8px",
        }}
      />

      {/* CTA */}
      <div style={{ flexShrink: 0, marginLeft: "8px" }}>{cta}</div>
    </nav>
  );
}
