/**
 * FooterCtaCard — direct Android APK download link.
 *
 * OffPay is currently available as an Android APK, so the footer exposes one
 * compact download action.
 */

/** Shared button styles */
const btnStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  minHeight: "44px",
  background: "rgba(252, 252, 255, 0.92)",
  color: "var(--color-text)",
  borderRadius: "12px",
  padding: "0.55rem 0.85rem",
  textDecoration: "none",
  fontSize: "0.82rem",
  fontWeight: 600,
  fontFamily: "var(--font-body)",
  transition:
    "background var(--duration-base) var(--ease-out), border-color var(--duration-base) var(--ease-out)",
  whiteSpace: "nowrap" as const,
  lineHeight: 1.3,
  border: "1px solid rgba(252, 252, 255, 0.7)",
};

const iconStyle: React.CSSProperties = {
  flexShrink: 0,
  display: "block",
  width: "18px",
  height: "18px",
  transform: "translateY(-1px)",
};

export default function FooterCtaCard() {
  return (
    <div className="footer-downloads">
      <a
        href="#waitlist"
        aria-label="Download Android APK"
        className="footer-downloads__button"
        style={btnStyle}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          style={iconStyle}
        >
          <path d="M17.6 9.48 19.33 6.5a.5.5 0 0 0-.18-.68.5.5 0 0 0-.69.18l-1.76 3.05A10.1 10.1 0 0 0 12 7.9a10.1 10.1 0 0 0-4.7 1.15L5.54 6a.5.5 0 0 0-.69-.18.5.5 0 0 0-.18.68L6.4 9.48C3.77 11 2 13.6 2 16.58V18h20v-1.42c0-2.98-1.77-5.58-4.4-7.1ZM7.25 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm9.5 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" />
        </svg>
        <span className="footer-downloads__text">Download APK</span>
      </a>
    </div>
  );
}
