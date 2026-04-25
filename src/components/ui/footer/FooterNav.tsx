/**
 * FooterNav — vertical navigation link list.
 *
 * Renders the middle-left zone of the footer: a vertical stack
 * of navigation links (Products, Pricing, Contact Us).
 */

import { FOOTER_NAV_LINKS } from "@/constants";

export default function FooterNav() {
  return (
    <nav aria-label="Footer navigation" className="footer-nav">
      <ul
        role="list"
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
        }}
      >
        {FOOTER_NAV_LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              style={{
                fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                fontWeight: 600,
                color: "var(--color-text)",
                textDecoration: "none",
                fontFamily: "var(--font-heading)",
                transition: "color var(--duration-base) var(--ease-out)",
                letterSpacing: "-0.01em",
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
