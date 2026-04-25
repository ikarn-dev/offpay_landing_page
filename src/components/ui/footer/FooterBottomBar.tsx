/**
 * FooterBottomBar — full-width accent strip with app logo,
 * copyright, and social links.
 *
 * Uses --color-accent as background to match the project palette.
 */

import Image from "next/image";
import {
  FOOTER_COPYRIGHT_YEAR,
  SITE_NAME,
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
          gap: "1rem",
          padding: "0.75rem var(--section-px)",
          maxWidth: "100%",
        }}
      >
        {/* Logo + brand name */}
        <span
          className="footer-bottom-bar__item"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <Image
            src="/app-icons/64x64.png"
            alt="OffPay logo"
            width={24}
            height={24}
            style={{ borderRadius: "4px", flexShrink: 0 }}
          />
          <span
            style={{
              fontWeight: 700,
              fontSize: "0.85rem",
              fontFamily: "var(--font-heading)",
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ fontWeight: 400 }}>Off</span>
            <span style={{ fontWeight: 700 }}>Pay</span>
          </span>
        </span>

        {/* Copyright */}
        <span className="footer-bottom-bar__item">
          Copyright &copy; {SITE_NAME.replace(" Wallet", "")}{" "}
          {FOOTER_COPYRIGHT_YEAR}
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
