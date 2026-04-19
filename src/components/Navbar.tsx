/**
 * Navbar — sticky top navigation bar.
 *
 * Responsibilities (this pass):
 *   • Renders the logo, nav links, and a CTA element.
 *   • Hides on scroll-down, reveals on scroll-up (driven by useScrollDirection).
 *   • Entrance animation via the shared animation utility.
 *
 * Props: all content is injected — no hardcoded strings.
 *
 * @product-input  Visual design, logo SVG, CTA behaviour (copy email vs. link).
 */

"use client";

import { useRef, useEffect } from "react";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { animateFadeIn } from "@/utils/animation";
import type { NavLink } from "@/types";

export interface NavbarProps {
  /** Brand / logo content rendered inside the logo slot. */
  logo: React.ReactNode;
  /** Navigation links rendered in the centre of the bar. */
  links: NavLink[];
  /** CTA element rendered at the trailing edge. */
  cta: React.ReactNode;
}

export default function Navbar({ logo, links, cta }: NavbarProps) {
  const navRef = useRef<HTMLElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const direction = useScrollDirection();

  // Entrance animation — runs once on mount
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    tweenRef.current = animateFadeIn(el, { y: -20, duration: 0.5 });
    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  // Hide / reveal on scroll direction — compositor-only (transform)
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    // Applied via inline style so we avoid layout properties
    el.style.transform =
      direction === "down" ? "translateY(-110%)" : "translateY(0)";
    el.style.transition = "transform 0.3s cubic-bezier(0.4,0,0.2,1)";
  }, [direction]);

  return (
    <nav
      ref={navRef}
      style={{
        opacity: 0,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        background: "rgba(5, 5, 7, 0.82)",
        borderBottom: "1px solid var(--color-border)",
        willChange: "transform",
      }}
      aria-label="Main navigation"
    >
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "0 var(--section-px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Logo */}
        <div aria-label="Homepage">{logo}</div>

        {/* Links */}
        <ul
          role="list"
          style={{
            display: "flex",
            gap: "2rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                style={{
                  color: "var(--color-text-muted)",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  transition: "color var(--duration-base) var(--ease-out)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-muted)")}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div>{cta}</div>
      </div>
    </nav>
  );
}
