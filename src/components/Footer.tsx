/**
 * Footer — site-wide footer.
 *
 * Responsibilities (this pass):
 *   • Renders logo, tagline, navigation columns, social links, and copyright.
 *   • Server Component — no interactivity needed, so no "use client" directive.
 *     This keeps it out of the client JS bundle.
 *
 * Props: all content injected.
 *
 * @product-input  Footer link columns, social URLs, legal copy, and logo.
 */

import type { NavLink } from "@/types";

export interface FooterColumn {
  heading: string;
  links: NavLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  /** Rendered icon element. */
  icon: React.ReactNode;
}

export interface FooterProps {
  logo: React.ReactNode;
  tagline: string;
  columns: FooterColumn[];
  socialLinks: SocialLink[];
  copyrightYear: number;
  siteName: string;
}

export default function Footer({
  logo,
  tagline,
  columns,
  socialLinks,
  copyrightYear,
  siteName,
}: FooterProps) {
  return (
    <footer
      aria-label="Site footer"
      style={{
        borderTop: "1px solid var(--color-border)",
        background: "var(--color-bg-subtle)",
      }}
    >
      <div
        className="section-container"
        style={{
          paddingTop: "4rem",
          paddingBottom: "2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr repeat(auto-fit, minmax(140px, 1fr))",
            gap: "3rem",
          }}
        >
          {/* Brand column */}
          <div>
            <div style={{ marginBottom: "0.75rem" }}>{logo}</div>
            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--color-text-muted)",
                lineHeight: 1.6,
                maxWidth: "280px",
                margin: "0 0 1.5rem",
              }}
            >
              {tagline}
            </p>

            {/* Social links */}
            <ul
              role="list"
              aria-label="Social links"
              style={{
                display: "flex",
                gap: "0.75rem",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "36px",
                      height: "36px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-muted)",
                      transition: "all var(--duration-base) var(--ease-out)",
                      textDecoration: "none",
                    }}
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation columns */}
          {columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--color-text-dim)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  margin: "0 0 1rem",
                }}
              >
                {col.heading}
              </h3>
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
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--color-text-muted)",
                        textDecoration: "none",
                        transition: "color var(--duration-base)",
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--color-border)",
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--color-text-dim)",
              margin: 0,
            }}
          >
            &copy; {copyrightYear} {siteName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
