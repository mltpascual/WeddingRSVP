/*
 * Design: Botanical Letterpress — Editorial Romanticism
 * Section transitions: Varied dividers to break monotony.
 * Types: gold-hairline, botanical, ornament, space, dot
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const DIVIDER_URL = "https://raw.githubusercontent.com/mltpascual/WeddingRSVP/main/assets/botanical-divider-ixiNhYPFsAbJhAhQg6gord.webp";

type DividerVariant = "gold-hairline" | "botanical" | "ornament" | "space" | "dot";

interface SectionDividerProps {
  variant?: DividerVariant;
}

function GoldOrnament() {
  return (
    <svg width="80" height="20" viewBox="0 0 80 20" fill="none">
      <path
        d="M0 10 Q20 0 40 10 Q60 20 80 10"
        stroke="oklch(0.75 0.1 85 / 0.4)"
        strokeWidth="0.8"
        fill="none"
      />
      <circle cx="40" cy="10" r="2.5" fill="oklch(0.75 0.1 85 / 0.35)" />
      <circle cx="20" cy="5" r="1" fill="oklch(0.75 0.1 85 / 0.25)" />
      <circle cx="60" cy="15" r="1" fill="oklch(0.75 0.1 85 / 0.25)" />
    </svg>
  );
}

export default function SectionDivider({ variant = "gold-hairline" }: SectionDividerProps) {
  const { ref, isVisible } = useScrollAnimation(0.5);

  if (variant === "space") {
    return <div className="h-6 md:h-10" />;
  }

  if (variant === "dot") {
    return (
      <div ref={ref} className="flex items-center justify-center py-6 md:py-8 gap-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`w-1 h-1 rounded-full transition-all duration-700 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
            style={{
              background: "oklch(0.75 0.1 85 / 0.5)",
              transitionDelay: `${i * 150}ms`,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "ornament") {
    return (
      <div
        ref={ref}
        className={`flex items-center justify-center py-5 md:py-7 transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <GoldOrnament />
      </div>
    );
  }

  if (variant === "botanical") {
    return (
      <div
        ref={ref}
        className={`flex items-center justify-center py-4 md:py-6 transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src={DIVIDER_URL}
          alt=""
          className="w-40 md:w-56 h-auto opacity-35"
          loading="lazy"
        />
      </div>
    );
  }

  // Default: gold-hairline
  return (
    <div ref={ref} className="flex items-center justify-center py-2 md:py-3">
      <div
        className={`gold-hairline w-40 md:w-64 transition-all duration-1200 ${
          isVisible ? "opacity-100 animate-line-grow" : "opacity-0"
        }`}
      />
    </div>
  );
}
