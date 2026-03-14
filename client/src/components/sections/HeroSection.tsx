/*
 * Design: Botanical Letterpress — Editorial Romanticism
 * Hero: Full-viewport with couple photo as background.
 * Countdown numbers in solid colored boxes for readability.
 * Date/venue with strong text shadows.
 */

import { useCountdown } from "@/hooks/useCountdown";

const COUPLE_BG = "/images/IMG_1676_bff14813.jpg";

const WEDDING_DATE = new Date("2027-01-24T14:00:00+08:00");

export default function HeroSection() {
  const countdown = useCountdown(WEDDING_DATE);

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Couple photo as full background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${COUPLE_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 70%",
        }}
      />

      {/* Dark gradient overlay at bottom for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, oklch(0.1 0.02 40 / 0.08) 0%, transparent 30%, transparent 50%, oklch(0.1 0.02 40 / 0.3) 75%, oklch(0.1 0.02 40 / 0.5) 100%)",
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
            textShadow: "0 1px 6px oklch(0.05 0.02 40 / 0.6), 0 0 16px oklch(0.05 0.02 40 / 0.35)",
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
              textShadow: "0 2px 8px oklch(0.05 0.02 40 / 0.6), 0 0 24px oklch(0.05 0.02 40 / 0.3)",
            }}
          >
            Joshua
          </span>
          <span
            className="font-display text-xl md:text-2xl tracking-[0.25em] mx-3"
            style={{
              color: "oklch(0.90 0.06 85)",
              textShadow: "0 1px 6px oklch(0.05 0.02 40 / 0.6), 0 0 16px oklch(0.05 0.02 40 / 0.3)",
            }}
          >
            &amp;
          </span>
          <span
            className="font-script text-6xl md:text-8xl leading-tight"
            style={{
              color: "oklch(0.98 0.01 55)",
              textShadow: "0 2px 8px oklch(0.05 0.02 40 / 0.6), 0 0 24px oklch(0.05 0.02 40 / 0.3)",
            }}
          >
            Loela
          </span>
        </div>
      </div>

      {/* ===== SPACER ===== */}
      <div className="flex-1" />

      {/* ===== BOTTOM — Date, venue & Countdown ===== */}
      <div className="relative z-10 flex flex-col items-center text-center pb-10 md:pb-14 px-4">
        {/* Date & venue — original font style with stronger shadows */}
        <div
          className="animate-fade-in mb-8"
          style={{ animationDelay: "1.2s", animationDuration: "1s", animationFillMode: "both" }}
        >
          <p
            className="font-display text-lg md:text-2xl tracking-[0.12em] font-light"
            style={{
              color: "oklch(0.96 0.01 55)",
              textShadow: "0 1px 4px oklch(0.05 0.02 40 / 0.7), 0 2px 10px oklch(0.05 0.02 40 / 0.4)",
            }}
          >
            Sunday, January 24, 2027, 2PM
          </p>
          <p
            className="font-body text-xs md:text-sm mt-2 tracking-[0.15em] uppercase"
            style={{
              color: "oklch(0.90 0.01 55)",
              textShadow: "0 1px 4px oklch(0.05 0.02 40 / 0.7), 0 2px 10px oklch(0.05 0.02 40 / 0.4)",
            }}
          >
            Azienda Verde Alfonso, Cavite
          </p>
        </div>

        {/* Countdown — solid boxes matching site theme (dusty rose / rose-cream) */}
        <div
          className="grid grid-cols-4 gap-3 md:gap-5 animate-scale-in"
          style={{ animationDelay: "1.6s", animationFillMode: "both" }}
        >
          {[
            { value: countdown.days, label: "Days" },
            { value: countdown.hours, label: "Hours" },
            { value: countdown.minutes, label: "Minutes" },
            { value: countdown.seconds, label: "Seconds" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center">
              {/* Solid box — dusty rose matching site primary color */}
              <div
                className="w-16 h-16 md:w-20 md:h-20 rounded-lg flex items-center justify-center text-center"
                style={{
                  background: "oklch(0.95 0.025 65 / 0.9)",
                  boxShadow: "0 4px 16px oklch(0.1 0.05 20 / 0.3)",
                }}
              >
                <span
                  className="font-display text-2xl md:text-4xl font-light tabular-nums leading-none"
                  style={{ color: "oklch(0.35 0.04 40)" }}
                >
                  {String(item.value).padStart(2, "0")}
                </span>
              </div>
              <span
                className="font-body text-[9px] md:text-[11px] tracking-[0.3em] uppercase mt-2"
                style={{
                  color: "oklch(0.95 0.01 55)",
                  textShadow: "0 1px 4px oklch(0.05 0.02 40 / 0.7), 0 0 10px oklch(0.05 0.02 40 / 0.35)",
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
