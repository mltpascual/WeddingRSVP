/*
 * Design: Botanical Letterpress — Editorial Romanticism
 * Home page: Varied section transitions, intentional spacing rhythm.
 * Section order per user specification:
 * Hero → Gallery → RSVP → Our Story → Entourage → Timeline → Dress Code → Hashtags → Gifts → FAQ
 */

import Navigation from "@/components/Navigation";
import MusicPlayer from "@/components/MusicPlayer";
import SectionDivider from "@/components/SectionDivider";
import HeroSection from "@/components/sections/HeroSection";
import OurStorySection from "@/components/sections/OurStorySection";
import EventDetailsSection from "@/components/sections/EventDetailsSection";
import EntourageSection from "@/components/sections/EntourageSection";
import DressCodeSection from "@/components/sections/DressCodeSection";
import GallerySection from "@/components/sections/GallerySection";
import RSVPSection from "@/components/sections/RSVPSection";
import GiftGuideSection from "@/components/sections/GiftGuideSection";
import SnapShareSection from "@/components/sections/SnapShareSection";
import FAQSection from "@/components/sections/FAQSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      <MusicPlayer />

      <HeroSection />
      <SectionDivider variant="botanical" />
      <GallerySection />
      <SectionDivider variant="ornament" />
      <RSVPSection />
      <SectionDivider variant="gold-hairline" />
      <OurStorySection />
      <SectionDivider variant="dot" />
      <EntourageSection />
      <SectionDivider variant="ornament" />
      <EventDetailsSection />
      <SectionDivider variant="gold-hairline" />
      <DressCodeSection />
      <SectionDivider variant="dot" />
      <SnapShareSection />
      <SectionDivider variant="space" />
      <GiftGuideSection />
      <SectionDivider variant="ornament" />
      <FAQSection />
      <FooterSection />
    </div>
  );
}
