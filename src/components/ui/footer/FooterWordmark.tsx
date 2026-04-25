/**
 * FooterWordmark — oversized brand name spanning full width.
 *
 * Renders the large "OffPay" text that dominates the bottom
 * portion of the footer. Uses PP Migra at a massive size.
 * "Off" is regular weight, "Pay" is bold.
 */

export default function FooterWordmark() {
  return (
    <div
      className="footer-wordmark"
      aria-hidden="true"
      style={{
        overflow: "hidden",
        lineHeight: 0.9,
        padding: "2rem 0 1.5rem",
      }}
    >
      <span
        style={{
          display: "block",
          fontSize: "clamp(5rem, 22vw, 20rem)",
          color: "var(--color-text)",
          fontFamily: "var(--font-migra)",
          letterSpacing: "-0.01em",
          textAlign: "center",
          whiteSpace: "nowrap",
          userSelect: "none",
          width: "100%",
        }}
      >
        <span style={{ fontWeight: 400 }}>Off</span>
        <span style={{ fontWeight: 700 }}>Pay</span>
      </span>
    </div>
  );
}
