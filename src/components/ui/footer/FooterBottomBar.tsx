/**
 * FooterBottomBar — full-width accent strip with copyright,
 * location, and social links.
 *
 * Uses --color-accent as background to match the project palette.
 */

import {
  FOOTER_COPYRIGHT_YEAR,
  SITE_NAME,
  FOOTER_LOCATION,
  FOOTER_SOCIAL_LABELS,
} from "@/constants";

export default function FooterBottomBar() {
  return (
    <div className="footer-bottom-bar">
      <div
        className="section-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
          padding: "1rem var(--section-px)",
        }}
      >
        {/* Copyright */}
        <span className="footer-bottom-bar__item">
          Copyright &copy; {SITE_NAME.replace(" Wallet", "")}{" "}
          {FOOTER_COPYRIGHT_YEAR}
        </span>

        {/* Location */}
        <span
          className="footer-bottom-bar__item"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          {FOOTER_LOCATION}
        </span>

        {/* Social links */}
        {FOOTER_SOCIAL_LABELS.map((label) => (
          <a
            key={label}
            href="#"
            className="footer-bottom-bar__item footer-bottom-bar__link"
            style={{ textDecoration: "none" }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
