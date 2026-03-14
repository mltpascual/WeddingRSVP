/*
 * Design: Botanical Letterpress — Editorial Romanticism
 * Hero: Full-viewport with couple photo as background.
 * No overlay — clean photo background.
 * Layout: Names/invitation at top, countdown at bottom.
 * Scroll indicator removed.
 */

import { useCountdown } from "@/hooks/useCountdown";
import { useEffect, useState } from "react";

const COUPLE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663343684150/SEVRLfZ4zNKQdRddhVWKwh/IMG_1676_bff14813.jpg";

const WEDDING_DATE = new Date("2027-01-24T14:00:00+08:00");

export default function HeroSection() {
  const countdown = useCountdown(WEDDING_DATE);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.15;

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Couple photo as full background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${COUPLE_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 70%",
          transform: `translateY(${parallaxOffset}px) scale(1.05)`,
          transition: "transform 0.1s linear",
        }}
      />

      {/* ===== TOP — Invitation text & Couple names ===== */}
      <div className="relative z-10 flex flex-col items-center text-center pt-20 md:pt-24 px-4">
        {/* Invitation text */}
        <p
          className="font-body text-[11px] md:text-sm tracking-[0.35em] uppercase mb-6 animate-fade-in"
          style={{
            color: "oklch(0.98 0.01 55)",
            animationDelay: "0.3s",
            animationFillMode: "both",
            textShadow: "0 1px 10px oklch(0.1 0.02 40 / 0.7), 0 0 20px oklch(0.1 0.02 40 / 0.4)",
          }}
        >
          Together With Our Families
        </p>

        {/* Couple names */}
        <div
          className="animate-fade-in mb-3"
          style={{ animationDelay: "0.8s", animationDuration: "1.2s", animationFillMode: "both" }}
        >
          <span
            className="font-script text-6xl md:text-8xl leading-tight"
            style={{
              color: "oklch(0.98 0.01 55)",
              textShadow: "0 2px 20px oklch(0.1 0.02 40 / 0.7), 0 0 40px oklch(0.1 0.02 40 / 0.3)",
            }}
          >
            Joshua
          </span>
          <span
            className="font-display text-xl md:text-2xl tracking-[0.25em] mx-3"
            style={{
              color: "oklch(0.90 0.06 85)",
              textShadow: "0 1px 12px oklch(0.1 0.02 40 / 0.7), 0 0 30px oklch(0.1 0.02 40 / 0.3)",
            }}
          >
            &amp;
          </span>
          <span
            className="font-script text-6xl md:text-8xl leading-tight"
            style={{
              color: "oklch(0.98 0.01 55)",
              textShadow: "0 2px 20px oklch(0.1 0.02 40 / 0.7), 0 0 40px oklch(0.1 0.02 40 / 0.3)",
            }}
          >
            Loela
          </span>
        </div>
      </div>

      {/* ===== SPACER — lets the couple photo breathe ===== */}
      <div className="flex-1" />

      {/* ===== BOTTOM — Date, venue & Countdown ===== */}
      <div className="relative z-10 flex flex-col items-center text-center pb-10 md:pb-14 px-4">
        {/* Date & venue */}
        <div
          className="animate-fade-in mb-8"
          style={{ animationDelay: "1.2s", animationDuration: "1s", animationFillMode: "both" }}
        >
          <p
            className="font-display text-lg md:text-2xl tracking-[0.12em] font-light"
            style={{
              color: "oklch(0.96 0.01 55)",
              textShadow: "0 1px 12px oklch(0.1 0.02 40 / 0.7), 0 0 24px oklch(0.1 0.02 40 / 0.3)",
            }}
          >
            Sunday, January 24, 2027
          </p>
          <p
            className="font-body text-xs md:text-sm mt-2 tracking-[0.15em] uppercase"
            style={{
              color: "oklch(0.90 0.01 55)",
              textShadow: "0 1px 10px oklch(0.1 0.02 40 / 0.7), 0 0 20px oklch(0.1 0.02 40 / 0.3)",
            }}
          >
            Azienda Verde Alfonso, Cavite
          </p>
        </div>

        {/* Countdown */}
        <div
          className="grid grid-cols-4 gap-3 md:gap-12 animate-scale-in"
          style={{ animationDelay: "1.6s", animationFillMode: "both" }}
        >
          {[
            { value: countdown.days, label: "Days" },
            { value: countdown.hours, label: "Hours" },
            { value: countdown.minutes, label: "Minutes" },
            { value: countdown.seconds, label: "Seconds" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              <span
                className="font-display text-3xl md:text-5xl font-light tabular-nums"
                style={{
                  color: "oklch(0.98 0.02 55)",
                  textShadow: "0 2px 16px oklch(0.1 0.02 40 / 0.7), 0 0 30px oklch(0.1 0.02 40 / 0.3)",
                }}
              >
                {String(item.value).padStart(2, "0")}
              </span>
              <span
                className="font-body text-[9px] md:text-[11px] tracking-[0.3em] uppercase mt-1.5"
                style={{
                  color: "oklch(0.88 0.01 55)",
                  textShadow: "0 1px 8px oklch(0.1 0.02 40 / 0.7), 0 0 16px oklch(0.1 0.02 40 / 0.3)",
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
