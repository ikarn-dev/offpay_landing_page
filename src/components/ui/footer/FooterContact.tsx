/**
 * FooterContact — app logo + brand text + large email address.
 *
 * Renders the top-left zone of the footer: the app icon with
 * "OffPay" text logo, and the email address below.
 */

import Image from "next/image";
import { FOOTER_EMAIL } from "@/constants";

export default function FooterContact() {
  return (
    <div className="footer-contact">
      {/* Logo + brand text */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "0.5rem",
          marginBottom: "1.25rem",
          opacity: 0.8,
        }}
      >
        <Image
          src="/app-icons/64x64.png"
          alt="OffPay logo"
          width={32}
          height={32}
          style={{ borderRadius: "6px", flexShrink: 0, display: "block" }}
        />
        <span
          style={{
            fontSize: "1.35rem",
            fontWeight: 700,
            fontFamily: "var(--font-heading)",
            color: "var(--color-text)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            display: "block",
          }}
        >
          OffPay
        </span>
      </div>

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
