/*
 * Design: Botanical Letterpress — Editorial Romanticism
 * Snap & Share: Hashtag styled as a rubber stamp/wax seal
 * impression with subtle rotation. Compact spacing.
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Camera } from "lucide-react";
import { toast } from "sonner";

export default function SnapShareSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { ref: stampRef, isVisible: stampVisible } = useScrollAnimation(0.3);

  const copyHashtag = () => {
    navigator.clipboard.writeText("#JoshKoPoElla").then(() => {
      toast.success("Hashtag copied to clipboard!");
    }).catch(() => {
      toast.info("#JoshKoPoElla");
    });
  };

  return (
    <section
      className="py-14 md:py-20"
      style={{ background: "oklch(0.97 0.015 60)" }}
    >
      <div className="max-w-2xl mx-auto px-4 md:px-8 text-center">
        <div
          ref={titleRef}
          className={`mb-8 transition-all duration-1000 ${
            titleVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Camera
            size={24}
            className="mx-auto mb-4"
            style={{ color: "oklch(0.75 0.1 85)" }}
          />
          <p
            className="font-script text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.62 0.1 20)" }}
          >
            Snap And Share!
          </p>
          <p
            className="font-body text-sm md:text-base leading-[1.85]"
            style={{ color: "oklch(0.42 0.03 40)" }}
          >
            We'd love to see your amazing photos from our wedding.
            Share them with us by using our hashtag!
          </p>
        </div>

        {/* Stamp-style hashtag */}
        <div
          ref={stampRef}
          className={`inline-block ${stampVisible ? "animate-stamp" : "opacity-0"}`}
        >
          <button
            onClick={copyHashtag}
            className="relative inline-block px-6 md:px-10 py-5 md:py-6 transition-all duration-300 hover:shadow-md group"
            style={{
              border: "2px solid oklch(0.62 0.1 20 / 0.35)",
              borderRadius: "4px",
              transform: "rotate(-2deg)",
            }}
          >
            {/* Double border for stamp effect */}
            <div
              className="absolute inset-1.5"
              style={{
                border: "1px solid oklch(0.62 0.1 20 / 0.2)",
                borderRadius: "2px",
              }}
            />
            <span
              className="relative font-script text-3xl md:text-4xl"
              style={{ color: "oklch(0.62 0.1 20)" }}
            >
              #JoshKoPoElla
            </span>
          </button>
        </div>
        <p
          className={`font-body text-[9px] mt-4 tracking-[0.25em] uppercase transition-all duration-700 delay-500 ${
            stampVisible ? "opacity-60" : "opacity-0"
          }`}
          style={{ color: "oklch(0.55 0.03 40)" }}
        >
          Tap To Copy
        </p>
      </div>
    </section>
  );
}
