/**
 * Footer — site-wide footer orchestrator.
 *
 * Composes sub-components into the full footer layout:
 *   1. FooterContact  — email label (top-left)
 *   2. FooterCtaCard   — accent CTA card (top-right)
 *   3. FooterWordmark  — oversized brand name (full-width)
 *   4. FooterBottomBar — logo / copyright / socials strip
 *
 * Server Component — no interactivity needed in the shell.
 */

import FooterContact from "./footer/FooterContact";
import FooterCtaCard from "./footer/FooterCtaCard";
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

        {/* Row 2: Giant wordmark */}
        <FooterWordmark />
      </div>

      {/* Row 3: Full-bleed bottom bar */}
      <FooterBottomBar />
    </footer>
  );
}

