/**
 * Footer — site-wide footer section.
 *
 * Composes sub-components into the full footer layout:
 *   1. FooterContact  — email label (top-left)
 *   2. FooterCtaCard   — accent CTA card (top-right)
 *   3. FooterWordmark  — oversized brand name (full-width)
 *   4. FooterBottomBar — copyright / socials strip
 *
 * Server Component — no interactivity needed in the shell.
 */

import FooterContact from "@/components/ui/footer/FooterContact";
import FooterCtaCard from "@/components/ui/footer/FooterCtaCard";
import FooterWordmark from "@/components/ui/footer/FooterWordmark";
import FooterBottomBar from "@/components/ui/footer/FooterBottomBar";

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
      </div>

      {/* Row 2: Giant wordmark (Full-bleed) */}
      <FooterWordmark />

      {/* Row 3: Full-bleed bottom bar */}
      <FooterBottomBar />
    </footer>
  );
}
