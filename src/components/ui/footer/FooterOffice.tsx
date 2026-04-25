/**
 * FooterOffice — office heading + address details.
 *
 * Renders the middle-right zone of the footer: an "Office" heading
 * followed by address lines, right-aligned on desktop.
 */

import { FOOTER_OFFICE_HEADING, FOOTER_OFFICE_ADDRESS } from "@/constants";

export default function FooterOffice() {
  return (
    <div className="footer-office">
      <h3
        style={{
          fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
          fontWeight: 700,
          color: "var(--color-text)",
          fontFamily: "var(--font-heading)",
          margin: "0 0 0.75rem",
          letterSpacing: "-0.01em",
        }}
      >
        {FOOTER_OFFICE_HEADING}
      </h3>

      <address
        style={{
          fontStyle: "normal",
          display: "flex",
          flexDirection: "column",
          gap: "0.15rem",
        }}
      >
        {FOOTER_OFFICE_ADDRESS.map((line) => (
          <span
            key={line}
            style={{
              fontSize: "0.9rem",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-body)",
              lineHeight: 1.5,
            }}
          >
            {line}
          </span>
        ))}
      </address>
    </div>
  );
}
