/*
 * Design: Botanical Letterpress — Editorial Romanticism
 * Footer: Large-scale couple names as editorial closing statement.
 * Full-width botanical watercolor garland, venue info, minimal.
 */

import { MapPin } from "lucide-react";

const BOTANICAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663343684150/SEVRLfZ4zNKQdRddhVWKwh/footer-botanical-transparent_8aa08f5c.png";

export default function FooterSection() {
  return (
    <footer
      className="py-20 md:py-28 text-center paper-texture"
      style={{ background: "oklch(0.95 0.025 65)" }}
    >
      <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8">
        {/* Full-width botanical watercolor garland */}
        <img
          src={BOTANICAL_IMG}
          alt=""
          className="w-[16rem] md:w-[38rem] lg:w-[44rem] h-auto mx-auto mb-10 md:mb-12"
          loading="lazy"
        />

        {/* Large-scale couple names — editorial closing */}
        <p
          className="font-script text-4xl md:text-7xl mb-2"
          style={{ color: "oklch(0.62 0.1 20)" }}
        >
          Joshua & Loela
        </p>
        <p
          className="font-display text-xs md:text-sm tracking-[0.35em] uppercase mb-10"
          style={{ color: "oklch(0.55 0.03 40)" }}
        >
          January 24, 2027
        </p>

        {/* Venue */}
        <div className="gold-hairline w-32 md:w-48 mx-auto mb-8" />

        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin size={14} style={{ color: "oklch(0.62 0.1 20 / 0.6)" }} />
          <p
            className="font-display text-sm tracking-[0.1em] uppercase"
            style={{ color: "oklch(0.50 0.03 40)" }}
          >
            Azienda Verde Alfonso, Cavite
          </p>
        </div>
        <a
          href="https://maps.google.com/?q=Azienda+Verde+Alfonso+Cavite"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-body text-[10px] tracking-[0.15em] uppercase transition-opacity duration-300 hover:opacity-60 mt-1 mb-10"
          style={{
            color: "oklch(0.62 0.1 20 / 0.7)",
            borderBottom: "1px solid oklch(0.62 0.1 20 / 0.3)",
          }}
        >
          View Location On Map
        </a>


      </div>
    </footer>
  );
}
