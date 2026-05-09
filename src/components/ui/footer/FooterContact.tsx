/**
 * FooterContact — app logo + brand text + large email address.
 *
 * Renders the top-left zone of the footer: the app icon with
 * "OffPay" text logo, and the email address below.
 */

import { FOOTER_EMAIL } from "@/constants";

export default function FooterContact() {
  return (
    <div className="footer-contact">
      {/* Contact title */}
      <div
        style={{
          marginBottom: "0.75rem",
        }}
      >
        <span
          style={{
            fontSize: "1.25rem",
            fontWeight: 400,
            fontFamily: "var(--font-heading)",
            letterSpacing: "0",
            color: "rgba(252, 252, 255, 0.68)",
          }}
        >
          contact
        </span>
      </div>

      <a
        href={`mailto:${FOOTER_EMAIL}`}
        className="footer-contact__email"
        style={{
          display: "block",
          fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)",
          fontWeight: 700,
          color: "var(--color-text-inverse)",
          textDecoration: "none",
          fontFamily: "var(--font-heading)",
          letterSpacing: "0",
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
