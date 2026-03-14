/*
 * Design: Botanical Letterpress — Editorial Romanticism
 * Gift Guide: Elevated design with decorative framing,
 * larger QR code, richer typography, and botanical accents.
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Gift } from "lucide-react";

const GCASH_QR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663343684150/SEVRLfZ4zNKQdRddhVWKwh/Gcash_6bfbd079.jpeg";

export default function GiftGuideSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation(0.1);

  return (
    <section
      id="gifts"
      className="py-20 md:py-32"
      style={{ background: "oklch(0.96 0.02 50)" }}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Title */}
        <div
          ref={titleRef}
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            titleVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Gift
            size={28}
            className="mx-auto mb-4"
            style={{ color: "oklch(0.75 0.1 85)" }}
          />
          <p
            className="font-script text-4xl md:text-5xl mb-3"
            style={{ color: "oklch(0.62 0.1 20)" }}
          >
            A Note On Gifts
          </p>
          <h2
            className="font-display text-3xl md:text-5xl font-light tracking-wide"
            style={{ color: "oklch(0.35 0.04 40)" }}
          >
            Gift Guide
          </h2>
          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-16" style={{ background: "oklch(0.75 0.1 85 / 0.4)" }} />
            <svg width="18" height="18" viewBox="0 0 18 18" style={{ color: "oklch(0.75 0.1 85 / 0.5)" }}>
              <path d="M9 1 L11 7 L17 9 L11 11 L9 17 L7 11 L1 9 L7 7 Z" fill="currentColor" />
            </svg>
            <div className="h-px w-16" style={{ background: "oklch(0.75 0.1 85 / 0.4)" }} />
          </div>
        </div>

        {/* Content — elevated card layout */}
        <div
          ref={contentRef}
          className={`transition-all duration-1000 delay-200 ${
            contentVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.97]"
          }`}
        >
          {/* Decorative outer frame */}
          <div
            className="relative p-8 md:p-14"
            style={{
              background: "oklch(0.98 0.01 55 / 0.6)",
              border: "1px solid oklch(0.85 0.03 55)",
              boxShadow: "0 4px 30px oklch(0.75 0.1 85 / 0.08)",
            }}
          >
            {/* Corner accents */}
            <div className="absolute top-3 left-3 w-6 h-6" style={{ borderTop: "1.5px solid oklch(0.75 0.1 85 / 0.4)", borderLeft: "1.5px solid oklch(0.75 0.1 85 / 0.4)" }} />
            <div className="absolute top-3 right-3 w-6 h-6" style={{ borderTop: "1.5px solid oklch(0.75 0.1 85 / 0.4)", borderRight: "1.5px solid oklch(0.75 0.1 85 / 0.4)" }} />
            <div className="absolute bottom-3 left-3 w-6 h-6" style={{ borderBottom: "1.5px solid oklch(0.75 0.1 85 / 0.4)", borderLeft: "1.5px solid oklch(0.75 0.1 85 / 0.4)" }} />
            <div className="absolute bottom-3 right-3 w-6 h-6" style={{ borderBottom: "1.5px solid oklch(0.75 0.1 85 / 0.4)", borderRight: "1.5px solid oklch(0.75 0.1 85 / 0.4)" }} />

            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
              {/* Text — left side */}
              <div className="flex-1 text-center md:text-left">
                <p
                  className="font-body text-base md:text-lg leading-[1.9] mb-6"
                  style={{ color: "oklch(0.42 0.03 40)" }}
                >
                  Your presence at our wedding is the most meaningful gift we could
                  ever receive. However, should you wish to honor us with a present,
                  a monetary gift would be sincerely appreciated as we begin building
                  our new life together.
                </p>
                <p
                  className="font-body text-sm md:text-base leading-[1.85] italic"
                  style={{ color: "oklch(0.50 0.03 40 / 0.8)" }}
                >
                  You may send your gift via GCash using the QR code provided.
                  Thank you for your generosity and love!
                </p>
              </div>

              {/* GCash QR — larger, more elegant card */}
              <div
                className="shrink-0 p-6 md:p-8 text-center"
                style={{
                  background: "oklch(0.99 0.005 55)",
                  border: "1px solid oklch(0.88 0.02 55)",
                  boxShadow: "0 4px 20px oklch(0.75 0.1 85 / 0.1)",
                }}
              >
                {/* GCash brand accent */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "oklch(0.55 0.15 250)" }}
                  />
                  <p
                    className="font-display text-[11px] tracking-[0.22em] uppercase font-medium"
                    style={{ color: "oklch(0.45 0.03 40)" }}
                  >
                    Scan To Send Via GCash
                  </p>
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "oklch(0.55 0.15 250)" }}
                  />
                </div>

                <img
                  src={GCASH_QR}
                  alt="GCash QR Code for Josh + Ella"
                  className="w-52 md:w-60 h-auto mx-auto"
                  loading="lazy"
                />

                <div
                  className="w-12 h-px mx-auto mt-5 mb-3"
                  style={{ background: "oklch(0.75 0.1 85 / 0.4)" }}
                />
                <p
                  className="font-script text-xl"
                  style={{ color: "oklch(0.62 0.1 20)", fontSize: '28px' }}
                >
                  Josh + Ella
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
