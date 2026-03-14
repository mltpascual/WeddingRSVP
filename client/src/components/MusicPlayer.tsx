/*
 * Design: Botanical Letterpress — Editorial Romanticism
 * Music Player: Fixed bottom-right button, plays background
 * music on first user interaction. Refined styling.
 */

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MUSIC_URL = "/images/BgMusic_8d65e310.mp3";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (audioRef.current) {
          audioRef.current.volume = 0.25;
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {
            // Autoplay blocked
          });
        }
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.25;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" />
      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          background: "oklch(0.62 0.1 20)",
          color: "oklch(0.98 0.005 55)",
          boxShadow: "0 2px 12px oklch(0.62 0.1 20 / 0.2)",
        }}
        aria-label={isPlaying ? "Mute Music" : "Play Music"}
      >
        {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>
    </>
  );
}
