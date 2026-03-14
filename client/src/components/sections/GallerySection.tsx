/*
 * Design: Botanical Letterpress — Editorial Romanticism
 * Gallery: Masonry layout with golden hover glow, staggered
 * clip-path reveal animations, film-grain overlay on lightbox.
 * Tight spacing — let images breathe without excessive padding.
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343684150/SEVRLfZ4zNKQdRddhVWKwh/61657264_Unknown_a519aed7.jpeg",
    alt: "Joshua and Loela walking by the fountain",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343684150/SEVRLfZ4zNKQdRddhVWKwh/IMG_1676_bff14813.jpg",
    alt: "In the forest together",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343684150/SEVRLfZ4zNKQdRddhVWKwh/IMG_3985_c8d35cdd.jpg",
    alt: "Intimate kiss through the veil",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343684150/SEVRLfZ4zNKQdRddhVWKwh/61654224_Unknown_430750b5.jpeg",
    alt: "Loela in white dress",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343684150/SEVRLfZ4zNKQdRddhVWKwh/fqs-couple_663df430.jpg",
    alt: "Romantic kiss behind the bouquet",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343684150/SEVRLfZ4zNKQdRddhVWKwh/IMG_1809_d67479ad.jpg",
    alt: "Running on the beach",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343684150/SEVRLfZ4zNKQdRddhVWKwh/61653312_Unknown_6d2ed6de.jpeg",
    alt: "Couple with bouquet of calla lilies",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343684150/SEVRLfZ4zNKQdRddhVWKwh/IMG_1811_e0f78fe2.jpg",
    alt: "Walking on the lake beach",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343684150/SEVRLfZ4zNKQdRddhVWKwh/61646912_Unknown_e666cfcd.jpeg",
    alt: "Holding hands",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343684150/SEVRLfZ4zNKQdRddhVWKwh/IMG_1828_36607621.jpg",
    alt: "Together outdoors",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663343684150/SEVRLfZ4zNKQdRddhVWKwh/IMG_1792_0c6d26ce.jpg",
    alt: "Beautiful moment",
  },
];

export default function GallerySection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(0.05);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
  }, []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <section
      id="gallery"
      className="py-12 md:py-16"
      style={{ background: "oklch(0.97 0.015 60)" }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Title */}
        <div
          ref={titleRef}
          className={`text-center mb-10 md:mb-14 transition-all duration-1000 ${
            titleVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p
            className="font-script text-3xl md:text-4xl mb-2"
            style={{ color: "oklch(0.62 0.1 20)" }}
          >
            Moments Together
          </p>
          <h2
            className="font-display text-3xl md:text-5xl font-light tracking-wide"
            style={{ color: "oklch(0.35 0.04 40)" }}
          >
            Our Gallery
          </h2>
        </div>

        {/* Masonry grid with staggered clip-path reveals */}
        <div
          ref={gridRef}
          className="columns-2 md:columns-3 gap-3 md:gap-4"
        >
          {photos.map((photo, index) => (
            <div
              key={photo.src}
              className="mb-3 md:mb-4 break-inside-avoid cursor-pointer gallery-glow overflow-hidden"
              onClick={() => setLightboxIndex(index)}
              style={{
                opacity: gridVisible ? 1 : 0,
                clipPath: gridVisible ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
                transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${index * 120}ms`,
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox with film grain overlay */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center film-grain"
          style={{ background: "oklch(0.08 0.01 40 / 0.92)" }}
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-70"
            style={{ color: "oklch(0.95 0.01 55)" }}
          >
            <X size={24} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 md:left-8 z-10 w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-70"
            style={{ color: "oklch(0.95 0.01 55)" }}
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 md:right-8 z-10 w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-70"
            style={{ color: "oklch(0.95 0.01 55)" }}
          >
            <ChevronRight size={28} />
          </button>

          <img
            src={photos[lightboxIndex].src}
            alt={photos[lightboxIndex].alt}
            className="relative z-10 max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 font-display text-xs tracking-[0.3em]"
            style={{ color: "oklch(0.75 0.1 85 / 0.6)" }}
          >
            {lightboxIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
}
