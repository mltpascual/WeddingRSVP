/*
 * Design: Botanical Letterpress — Editorial Romanticism
 * Entourage: Hierarchical layout — parents prominent,
 * ornamental gold brackets around names, decorative
 * vertical divider between columns.
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const entourage = {
  parents: [
    { side: "Bride's Parents", names: ["Mr. & Mrs. Ralleta"] },
    { side: "Groom's Parents", names: ["Mr. & Mrs. Lakay"] },
  ],
  principalSponsors: [
    { name: "To Be Announced", role: "Ninang" },
    { name: "To Be Announced", role: "Ninong" },
  ],
  bestMan: "To Be Announced",
  maidOfHonor: "To Be Announced",
};

export default function EntourageSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { ref: parentsRef, isVisible: parentsVisible } = useScrollAnimation(0.1);
  const { ref: partyRef, isVisible: partyVisible } = useScrollAnimation(0.1);

  return (
    <section
      id="entourage"
      className="py-20 md:py-28"
      style={{ background: "oklch(0.97 0.015 60)" }}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Title — centered for this section (entourage is formal/ceremonial) */}
        <div
          ref={titleRef}
          className={`text-center mb-14 md:mb-20 transition-all duration-1000 ${
            titleVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p
            className="font-script text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.62 0.1 20)" }}
          >
            The Wedding Party
          </p>
          <h2
            className="font-display text-3xl md:text-5xl font-light tracking-wide"
            style={{ color: "oklch(0.35 0.04 40)" }}
          >
            Our Entourage
          </h2>
        </div>

        {/* Parents — prominent, with ornamental brackets */}
        <div
          ref={parentsRef}
          className={`transition-all duration-1000 delay-200 ${
            parentsVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0 mb-16 md:mb-20">
            {/* Decorative vertical divider — desktop only */}
            <div
              className="hidden md:block absolute left-1/2 top-2 bottom-2 -translate-x-1/2 gold-thread"
            />

            {entourage.parents.map((parent, i) => (
              <div
                key={parent.side}
                className={`text-center ${i === 0 ? "md:pr-12" : "md:pl-12"}`}
                style={{
                  opacity: parentsVisible ? 1 : 0,
                  transform: parentsVisible ? "translateY(0)" : "translateY(10px)",
                  transition: `all 0.8s ease ${300 + i * 200}ms`,
                }}
              >
                <h3
                  className="font-display text-[11px] tracking-[0.25em] uppercase mb-5"
                  style={{ color: "oklch(0.75 0.1 85)" }}
                >
                  {parent.side}
                </h3>
                {parent.names.map((name) => (
                  <p
                    key={name}
                    className="ornamental-name font-display text-xl md:text-2xl font-light"
                    style={{ color: "oklch(0.35 0.04 40)" }}
                  >
                    {name}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Maid of Honor & Best Man */}
        <div
          ref={partyRef}
          className={`transition-all duration-1000 delay-300 ${
            partyVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0 mb-12">
            {/* Decorative vertical divider */}
            <div className="hidden md:block absolute left-1/2 top-2 bottom-2 -translate-x-1/2 gold-thread" />

            <div
              className="text-center md:pr-12"
              style={{
                opacity: partyVisible ? 1 : 0,
                transform: partyVisible ? "translateY(0)" : "translateY(10px)",
                transition: "all 0.8s ease 400ms",
              }}
            >
              <h3
                className="font-display text-[11px] tracking-[0.25em] uppercase mb-5"
                style={{ color: "oklch(0.75 0.1 85)" }}
              >
                Maid Of Honor
              </h3>
              <p
                className="font-display text-lg md:text-xl font-light italic"
                style={{ color: "oklch(0.50 0.03 40)", fontSize: '27px' }}
              >
                {entourage.maidOfHonor}
              </p>
            </div>

            <div
              className="text-center md:pl-12"
              style={{
                opacity: partyVisible ? 1 : 0,
                transform: partyVisible ? "translateY(0)" : "translateY(10px)",
                transition: "all 0.8s ease 600ms",
              }}
            >
              <h3
                className="font-display text-[11px] tracking-[0.25em] uppercase mb-5"
                style={{ color: "oklch(0.75 0.1 85)" }}
              >
                Best Man
              </h3>
              <p
                className="font-display text-lg md:text-xl font-light italic"
                style={{ color: "oklch(0.50 0.03 40)", fontSize: '27px' }}
              >
                {entourage.bestMan}
              </p>
            </div>
          </div>

          {/* Note */}
          <div className="text-center mt-8">
            <p
              className="font-body text-xs italic tracking-wide"
              style={{ color: "oklch(0.60 0.02 40)" }}
            >
              Full entourage details will be announced soon
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
