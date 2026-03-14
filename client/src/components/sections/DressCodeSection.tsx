/*
 * Design: Botanical Letterpress — Editorial Romanticism
 * Dress Code: Staggered Ninang/Ninong cards (one offset higher),
 * flower-shaped color swatches, generous spacing for visual showcase.
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const NINANG_IMG = "https://raw.githubusercontent.com/mltpascual/WeddingRSVP/main/assets/dresscode-ninang-v2-AGVz6HXFv79xQkePMf76ZX.webp";
const NINONG_IMG = "https://raw.githubusercontent.com/mltpascual/WeddingRSVP/main/assets/dresscode-ninong-v2-UNFAJCSKZ4GznKmLg2C45d.webp";
const GUEST_FEMALE_IMG = "https://raw.githubusercontent.com/mltpascual/WeddingRSVP/main/assets/dresscode-guest-lady-v2-9iFkgk3FpeqaTbfyrkpq2s.webp";
const GUEST_MALE_IMG = "https://raw.githubusercontent.com/mltpascual/WeddingRSVP/main/assets/dresscode-guest-gent-v4-transparent_6ada6479.png";

const colorGuide = [
  { color: "#F2C94C", name: "Yellow" },
  { color: "#D94F4F", name: "Red" },
  { color: "#9B59B6", name: "Purple" },
  { color: "#5DADE2", name: "Sky Blue" },
];

function FlowerSwatch({ color, name, delay }: { color: string; name: string; delay: number }) {
  return (
    <div
      className="flex flex-col items-center gap-2"
      style={{ animationDelay: `${delay}ms` }}
    >
      <svg width="52" height="52" viewBox="0 0 56 56" className="md:w-14 md:h-14">
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse
            key={angle}
            cx="28"
            cy="28"
            rx="10"
            ry="15"
            fill={color}
            opacity="0.8"
            transform={`rotate(${angle} 28 28) translate(0 -8)`}
          />
        ))}
        <circle cx="28" cy="28" r="5" fill={color} />
      </svg>
      <span
        className="font-body text-[9px] tracking-[0.18em] uppercase"
        style={{ color: "oklch(0.55 0.03 40)" }}
      >
        {name}
      </span>
    </div>
  );
}

export default function DressCodeSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation(0.08);
  const { ref: guestRef, isVisible: guestVisible } = useScrollAnimation(0.1);
  const { ref: colorRef, isVisible: colorVisible } = useScrollAnimation(0.2);

  return (
    <section
      id="dress-code"
      className="py-24 md:py-36 paper-texture"
      style={{ background: "oklch(0.96 0.02 50)" }}
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        {/* Title — right-aligned for variety */}
        <div
          ref={titleRef}
          className={`mb-14 md:mb-20 transition-all duration-1000 ${
            titleVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-center">
            <p
              className="font-script text-3xl md:text-4xl mb-2"
              style={{ color: "oklch(0.62 0.1 20)" }}
            >
              What To Wear
            </p>
            <h2
              className="font-display text-3xl md:text-5xl font-light tracking-wide"
              style={{ color: "oklch(0.35 0.04 40)" }}
            >
              Dress Code
            </h2>
            <p
              className="font-body text-sm md:text-base mt-4 leading-[1.85] mx-auto max-w-md"
              style={{ color: "oklch(0.42 0.03 40)" }}
            >
              We hope our wedding gives you the perfect excuse to dress up,
              feel fabulous and have fun!
            </p>
            {/* Gold accent — centered */}
            <div
              className={`h-px mt-5 mx-auto transition-all duration-1200 delay-300 ${
                titleVisible ? "w-20 opacity-100" : "w-0 opacity-0"
              }`}
              style={{ background: "oklch(0.75 0.1 85 / 0.6)" }}
            />
          </div>
        </div>

        {/* Ninangs & Ninongs — staggered vertical offset */}
        <div
          ref={cardsRef}
          className={`grid grid-cols-2 gap-4 md:gap-8 mb-10 md:mb-14 transition-all duration-1000 ${
            cardsVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Ninang Card — slightly higher on desktop */}
          <div
            className="text-center"
            style={{
              opacity: cardsVisible ? 1 : 0,
              transform: cardsVisible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 200ms",
            }}
          >
            <h3
              className="font-script text-2xl md:text-3xl mb-1"
              style={{ color: "oklch(0.48 0.06 140)" }}
            >
              For The Ninangs:
            </h3>
            <p
              className="font-body text-[10px] tracking-[0.2em] uppercase mb-5"
              style={{ color: "oklch(0.55 0.03 40)" }}
            >
              (Godmothers)
            </p>
            <div className="flex justify-center items-center mb-5 h-48 md:h-[22rem]">
              <img
                src={NINANG_IMG}
                alt="Ninang dress code — olive green long gown"
                className="max-h-full w-auto object-contain"
                loading="lazy"
              />
            </div>
            <p
              className="font-display text-lg md:text-xl font-medium tracking-wide"
              style={{ color: "oklch(0.35 0.04 40)" }}
            >
              Olive Green Long Gown
            </p>
          </div>

          {/* Ninong Card — equally aligned */}
          <div
            className="text-center"
            style={{
              opacity: cardsVisible ? 1 : 0,
              transform: cardsVisible ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 400ms",
            }}
          >
            <h3
              className="font-script text-2xl md:text-3xl mb-1"
              style={{ color: "oklch(0.30 0.02 40)" }}
            >
              For The Ninongs:
            </h3>
            <p
              className="font-body text-[10px] tracking-[0.2em] uppercase mb-5"
              style={{ color: "oklch(0.55 0.03 40)" }}
            >
              (Godfathers)
            </p>
            <div className="flex justify-center items-center mb-5 h-48 md:h-[22rem]">
              <img
                src={NINONG_IMG}
                alt="Ninong dress code — black suit with olive green tie"
                className="max-h-full w-auto object-contain"
                loading="lazy"
              />
            </div>
            <p
              className="font-display text-lg md:text-xl font-medium tracking-wide"
              style={{ color: "oklch(0.35 0.04 40)" }}
            >
              Black Suit, Olive Green Ties And Slacks
            </p>
          </div>
        </div>

        {/* For Our Guests */}
        <div
          ref={guestRef}
          className={`text-center mb-16 md:mb-20 transition-all duration-1000 ${
            guestVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h3
            className="font-script text-2xl md:text-3xl mb-2"
            style={{ color: "oklch(0.62 0.1 20)" }}
          >
            For Our Guests:
          </h3>
          <p
            className="font-display text-xl md:text-2xl font-semibold tracking-wide mb-2"
            style={{ color: "oklch(0.35 0.04 40)" }}
          >
            Strictly Formal
          </p>
          <p
            className="font-body text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed"
            style={{ color: "oklch(0.50 0.03 40)" }}
          >
            We kindly request that all guests honor the dress code.
          </p>

          <div className="flex justify-center gap-4 md:gap-20 mb-6">
            <div
              className="text-center"
              style={{
                opacity: guestVisible ? 1 : 0,
                transform: guestVisible ? "translateY(0)" : "translateY(12px)",
                transition: "all 0.8s ease 300ms",
              }}
            >
              <div className="flex justify-center items-center h-40 md:h-[20rem] mb-4">
                <img
                  src={GUEST_FEMALE_IMG}
                  alt="Ladies — modern & chic long gown"
                  className="max-h-full w-auto object-contain"
                  loading="lazy"
                />
              </div>
              <p
                className="font-body text-xs md:text-sm"
                style={{ color: "oklch(0.42 0.03 40)" }}
              >
                Ladies: Modern &amp; Chic Long Gown
              </p>
            </div>
            <div
              className="text-center"
              style={{
                opacity: guestVisible ? 1 : 0,
                transform: guestVisible ? "translateY(0)" : "translateY(12px)",
                transition: "all 0.8s ease 500ms",
              }}
            >
              <div className="flex justify-center items-center h-40 md:h-[20rem] mb-4">
                <img
                  src={GUEST_MALE_IMG}
                  alt="Gentlemen — long sleeves, black suit and pants"
                  className="max-h-full w-auto object-contain"
                  loading="lazy"
                />
              </div>
              <p
                className="font-body text-xs md:text-sm"
                style={{ color: "oklch(0.42 0.03 40)" }}
              >
                Gentlemen: Long Sleeves, Black Suit And Pants
              </p>
            </div>
          </div>
        </div>

        {/* Color guide with flower swatches */}
        <div
          ref={colorRef}
          className={`text-center transition-all duration-1000 ${
            colorVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <h3
            className="font-display text-lg md:text-xl font-light tracking-[0.15em] uppercase mb-8"
            style={{ color: "oklch(0.45 0.04 40)" }}
          >
            Color Guide
          </h3>
          <div className="flex items-center justify-center gap-5 md:gap-8 flex-wrap">
            {colorGuide.map((c, i) => (
              <div
                key={c.name}
                style={{
                  opacity: colorVisible ? 1 : 0,
                  transform: colorVisible ? "scale(1)" : "scale(0.8)",
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${400 + i * 100}ms`,
                }}
              >
                <FlowerSwatch color={c.color} name={c.name} delay={i * 100} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
