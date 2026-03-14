/*
 * Design: Botanical Letterpress — Editorial Romanticism
 * Navigation: Minimal top bar with active section indicator dot.
 * Always has a subtle frosted backdrop for visibility.
 * Stronger backdrop on scroll.
 */

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#gallery", label: "Gallery" },
  { href: "#rsvp", label: "RSVP" },
  { href: "#our-story", label: "Our Story" },
  { href: "#entourage", label: "Entourage" },
  { href: "#details", label: "Details" },
  { href: "#dress-code", label: "Attire" },
  { href: "#gifts", label: "Gifts" },
  { href: "#faq", label: "FAQ" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          background: "oklch(0.97 0.015 60)",
          borderBottom: "1px solid oklch(0.88 0.02 55 / 0.5)",
          boxShadow: scrolled ? "0 1px 8px oklch(0.75 0.1 85 / 0.06)" : "none",
        }}
      >
        <div className="relative max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-center h-14 md:h-16">
          {/* Mobile hamburger — absolute left */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden absolute left-4 w-9 h-9 flex items-center justify-center transition-colors"
            style={{ color: "oklch(0.38 0.03 40)" }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo — centered on mobile, hidden on desktop */}
          <a
            href="#"
            className="font-script text-xl md:text-2xl transition-colors duration-300 md:hidden"
            style={{ color: "oklch(0.62 0.1 20)" }}
          >
            J & L
          </a>

          {/* Desktop links — centered */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative font-display text-[13px] tracking-[0.15em] uppercase transition-all duration-300 hover:opacity-70 ${
                  activeSection === link.href.replace("#", "") ? "nav-link-active" : ""
                }`}
                style={{
                  color: activeSection === link.href.replace("#", "")
                    ? "oklch(0.62 0.1 20)"
                    : "oklch(0.38 0.03 40)",
                  fontWeight: activeSection === link.href.replace("#", "") ? 600 : 400,
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center animate-fade-in"
          style={{
            background: "oklch(0.97 0.015 60 / 0.97)",
            backdropFilter: "blur(20px)",
          }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center"
            style={{ color: "oklch(0.45 0.03 40)" }}
          >
            <X size={22} />
          </button>

          <div className="flex flex-col items-center gap-7">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-lg tracking-[0.12em] uppercase transition-all duration-300"
                style={{
                  color: activeSection === link.href.replace("#", "")
                    ? "oklch(0.62 0.1 20)"
                    : "oklch(0.45 0.03 40)",
                  animation: `fadeInUp 0.5s ease ${i * 60}ms both`,
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div
            className="absolute bottom-8 font-script text-2xl"
            style={{ color: "oklch(0.75 0.1 85 / 0.4)" }}
          >
            J & L
          </div>
        </div>
      )}
    </>
  );
}
