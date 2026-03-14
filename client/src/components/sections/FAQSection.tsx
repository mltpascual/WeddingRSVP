/**
 * Design: Botanical Letterpress — Editorial Romanticism
 * FAQ Section: Accordion-style frequently asked questions
 * with elegant typography and smooth expand/collapse animations.
 */

import { useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string | string[];
}

const faqData: FAQItem[] = [
  {
    question: "Do we really need to RSVP? We already said \"YES\" to the couple.",
    answer: "Yes, please. We will be needing your formal RSVP to consolidate guest details and finalize the headcount for catering and seating purposes."
  },
  {
    question: "May I invite a \"PLUS ONE\" to the event?",
    answer: "We appreciate your understanding, but each invitation is strictly for one (1) person only. Due to limited seating, we are unable to accommodate plus-ones or additional guests. This event is strictly by invitation only, and guests not found on the guest list will not be allowed to enter."
  },
  {
    question: "Is there parking space available for my car?",
    answer: "Yes, there is parking available for everyone at the venue. However, please take note that it is first come, first served basis, so you might not want to be late."
  },
  {
    question: "I said \"NO\" to the RSVP but I had a change of plans — I can attend now! What should I do?",
    answer: [
      "Please check with us first. Unfortunately, we have a strict guest list.",
      "Kindly inform us if your schedule clears up, so we can try to accommodate you.",
      "If seats become available, we will let you know as soon as possible.",
      "Please do not attend unannounced, as we may not have any available seats for you."
    ]
  },
  {
    question: "What if I RSVP'd but cannot attend?",
    answer: "We would love to have you at our wedding, but we understand that there are circumstances beyond our control. However, please let us know as soon as possible so we can reallocate your seat/s."
  },
  {
    question: "Can I sit anywhere at the reception?",
    answer: "Please don't. It took us a lot of effort and discussion to finish the seating arrangement, which is planned for everyone's convenience and preference, but there is no need to worry! You'll surely be seated with your friends or people that you have the same interest with. Our coordinators will gladly assist you in finding your designated seat after registration. Feel free to ask them for assistance and they will gladly help you."
  },
  {
    question: "When is the appropriate time to leave?",
    answer: "This event took us months to plan, and we want to celebrate it with the people that are very dear to our hearts. We want you to have fun! Celebrate with us until the end of the program!"
  },
  {
    question: "Am I allowed to take pictures and/or videos during the ceremony?",
    answer: "We request everyone to keep the ceremony camera-free. While our I Do's are unplugged, our reception is not and definitely as a couple who loves pictures, you'll get tons of options to take your pictures. We prepared for this event wholeheartedly. Please use our official hashtag: #JoshKoPoElla"
  },
  {
    question: "How can I help the couple have a great time during their wedding?",
    answer: [
      "Pray with us for favorable weather and the continuous blessings of our Lord as we enter this new chapter of our lives as husband and wife.",
      "RSVP as soon as your schedule is cleared.",
      "Dress appropriately and follow our wedding motif.",
      "Be on time.",
      "Follow the seating arrangement in the reception.",
      "Stay until the end of the program.",
      "Join the activities and enjoy!"
    ]
  }
];

function FAQItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[#c9a96e]/20 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between py-5 px-1 text-left group transition-colors duration-300 hover:bg-[#c9a96e]/5"
      >
        <span
          className="font-serif text-[#5a4a3a] text-base md:text-lg pr-4 leading-relaxed group-hover:text-[#c9a96e] transition-colors duration-300"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {item.question}
        </span>
        <span className="flex-shrink-0 mt-1">
          <ChevronDown
            className={`w-5 h-5 text-[#c9a96e] transition-transform duration-400 ${isOpen ? "rotate-180" : ""}`}
          />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[600px] opacity-100 pb-5" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-1 pl-2 md:pl-4 border-l-2 border-[#c9a96e]/30 ml-1">
          {Array.isArray(item.answer) ? (
            <ul className="space-y-2">
              {item.answer.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#c9a96e] mt-1.5 text-xs flex-shrink-0">&#9830;</span>
                  <span
                    className="text-[#6b5e50] text-sm md:text-base leading-relaxed"
                    style={{ fontFamily: "'Lora', serif" }}
                  >
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p
              className="text-[#6b5e50] text-sm md:text-base leading-relaxed"
              style={{ fontFamily: "'Lora', serif" }}
            >
              {item.answer}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const { ref, isVisible } = useScrollAnimation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      ref={ref}
      className="py-20 md:py-28 bg-[#faf6f1]"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p
            className="text-[#c9a96e] text-lg md:text-xl mb-3 italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Questions?
          </p>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl text-[#5a4a3a] tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
          >
            Frequently Asked
          </h2>

          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px w-12 bg-[#c9a96e]/40" />
            <svg width="20" height="20" viewBox="0 0 20 20" className="text-[#c9a96e]/60">
              <path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z" fill="currentColor" />
            </svg>
            <div className="h-px w-12 bg-[#c9a96e]/40" />
          </div>
        </div>

        {/* RSVP Note */}
        <div
          className={`mb-10 p-5 md:p-6 bg-white/60 border border-[#c9a96e]/20 rounded-sm transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p
            className="text-[#5a4a3a] text-sm md:text-base leading-relaxed text-center"
            style={{ fontFamily: "'Lora', serif" }}
          >
            We are so excited to celebrate our wedding day with you! To ensure an intimate and enjoyable experience for everyone, each invitation is strictly for{" "}
            <strong className="text-[#c9a96e]">ONE (1) PERSON ONLY</strong>. No plus-ones or additional guests will be accommodated.
          </p>
          <p
            className="text-[#5a4a3a] text-sm md:text-base leading-relaxed text-center mt-3"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Please RSVP to confirm your attendance.
          </p>
          <p
            className="text-[#c9a96e] text-sm md:text-base text-center mt-3 italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            We can't wait to share this unforgettable day with you!
          </p>
        </div>

        {/* FAQ Accordion */}
        <div
          className={`bg-white/50 border border-[#c9a96e]/15 rounded-sm overflow-hidden transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="px-4 md:px-8">
            {faqData.map((item, index) => (
              <FAQItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
