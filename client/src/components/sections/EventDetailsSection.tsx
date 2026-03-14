/*
 * Design: Botanical Letterpress — Editorial Romanticism
 * Event Details: Horizontal timeline with custom SVG icons.
 * Venue section with stacked photos on left + info card on right.
 * Google Maps embed for Azienda Verde Alfonso below venue info.
 * Tighter spacing — functional section, doesn't need drama.
 */

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useRef } from "react";
import { MapPin, Navigation } from "lucide-react";
import { MapView } from "@/components/Map";

const TIMELINE_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663343684150/SEVRLfZ4zNKQdRddhVWKwh/timeline-bg-JM6k7LgqNytd4HLWHCrXFL.webp";
const VENUE_GARDEN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663343684150/SEVRLfZ4zNKQdRddhVWKwh/venue-garden_c2a683d5.jpg";
const VENUE_INTERIOR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663343684150/SEVRLfZ4zNKQdRddhVWKwh/venue-interior_c66bdb02.jpg";

/* Azienda Verde Alfonso coordinates — Del Pilar St., Poblacion 5, Alfonso, Cavite */
const VENUE_COORDS = { lat: 14.1380, lng: 120.8554 };

/* Custom SVG icons matching the reference invitation */
function RingsIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="oklch(0.62 0.1 20)" strokeWidth="1.3">
      <circle cx="14" cy="18" r="8" />
      <circle cx="22" cy="18" r="8" />
      <circle cx="14" cy="12" r="1.5" fill="oklch(0.75 0.1 85)" stroke="none" />
    </svg>
  );
}

function ChampagneIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="oklch(0.62 0.1 20)" strokeWidth="1.3">
      <path d="M12 6 L10 18 Q10 22 14 22 L14 30" />
      <path d="M24 6 L26 18 Q26 22 22 22 L22 30" />
      <line x1="10" y1="30" x2="26" y2="30" />
      <path d="M14 16 Q18 12 22 16" strokeDasharray="2 2" />
    </svg>
  );
}

function MusicNoteIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="oklch(0.62 0.1 20)" strokeWidth="1.3">
      <path d="M14 28 L14 10 L26 7 L26 25" />
      <circle cx="11" cy="28" r="3" fill="oklch(0.62 0.1 20 / 0.15)" />
      <circle cx="23" cy="25" r="3" fill="oklch(0.62 0.1 20 / 0.15)" />
    </svg>
  );
}

function DinnerIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="oklch(0.62 0.1 20)" strokeWidth="1.3">
      <path d="M8 20 Q18 6 28 20" />
      <line x1="6" y1="20" x2="30" y2="20" />
      <path d="M18 12 L18 8" />
      <circle cx="18" cy="7" r="1" fill="oklch(0.62 0.1 20)" stroke="none" />
      <path d="M10 24 Q18 28 26 24" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="oklch(0.62 0.1 20)" strokeWidth="1.3">
      <path d="M6 22 L8 16 L14 14 L24 14 L28 16 L30 22 L30 26 L6 26 Z" />
      <circle cx="11" cy="26" r="2.5" fill="oklch(0.62 0.1 20 / 0.15)" />
      <circle cx="25" cy="26" r="2.5" fill="oklch(0.62 0.1 20 / 0.15)" />
      <line x1="14" y1="14" x2="13" y2="10" />
      <line x1="22" y1="14" x2="23" y2="10" />
    </svg>
  );
}

const timelineEvents = [
  { time: "2:00 PM", title: "Ceremony", Icon: RingsIcon },
  { time: "3:00 PM", title: "Cocktails", Icon: ChampagneIcon },
  { time: "4:00 PM", title: "Program", Icon: MusicNoteIcon },
  { time: "5:30 PM", title: "Dinner", Icon: DinnerIcon },
  { time: "8:00 PM", title: "Send Off", Icon: CarIcon },
];

export default function EventDetailsSection() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation(0.2);
  const { ref: venueRef, isVisible: venueVisible } = useScrollAnimation(0.1);
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation(0.1);
  const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation(0.05);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  const handleMapReady = (map: google.maps.Map) => {
    mapInstanceRef.current = map;

    // Add a marker for Azienda Verde Alfonso
    new google.maps.marker.AdvancedMarkerElement({
      map,
      position: VENUE_COORDS,
      title: "Azienda Verde Alfonso",
    });
  };

  return (
    <section
      id="details"
      className="relative py-16 md:py-24 overflow-hidden"
    >
      {/* Subtle background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${TIMELINE_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0" style={{ background: "oklch(0.97 0.015 60 / 0.90)" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        {/* Section title */}
        <div
          ref={titleRef}
          className={`mb-14 md:mb-18 transition-all duration-1000 ${
            titleVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-center md:text-left">
            <p
              className="font-script text-3xl md:text-4xl mb-2"
              style={{ color: "oklch(0.62 0.1 20)" }}
            >
              The Celebration
            </p>
            <h2
              className="font-display text-3xl md:text-5xl font-light tracking-wide"
              style={{ color: "oklch(0.35 0.04 40)" }}
            >
              Wedding Day Timeline
            </h2>
          </div>
        </div>

        {/* Horizontal Timeline */}
        <div
          ref={timelineRef}
          className={`mb-16 md:mb-20 transition-all duration-1000 delay-200 ${
            timelineVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Desktop: Horizontal layout */}
          <div className="hidden md:block">
            {/* Icons row */}
            <div className="flex justify-between items-end mb-5 px-4">
              {timelineEvents.map((event, i) => (
                <div
                  key={event.title}
                  className="flex flex-col items-center w-1/5"
                  style={{
                    opacity: timelineVisible ? 1 : 0,
                    transform: timelineVisible ? "translateY(0)" : "translateY(12px)",
                    transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${300 + i * 120}ms`,
                  }}
                >
                  <event.Icon />
                  <p
                    className="font-display text-base font-medium mt-2 tracking-wide"
                    style={{ color: "oklch(0.35 0.04 40)" }}
                  >
                    {event.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Timeline bar with staggered dots */}
            <div className="relative mx-4 mb-5">
              <div
                className={`h-px w-full transition-all duration-[1.5s] delay-500 ${
                  timelineVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background: "linear-gradient(to right, oklch(0.75 0.1 85 / 0.2), oklch(0.62 0.1 20 / 0.5), oklch(0.75 0.1 85 / 0.2))",
                }}
              />
              <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full">
                {timelineEvents.map((event, i) => (
                  <div
                    key={event.title}
                    className="w-2.5 h-2.5 rounded-full transition-all duration-500"
                    style={{
                      background: "oklch(0.62 0.1 20)",
                      boxShadow: "0 0 0 3px oklch(0.97 0.015 60), 0 0 0 4px oklch(0.62 0.1 20 / 0.25)",
                      opacity: timelineVisible ? 1 : 0,
                      transform: timelineVisible ? "scale(1)" : "scale(0)",
                      transitionDelay: `${600 + i * 150}ms`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Times row */}
            <div className="flex justify-between px-4">
              {timelineEvents.map((event, i) => (
                <div
                  key={event.title}
                  className="text-center w-1/5"
                  style={{
                    opacity: timelineVisible ? 1 : 0,
                    transition: `opacity 0.6s ease ${400 + i * 100}ms`,
                  }}
                >
                  <p
                    className="font-display text-sm tracking-wider font-light"
                    style={{ color: "oklch(0.55 0.03 40)" }}
                  >
                    {event.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical layout */}
          <div className="md:hidden relative max-w-xs mx-auto">
            <div
              className="absolute left-6 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, transparent, oklch(0.62 0.1 20 / 0.3), transparent)" }}
            />
            {timelineEvents.map((event, index) => (
              <div
                key={event.title}
                className="relative flex items-start mb-8 pl-14"
                style={{
                  opacity: timelineVisible ? 1 : 0,
                  transform: timelineVisible ? "translateX(0)" : "translateX(-12px)",
                  transition: `all 0.6s ease ${index * 120}ms`,
                }}
              >
                <div
                  className="absolute left-[18px] top-2 w-3.5 h-3.5 rounded-full"
                  style={{
                    background: "oklch(0.62 0.1 20)",
                    boxShadow: "0 0 0 3px oklch(0.97 0.015 60), 0 0 0 4px oklch(0.62 0.1 20 / 0.25)",
                  }}
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <event.Icon />
                    <span
                      className="font-display text-lg font-medium"
                      style={{ color: "oklch(0.35 0.04 40)" }}
                    >
                      {event.title}
                    </span>
                  </div>
                  <p
                    className="font-display text-xs tracking-wider font-light"
                    style={{ color: "oklch(0.55 0.03 40)" }}
                  >
                    {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Venue section — photos on left, info card on right */}
        <div
          ref={venueRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center transition-all duration-1000 delay-300 ${
            venueVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Left: Venue photos — stacked with offset */}
          <div className="relative h-[320px] md:h-[400px]">
            {/* Main venue photo — garden ceremony */}
            <div
              className="absolute top-0 left-0 w-[75%] h-[75%] overflow-hidden shadow-lg transition-transform duration-700 hover:scale-[1.02]"
              style={{
                border: "3px solid oklch(0.98 0.01 55)",
                boxShadow: "0 8px 30px oklch(0.35 0.04 40 / 0.12)",
              }}
            >
              <img
                src={VENUE_GARDEN}
                alt="Azienda Verde Alfonso — Garden ceremony setup"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Secondary venue photo — interior reception */}
            <div
              className="absolute bottom-0 right-0 w-[65%] h-[65%] overflow-hidden shadow-lg transition-transform duration-700 hover:scale-[1.02]"
              style={{
                border: "3px solid oklch(0.98 0.01 55)",
                boxShadow: "0 8px 30px oklch(0.35 0.04 40 / 0.12)",
              }}
            >
              <img
                src={VENUE_INTERIOR}
                alt="Azienda Verde Alfonso — Reception hall interior"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Gold decorative corner accent */}
            <div
              className="absolute top-[37%] left-[37%] w-8 h-8"
              style={{
                borderLeft: "2px solid oklch(0.75 0.1 85 / 0.5)",
                borderTop: "2px solid oklch(0.75 0.1 85 / 0.5)",
              }}
            />
          </div>

          {/* Right: Venue info card */}
          <div
            className="relative p-8 md:p-10 text-center md:text-left"
            style={{
              background: "oklch(0.98 0.01 55 / 0.7)",
              backdropFilter: "blur(8px)",
              border: "1px solid oklch(0.88 0.02 55)",
            }}
          >
            {/* Gold accent bar — left edge */}
            <div
              className="absolute left-0 top-4 bottom-4 w-[2px]"
              style={{ background: "oklch(0.75 0.1 85 / 0.6)" }}
            />

            <p
              className="font-script text-xl mb-1"
              style={{ color: "oklch(0.62 0.1 20)" }}
            >
              The Venue
            </p>

            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <MapPin size={16} style={{ color: "oklch(0.62 0.1 20)" }} />
              <span
                className="font-display text-xl md:text-2xl tracking-wide"
                style={{ color: "oklch(0.35 0.04 40)" }}
              >
                Azienda Verde Alfonso
              </span>
            </div>
            <p
              className="font-body text-sm"
              style={{ color: "oklch(0.55 0.03 40)" }}
            >
              Del Pilar St., Poblacion 5, Alfonso, Cavite
            </p>
            <p
              className="font-body text-sm mt-1 mb-3"
              style={{ color: "oklch(0.55 0.03 40)" }}
            >
              Sunday, January 24, 2027 at 2:00 PM
            </p>
            <p
              className="font-body text-xs italic mb-5"
              style={{ color: "oklch(0.55 0.03 40 / 0.8)" }}
            >
              A stunning garden venue nestled in the lush greenery of Alfonso, Cavite — the perfect backdrop for our celebration of love.
            </p>
            <a
              href="https://maps.google.com/?q=Azienda+Verde+Alfonso+Cavite"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display text-[11px] tracking-[0.18em] uppercase py-2.5 px-6 transition-all duration-300 hover:shadow-md"
              style={{
                background: "oklch(0.62 0.1 20)",
                color: "oklch(0.98 0.005 55)",
              }}
            >
              <Navigation size={13} />
              Get Directions
            </a>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div
          ref={mapRef}
          className={`mt-10 md:mt-14 transition-all duration-1000 delay-400 ${
            mapVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Map label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1" style={{ background: "oklch(0.75 0.1 85 / 0.3)" }} />
            <p
              className="font-display text-[11px] tracking-[0.2em] uppercase"
              style={{ color: "oklch(0.55 0.03 40)" }}
            >
              Find Us Here
            </p>
            <div className="h-px flex-1" style={{ background: "oklch(0.75 0.1 85 / 0.3)" }} />
          </div>

          {/* Map container with border styling */}
          <div
            className="overflow-hidden shadow-lg"
            style={{
              border: "1px solid oklch(0.88 0.02 55)",
            }}
          >
            <MapView
              className="w-full h-[300px] md:h-[400px]"
              initialCenter={VENUE_COORDS}
              initialZoom={15}
              onMapReady={handleMapReady}
            />
          </div>

          {/* Address below map */}
          <div className="mt-4 text-center">
            <p
              className="font-body text-xs"
              style={{ color: "oklch(0.55 0.03 40 / 0.7)" }}
            >
              Del Pilar St., Poblacion 5, Alfonso, Cavite, Philippines
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
