/**
 * NavCtaButton — reusable CTA button for navigation contexts.
 *
 * Accepts label, variant (primary/secondary), onClick, and optional href.
 * Used in the mobile navbar menu and anywhere a nav-style CTA is needed.
 */

"use client";

import type React from "react";

export interface NavCtaButtonProps {
  label: string;
  variant: "primary" | "secondary";
  onClick?: () => void;
  href?: string;
}

export default function NavCtaButton({
  label,
  variant,
  onClick,
  href,
}: NavCtaButtonProps) {
  const isPrimary = variant === "primary";

  const style: React.CSSProperties = {
    display: "block",
    width: "100%",
    padding: "16px 24px",
    fontSize: "16px",
    fontWeight: 500,
    textAlign: "center",
    textDecoration: "none",
    borderRadius: "999px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    border: isPrimary
      ? "1px solid rgba(255, 255, 255, 0.25)"
      : "1px solid rgba(255, 255, 255, 0.15)",
    background: isPrimary
      ? "rgba(255, 255, 255, 0.15)"
      : "rgba(255, 255, 255, 0.06)",
    color: isPrimary ? "#fff" : "rgba(255, 255, 255, 0.75)",
    letterSpacing: "-0.01em",
    boxShadow: isPrimary
      ? "0 2px 12px rgba(255, 255, 255, 0.06)"
      : "none",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
  };

  if (href) {
    return (
      <a href={href} onClick={onClick} style={style}>
        {label}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} style={style}>
      {label}
    </button>
  );
}
