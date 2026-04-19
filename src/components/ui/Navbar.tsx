/**
 * Navbar — clean, minimal top navigation bar.
 *
 * Desktop: frosted floating bar — logo left · links center · CTA right.
 * Mobile:  hamburger → the navbar itself extends downward as a single
 *          continuous glassmorphic card, slides up on close.
 */

"use client";

import { useState, useEffect } from "react";
import type { NavLink } from "@/types";
import NavCtaButton from "@/components/ui/NavCtaButton";

/* ------------------------------------------------------------------ */
/* Props                                                               */
/* ------------------------------------------------------------------ */

export interface NavbarProps {
  logo: React.ReactNode;
  links: NavLink[];
  cta: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function Navbar({ logo, links, cta }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ---- Responsive CSS ---- */}
      <style>{`
        .navbar-desktop-links,
        .navbar-desktop-cta {
          display: flex;
        }
        .navbar-hamburger {
          display: none;
        }
        .navbar-mobile-dropdown {
          display: none;
        }
        .navbar-mobile-backdrop {
          display: none;
        }

        @media (max-width: 768px) {
          .navbar-desktop-links,
          .navbar-desktop-cta {
            display: none !important;
          }
          .navbar-hamburger {
            display: flex !important;
          }
          .navbar-mobile-dropdown {
            display: block !important;
          }
          .navbar-mobile-backdrop {
            display: block !important;
          }
        }
      `}</style>

      {/* ---- Backdrop (mobile only, click to close) ---- */}
      <div
        className="navbar-mobile-backdrop"
        onClick={() => setMobileOpen(false)}
        style={{
          display: "none",
          position: "fixed",
          inset: 0,
          zIndex: 49,
          background: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
      />

      {/* ---- Unified glass navbar ---- */}
      <nav
        style={{
          position: "fixed",
          top: "16px",
          left: "50%",
          width: "min(92vw, 1120px)",
          transform: "translateX(-50%)",
          zIndex: 50,
          borderRadius: "14px",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          background: "rgba(255, 255, 255, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.06), 0 8px 24px rgba(0, 0, 0, 0.04)",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
          overflow: "hidden",
        }}
        aria-label="Main navigation"
      >
        {/* ---- Top bar (always visible) ---- */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 24px",
          }}
        >
          {/* Logo — left */}
          <a
            href="#"
            style={{ textDecoration: "none", flexShrink: 0 }}
            aria-label="Homepage"
          >
            {logo}
          </a>

          {/* Desktop: Nav Links — center */}
          <ul
            className="navbar-desktop-links"
            role="list"
            style={{
              alignItems: "center",
              gap: "6px",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {links.map((link) => (
              <li key={link.label}>
                <NavTextLink href={link.href} label={link.label} />
              </li>
            ))}
          </ul>

          {/* Desktop: CTA — right */}
          <div className="navbar-desktop-cta" style={{ flexShrink: 0 }}>
            {cta}
          </div>

          {/* Mobile: Hamburger / Close button */}
          <button
            className="navbar-hamburger"
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {mobileOpen ? (
              /* × close icon */
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            ) : (
              /* ☰ hamburger icon */
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* ---- Mobile dropdown (slides down from navbar) ---- */}
        <div
          className="navbar-mobile-dropdown"
          style={{
            display: "none",
            maxHeight: mobileOpen ? "600px" : "0px",
            opacity: mobileOpen ? 1 : 0,
            overflow: "hidden",
            transition:
              "max-height 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease",
          }}
        >
          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "rgba(255, 255, 255, 0.1)",
              margin: "0 24px",
            }}
          />

          {/* Nav rows */}
          <div style={{ padding: "8px 24px 0" }}>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "18px 0",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  textDecoration: "none",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          {/* CTA buttons */}
          <div
            style={{
              padding: "20px 24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <NavCtaButton
              label="Join the waitlist"
              variant="primary"
              href="#waitlist"
              onClick={() => setMobileOpen(false)}
            />
            <NavCtaButton
              label="Read the docs"
              variant="secondary"
              href="#how-it-works"
              onClick={() => setMobileOpen(false)}
            />
          </div>
        </div>
      </nav>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Plain text nav link with hover effect (desktop only)                */
/* ------------------------------------------------------------------ */

function NavTextLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        padding: "8px 16px",
        textDecoration: "none",
        color: hovered ? "#fff" : "rgba(255, 255, 255, 0.65)",
        fontSize: "14px",
        fontWeight: 450,
        letterSpacing: "-0.005em",
        borderRadius: "8px",
        background: hovered ? "rgba(255, 255, 255, 0.08)" : "transparent",
        transition: "all 0.2s ease",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </a>
  );
}
