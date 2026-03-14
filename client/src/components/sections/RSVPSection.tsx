/*
 * Design: Botanical Letterpress — Editorial Romanticism
 * RSVP: Envelope-inspired form container with wax seal accent.
 * Generous spacing — important CTA. Scale-in entrance animation.
 * Parchment background for warmth.
 * Policy: Strictly 1-to-1 invitation — no plus-ones allowed.
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { toast } from "sonner";
import { Heart, Loader2 } from "lucide-react";
import { submitRsvp } from "@/lib/rsvpService";

const RSVP_BG = "/images/rsvp-bg-KgZZFYAFweYtDdNF2iyNyo.webp";

export default function RSVPSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation(0.1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.attending) {
      toast.error("Please fill in your name and attendance.");
      return;
    }
    setIsPending(true);
    try {
      await submitRsvp({
        name: formData.name,
        email: formData.email || "",
        attending: formData.attending as "yes" | "no",
        message: formData.message || "",
      });
      setSubmitted(true);
      toast.success("Thank you for your RSVP! We look forward to celebrating with you.");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  const inputStyle = {
    background: "oklch(0.97 0.015 60 / 0.5)",
    border: "1px solid oklch(0.85 0.02 55)",
    color: "oklch(0.30 0.03 40)",
    fontFamily: "'Lora', serif",
  };

  return (
    <section id="rsvp" className="relative py-28 md:py-40 overflow-hidden">
      {/* Subtle background image */}
      <div
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage: `url(${RSVP_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "oklch(0.95 0.025 65 / 0.92)" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 md:px-8">
        {/* Title */}
        <div
          ref={titleRef}
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            titleVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p
            className="font-script text-4xl md:text-5xl mb-3"
            style={{ color: "oklch(0.62 0.1 20)" }}
          >
            RSVP
          </p>
          <h2
            className="font-display text-2xl md:text-3xl font-light tracking-wide"
            style={{ color: "oklch(0.35 0.04 40)" }}
          >
            Kindly Respond
          </h2>
          <p
            className="font-body text-sm md:text-base mt-4 leading-relaxed max-w-md mx-auto"
            style={{ color: "oklch(0.50 0.03 40)" }}
          >
            This invitation is for{" "}
            <strong className="font-semibold" style={{ color: "oklch(0.62 0.1 20)" }}>
              one (1) person only
            </strong>
            . Kindly confirm your attendance on or before{" "}
            <strong className="font-medium" style={{ color: "oklch(0.62 0.1 20)" }}>
              November 4, 2026
            </strong>
            .
          </p>
        </div>

        {/* Envelope-style form container */}
        <div
          ref={formRef}
          className={`transition-all duration-1000 delay-200 ${
            formVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.96]"
          }`}
        >
          {submitted ? (
            <div className="envelope-container p-10 md:p-16 text-center">
              <Heart
                size={32}
                className="mx-auto mb-6"
                style={{ color: "oklch(0.62 0.1 20)" }}
                fill="oklch(0.62 0.1 20)"
              />
              <p
                className="font-script text-4xl md:text-5xl mb-4"
                style={{ color: "oklch(0.62 0.1 20)" }}
              >
                Thank You!
              </p>
              <p
                className="font-body text-base md:text-lg"
                style={{ color: "oklch(0.45 0.03 40)" }}
              >
                {formData.attending === "yes"
                  ? "We are so excited to celebrate with you!"
                  : "We will miss you, but thank you for letting us know."}
              </p>
            </div>
          ) : (
            <div className="envelope-container p-8 md:p-12">
              {/* Monogram accent */}
              <div className="flex justify-center mb-8">
                <p
                  className="font-script text-3xl"
                  style={{ color: "oklch(0.62 0.1 20 / 0.4)" }}
                >
                  J&amp;L
                </p>
              </div>

              {/* 1-to-1 Notice */}
              <div
                className="text-center mb-6 py-3 px-4 rounded-sm"
                style={{
                  background: "oklch(0.62 0.1 20 / 0.06)",
                  border: "1px solid oklch(0.62 0.1 20 / 0.15)",
                }}
              >
                <p
                  className="font-display text-[11px] tracking-[0.18em] uppercase"
                  style={{ color: "oklch(0.50 0.05 30)", fontSize: '16px' }}
                >
                  This invitation is non-transferable &amp; admits{" "}
                  <span style={{ color: "oklch(0.62 0.1 20)", fontWeight: 600 }}>one (1) guest only</span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    className="block font-display text-[11px] tracking-[0.2em] uppercase mb-2.5"
                    style={{ color: "oklch(0.50 0.03 40)" }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Full Name"
                    className="w-full px-4 py-3 text-sm focus:outline-none transition-all duration-300"
                    style={inputStyle}
                    required
                    disabled={isPending}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    className="block font-display text-[11px] tracking-[0.2em] uppercase mb-2.5"
                    style={{ color: "oklch(0.50 0.03 40)" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 text-sm focus:outline-none transition-all duration-300"
                    style={inputStyle}
                    disabled={isPending}
                  />
                </div>

                {/* Attendance */}
                <div>
                  <label
                    className="block font-display text-[11px] tracking-[0.2em] uppercase mb-3"
                    style={{ color: "oklch(0.50 0.03 40)" }}
                  >
                    Will You Be Attending? *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "yes", label: "Joyfully Accept" },
                      { value: "no", label: "Respectfully Decline" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, attending: option.value })}
                        className="py-3 px-2 md:px-4 font-display text-[10px] md:text-xs tracking-[0.08em] md:tracking-[0.12em] uppercase transition-all duration-300"
                        style={{
                          background: formData.attending === option.value
                            ? "oklch(0.62 0.1 20)"
                            : "oklch(0.97 0.015 60 / 0.5)",
                          color: formData.attending === option.value
                            ? "oklch(0.98 0.005 55)"
                            : "oklch(0.45 0.03 40)",
                          border: `1px solid ${
                            formData.attending === option.value
                              ? "oklch(0.62 0.1 20)"
                              : "oklch(0.85 0.02 55)"
                          }`,
                        }}
                        disabled={isPending}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    className="block font-display text-[11px] tracking-[0.2em] uppercase mb-2.5"
                    style={{ color: "oklch(0.50 0.03 40)" }}
                  >
                    Message For The Couple (Optional)
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your warm wishes for the couple..."
                    rows={3}
                    className="w-full px-4 py-3 text-sm focus:outline-none transition-all duration-300 resize-none"
                    style={inputStyle}
                    disabled={isPending}
                  />
                </div>

                {/* Submit */}
                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-3.5 font-display text-[12px] tracking-[0.25em] uppercase transition-all duration-300 hover:shadow-lg disabled:opacity-60"
                    style={{
                      background: "oklch(0.62 0.1 20)",
                      color: "oklch(0.98 0.005 55)",
                    }}
                  >
                    {isPending ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 size={14} className="animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      "Send RSVP"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
