import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import ContentProtection from "@/components/ui/ContentProtection";
import { NAV_LINKS, SITE_NAME, SITE_DESCRIPTION, SITE_URL, HERO_CTA_PRIMARY } from "@/constants";
import { allFontVariables } from "./fonts";



export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
  },
};

// ---------------------------------------------------------------------------
// Stub logo and navbar data — replace in the content pass
// ---------------------------------------------------------------------------

const LOGO_STUB = (
  <span style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.04em", color: "#fff", fontFamily: "var(--font-heading)", display: "flex", alignItems: "center" }}>
    OffPay
  </span>
);

const NAVBAR_CTA_STUB = (
  <a
    href="#waitlist"
    style={{
      display: "inline-block",
      padding: "8px 20px",
      fontSize: "14px",
      fontFamily: "var(--font-nav)",
      fontWeight: 500,
      color: "#fff",
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "9999px",
      textDecoration: "none",
      letterSpacing: "-0.005em",
      whiteSpace: "nowrap",
      transition: "all 0.2s ease",
    }}
  >
    {HERO_CTA_PRIMARY}
  </a>
);

// ---------------------------------------------------------------------------
// Root layout
// ---------------------------------------------------------------------------

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={allFontVariables}
    >
      <body>
        <ContentProtection />

        <Navbar
          logo={LOGO_STUB}
          links={NAV_LINKS}
          cta={NAVBAR_CTA_STUB}
        />

        {children}

        <Footer />
      </body>
    </html>
  );
}

