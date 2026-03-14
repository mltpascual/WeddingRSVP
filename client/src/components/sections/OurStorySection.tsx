/*
 * Design: Botanical Letterpress — Editorial Romanticism
 * Our Story: ASYMMETRIC layout. Left-aligned title, edge-bleed
 * hero photo, gold vertical thread, clip-path reveal animation.
 * Generous spacing — this is the emotional heart of the site.
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const PHOTO_COUPLE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663343684150/SEVRLfZ4zNKQdRddhVWKwh/61657264_Unknown_a519aed7.jpeg";
const PHOTO_HANDS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663343684150/SEVRLfZ4zNKQdRddhVWKwh/61646912_Unknown_e666cfcd.jpeg";
const PHOTO_BRIDE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663343684150/SEVRLfZ4zNKQdRddhVWKwh/61654224_Unknown_430750b5.jpeg";

export default function OurStorySection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { ref: photoRef, isVisible: photoVisible } = useScrollAnimation(0.08);
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation(0.15);
  const { ref: smallRef, isVisible: smallVisible } = useScrollAnimation(0.1);

  return (
    <section
      id="our-story"
      className="py-28 md:py-40"
      style={{ background: "oklch(0.97 0.015 60)" }}
    >
      {/* Left-aligned title — breaking the centered pattern */}
      <div
        ref={titleRef}
        className={`max-w-6xl mx-auto px-4 md:px-8 mb-16 md:mb-24 transition-all duration-1000 ${
          titleVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="md:max-w-md">
          <p
            className="font-script text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.62 0.1 20)" }}
          >
            Our Story
          </p>
          <h2
            className="font-display text-3xl md:text-5xl font-light tracking-wide"
            style={{ color: "oklch(0.35 0.04 40)" }}
          >
            A Love Written
            <br />
            In The Stars
          </h2>
          {/* Gold accent line — left-aligned */}
          <div
            className={`h-px mt-6 transition-all duration-1200 delay-300 ${
              titleVisible ? "w-20 opacity-100" : "w-0 opacity-0"
            }`}
            style={{ background: "oklch(0.75 0.1 85 / 0.6)" }}
          />
        </div>
      </div>

      {/* Asymmetric photo + text grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-start">
          {/* Large photo — bleeds wider, fade-in reveal */}
          <div
            ref={photoRef}
            className={`md:col-span-7 md:-ml-4 transition-all duration-[1.4s] ${
              photoVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="overflow-hidden group">
              <img
                src={PHOTO_COUPLE}
                alt="Joshua and Loela by the fountain"
                className="w-full h-[420px] md:h-[600px] object-cover object-top transition-transform duration-[1.5s] group-hover:scale-[1.02]"
                loading="eager"
              />
            </div>
          </div>

          {/* Right column — text + small photos, offset down */}
          <div className="md:col-span-5 md:pt-16">
            {/* Gold thread connector — visible on desktop */}
            <div className="hidden md:block gold-thread h-12 ml-8 mb-6" />

            {/* Text block */}
            <div
              ref={textRef}
              className={`px-1 md:px-4 mb-10 transition-all duration-1000 ${
                textVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <p
                className="font-body text-base md:text-lg leading-[1.9] italic"
                style={{ color: "oklch(0.42 0.03 40)" }}
              >
                Together with our families, we joyfully invite you to celebrate
                the beginning of our forever. What started as a beautiful
                friendship has blossomed into a love story we are thrilled to
                share with you.
              </p>
              <p
                className="font-body text-base md:text-lg leading-[1.9] mt-6"
                style={{ color: "oklch(0.42 0.03 40)" }}
              >
                Join us as we say "I do" and begin this new chapter surrounded
                by the people we love most.
              </p>
            </div>

            {/* Two smaller photos — staggered heights */}
            <div
              ref={smallRef}
              className="grid grid-cols-2 gap-3 md:gap-4"
            >
              <div
                className={`overflow-hidden group transition-all duration-1000 ${
                  smallVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <img
                  src={PHOTO_HANDS}
                  alt="Holding hands"
                  className="w-full h-44 md:h-56 object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div
                className={`overflow-hidden group md:mt-8 transition-all duration-1000 ${
                  smallVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                <img
                  src={PHOTO_BRIDE}
                  alt="Loela"
                  className="w-full h-44 md:h-56 object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
