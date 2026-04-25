/**
 * Footer — site-wide footer orchestrator.
 *
 * Composes six sub-components into the full footer layout:
 *   1. FooterContact  — email label + divider (top-left)
 *   2. FooterCtaCard   — accent CTA card (top-right)
 *   3. FooterNav       — navigation links (middle-left)
 *   4. FooterOffice    — office address (middle-right)
 *   5. FooterWordmark  — oversized brand name (full-width)
 *   6. FooterBottomBar — copyright / location / socials strip
 *
 * Server Component — no interactivity needed in the shell.
 */

import FooterContact from "./footer/FooterContact";
import FooterCtaCard from "./footer/FooterCtaCard";
import FooterNav from "./footer/FooterNav";
import FooterOffice from "./footer/FooterOffice";
import FooterWordmark from "./footer/FooterWordmark";
import FooterBottomBar from "./footer/FooterBottomBar";

export default function Footer() {
  return (
    <footer aria-label="Site footer" className="footer">
      <div className="section-container footer__inner">
        {/* Row 1: Contact + CTA */}
        <div className="footer__top">
          <FooterContact />
          <div className="footer__cta-wrapper">
            <FooterCtaCard />
          </div>
        </div>

        {/* Row 2: Nav + Office */}
        <div className="footer__middle">
          <FooterNav />
          <FooterOffice />
        </div>

        {/* Row 3: Giant wordmark */}
        <FooterWordmark />
      </div>

      {/* Row 4: Full-bleed bottom bar */}
      <FooterBottomBar />
    </footer>
  );
}
