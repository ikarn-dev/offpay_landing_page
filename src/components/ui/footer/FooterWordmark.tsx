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
        lineHeight: 1.1,
        padding: "2rem 0 4vw", // Added bottom padding to give the 'y' descender room
        textAlign: "center",
      }}
    >
      <span
        style={{
          display: "block",
          fontSize: "clamp(5rem, 26vw, 30rem)",
          color: "var(--color-text)",
          fontFamily: "var(--font-migra)",
          fontWeight: 700, // Make entire text bold
          letterSpacing: "0.03em", // Small gap between each letter
          whiteSpace: "nowrap",
          userSelect: "none",
          width: "100%",
        }}
      >
        OffPay
      </span>
    </div>
  );
}
