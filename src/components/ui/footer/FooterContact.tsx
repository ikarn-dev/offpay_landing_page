/**
 * FooterContact — label text + large email address + divider.
 *
 * Renders the top-left zone of the footer: a small muted label,
 * a prominent email address, and a horizontal divider below.
 */

import { FOOTER_EMAIL, FOOTER_EMAIL_LABEL } from "@/constants";

export default function FooterContact() {
  return (
    <div className="footer-contact">
      {/* Decorative accent dots */}
      <div
        aria-hidden="true"
        style={{
          display: "flex",
          gap: "4px",
          marginBottom: "0.75rem",
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "2px",
            background: "var(--color-accent)",
          }}
        />
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "2px",
            background: "var(--color-accent-light)",
          }}
        />
      </div>

      <p
        style={{
          fontSize: "0.85rem",
          color: "var(--color-text-muted)",
          margin: "0 0 1.25rem",
          lineHeight: 1.5,
          maxWidth: "180px",
          fontFamily: "var(--font-body)",
        }}
      >
        {FOOTER_EMAIL_LABEL}
      </p>

      <a
        href={`mailto:${FOOTER_EMAIL}`}
        className="footer-contact__email"
        style={{
          display: "block",
          fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
          fontWeight: 700,
          color: "var(--color-text)",
          textDecoration: "none",
          fontFamily: "var(--font-heading)",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          margin: 0,
          cursor: "default",
        }}
      >
        {FOOTER_EMAIL}
      </a>
    </div>
  );
}
