/*
 * Design: Botanical Letterpress — Editorial Romanticism
 * Hero: Split layout — couple photo top, solid cream bar bottom.
 * Top: Full-width photo with couple names overlay.
 * Bottom: Solid cream/beige bar with date, venue, countdown for readability.
 */

import { useCountdown } from "@/hooks/useCountdown";

const COUPLE_BG = "https://raw.githubusercontent.com/mltpascual/WeddingRSVP/main/assets/IMG_1676_bff14813.jpg";

const WEDDING_DATE = new Date("2027-01-24T14:00:00+08:00");

export default function HeroSection() {
  const countdown = useCountdown(WEDDING_DATE);

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* ===== TOP — Photo with couple names ===== */}
      <div className="relative flex-1 min-h-[55vh] md:min-h-[60vh] overflow-hidden">
        {/* Couple photo background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${COUPLE_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center 70%",
          }}
        />
        {/* Subtle dark gradient at top for "Together With Our Families" text */}
        <div
          className="absolute inset-x-0 top-0 h-32"
          style={{
            background: "linear-gradient(to bottom, oklch(0.1 0.02 40 / 0.35), transparent)",
          }}
        />

        {/* Names overlay */}
        <div className="relative z-10 flex flex-col items-center text-center pt-16 md:pt-20 px-4">
          <p
            className="font-body text-[11px] md:text-sm tracking-[0.35em] uppercase mb-5 animate-fade-in"
            style={{
              color: "oklch(0.98 0.01 55)",
              animationDelay: "0.3s",
              animationFillMode: "both",
              textShadow: "0 1px 10px oklch(0.1 0.02 40 / 0.7), 0 0 20px oklch(0.1 0.02 40 / 0.4)",
            }}
          >
            Together With Our Families
          </p>

          <div
            className="animate-fade-in"
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
      </div>

      {/* ===== BOTTOM — Solid cream bar with date, venue & countdown ===== */}
      <div
        className="relative z-10 flex flex-col items-center text-center py-10 md:py-14 px-4"
        style={{ background: "oklch(0.95 0.025 65)" }}
      >
        {/* Date & venue */}
        <div
          className="animate-fade-in mb-8"
          style={{ animationDelay: "1.2s", animationDuration: "1s", animationFillMode: "both" }}
        >
          <p
            className="font-display text-lg md:text-2xl tracking-[0.12em] font-light"
            style={{ color: "oklch(0.35 0.04 40)" }}
          >
            Sunday, January 24, 2027
          </p>
          <p
            className="font-body text-xs md:text-sm mt-2 tracking-[0.15em] uppercase"
            style={{ color: "oklch(0.50 0.03 40)" }}
          >
            Azienda Verde Alfonso, Cavite
          </p>
        </div>

        {/* Countdown */}
        <div
          className="grid grid-cols-4 gap-6 md:gap-12 animate-scale-in"
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
                style={{ color: "oklch(0.62 0.1 20)" }}
              >
                {String(item.value).padStart(2, "0")}
              </span>
              <span
                className="font-body text-[9px] md:text-[11px] tracking-[0.3em] uppercase mt-1.5"
                style={{ color: "oklch(0.50 0.03 40)" }}
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
