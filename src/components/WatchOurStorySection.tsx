"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Instagram,
  Volume2,
  VolumeX,
  ExternalLink,
  Play,
} from "lucide-react";

interface ReelItem {
  id: number;
  shortcode: string;
  videoSrc: string;
  caption: string;
}

const REELS: ReelItem[] = [
  {
    id: 1,
    shortcode: "De6qIuOiW2O",
    videoSrc: "/reels/De6qIuOiW2O.mp4",
    caption: "1 Year of Building RailQuick • Making Train Journeys Better",
  },
  {
    id: 2,
    shortcode: "Dd_XK35iJ7p",
    videoSrc: "/reels/Dd_XK35iJ7p.mp4",
    caption: "On-Seat Train Delivery Experience",
  },
  {
    id: 3,
    shortcode: "Dd4Dk1dCNk8",
    videoSrc: "/reels/Dd4Dk1dCNk8.mp4",
    caption: "Live Station Halt Delivery in 2 Minutes",
  },
  {
    id: 4,
    shortcode: "Ddf39K9mBeU",
    videoSrc: "/reels/Ddf39K9mBeU.mp4",
    caption: "100% Printed MRP Essentials at Your Berth",
  },
  {
    id: 5,
    shortcode: "DdBSEesq5u_",
    videoSrc: "/reels/DdBSEesq5u_.mp4",
    caption: "Real Passenger Smiles Across Indian Railways",
  },
  {
    id: 6,
    shortcode: "DbQrnvXiHwg",
    videoSrc: "/reels/DbQrnvXiHwg.mp4",
    caption: "Behind the Scenes: RailQuick Runners",
  },
  {
    id: 7,
    shortcode: "Da2edDWCq3_",
    videoSrc: "/reels/Da2edDWCq3_.mp4",
    caption: "Fast Coach Handoff During Station Halt",
  },
  {
    id: 8,
    shortcode: "DaI7oi8CGq5",
    videoSrc: "/reels/DaI7oi8CGq5.mp4",
    caption: "Verified Travel Essentials Delivered Live",
  },
  {
    id: 9,
    shortcode: "DZ-p8WzC4I3",
    videoSrc: "/reels/DZ-p8WzC4I3.mp4",
    caption: "Solving Train Travel Needs in Real Time",
  },
  {
    id: 10,
    shortcode: "DZ2DnOsiAAQ",
    videoSrc: "/reels/DZ2DnOsiAAQ.mp4",
    caption: "Direct Berth Delivery at New Delhi Station",
  },
  {
    id: 11,
    shortcode: "DZsQDrzi_Xq",
    videoSrc: "/reels/DZsQDrzi_Xq.mp4",
    caption: "Zero Platform Rush — Delivered to Seat",
  },
  {
    id: 12,
    shortcode: "DZKSVyJiORs",
    videoSrc: "/reels/DZKSVyJiORs.mp4",
    caption: "Top 60 Startups Recognition at Delhi Yuva Festival",
  },
  {
    id: 13,
    shortcode: "DZHX9mNiPjD",
    videoSrc: "/reels/DZHX9mNiPjD.mp4",
    caption: "Chargers, Snacks & OTC Medicine at Your Berth",
  },
  {
    id: 14,
    shortcode: "DSdBNYVjlBc",
    videoSrc: "/reels/DSdBNYVjlBc.mp4",
    caption: "Day 2 – Test Phase 1 • Passenger Feedback on Ground",
  },
  {
    id: 15,
    shortcode: "DSaYD3yjjcP",
    videoSrc: "/reels/DSaYD3yjjcP.mp4",
    caption: "Day 1 at Hazrat Nizamuddin • Building on Platform",
  },
];

export default function WatchOurStorySection() {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isSectionInView, setIsSectionInView] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [reelProgress, setReelProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Smooth scroll carousel to active reel card
  const scrollToReel = useCallback((index: number) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const cards = container.children;
      if (cards[index]) {
        const card = cards[index] as HTMLElement;
        const scrollLeft =
          card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;
        container.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: "smooth",
        });
      }
    }
  }, []);

  const handleNextReel = useCallback(() => {
    setReelProgress(0);
    setActiveReelIndex((prev) => {
      const next = (prev + 1) % REELS.length;
      scrollToReel(next);
      return next;
    });
  }, [scrollToReel]);

  const handlePrevReel = useCallback(() => {
    setReelProgress(0);
    setActiveReelIndex((prev) => {
      const next = prev === 0 ? REELS.length - 1 : prev - 1;
      scrollToReel(next);
      return next;
    });
  }, [scrollToReel]);

  const handleSelectReel = (index: number) => {
    if (index === activeReelIndex) {
      // Toggle play/pause if clicking active reel
      const vid = videoRefs.current[index];
      if (vid) {
        if (vid.paused) {
          vid.play().catch(() => {});
          setIsPlaying(true);
        } else {
          vid.pause();
          setIsPlaying(false);
        }
      }
      return;
    }
    setReelProgress(0);
    setActiveReelIndex(index);
    scrollToReel(index);
  };

  // Detect when user scrolls into the Instagram Video section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Automatically play the active video when section is in view, pause all others
  useEffect(() => {
    videoRefs.current.forEach((vid, idx) => {
      if (!vid) return;
      if (idx === activeReelIndex && isSectionInView) {
        vid.muted = isMuted;
        vid.defaultMuted = isMuted;
        vid.volume = isMuted ? 0 : 1.0;
        vid.currentTime = 0;
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              // Browser requires muted autoplay if unmuted play was blocked on initial load
              vid.muted = true;
              vid.defaultMuted = true;
              setIsMuted(true);
              vid.play().catch(() => {});
              setIsPlaying(true);
            });
        }
      } else {
        vid.pause();
      }
    });
  }, [activeReelIndex, isSectionInView]);

  // Keep active video DOM element synchronized with mute state
  useEffect(() => {
    const activeVid = videoRefs.current[activeReelIndex];
    if (activeVid) {
      activeVid.muted = isMuted;
      activeVid.defaultMuted = isMuted;
      activeVid.volume = isMuted ? 0 : 1.0;
    }
  }, [isMuted, activeReelIndex]);

  // Immediately toggle real audio/voice when user clicks Mute/Unmute button
  const handleToggleMute = (e?: React.SyntheticEvent) => {
    if (e && typeof e.stopPropagation === "function") {
      e.stopPropagation();
    }
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    const activeVid = videoRefs.current[activeReelIndex];
    if (activeVid) {
      activeVid.muted = nextMuted;
      activeVid.defaultMuted = nextMuted;
      activeVid.volume = nextMuted ? 0 : 1.0;
      if (activeVid.paused) {
        activeVid.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="pt-16 pb-20 sm:pt-24 lg:pt-28 bg-gradient-to-b from-white via-slate-50/60 to-white relative overflow-hidden border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 relative z-10 text-center">
        <a
          href="https://www.instagram.com/railquick/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-pink-50 via-rose-50 to-amber-50 border border-pink-200/80 rounded-full text-xs font-black text-rose-700 uppercase tracking-widest mb-3.5 shadow-2xs hover:scale-105 transition-transform"
        >
          <Instagram className="w-3.5 h-3.5 text-rose-600" /> @RAILQUICK ON
          INSTAGRAM
        </a>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mt-1 mb-3 leading-tight">
          Watch Our Story
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed font-medium">
          Real passenger deliveries, behind-the-scenes runner operations, and
          genuine customer smiles across Indian Railways.
        </p>
      </div>

      {/* Reels Carousel */}
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Left Arrow (Desktop) */}
        <button
          type="button"
          onClick={handlePrevReel}
          className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex w-12 h-12 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-full items-center justify-center text-slate-900 shadow-xl transition-all hover:scale-110 active:scale-95"
          aria-label="Previous reel"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow (Desktop) */}
        <button
          type="button"
          onClick={handleNextReel}
          className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex w-12 h-12 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-full items-center justify-center text-slate-900 shadow-xl transition-all hover:scale-110 active:scale-95"
          aria-label="Next reel"
        >
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Scrolling Track */}
        <div
          ref={containerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory py-4 sm:py-6 px-4 no-scrollbar scroll-smooth"
          style={{ touchAction: "pan-x pan-y" }}
        >
          {REELS.map((reel, index) => {
            const isActive = index === activeReelIndex;
            return (
              <div
                key={reel.id}
                onClick={() => handleSelectReel(index)}
                className={`flex-shrink-0 w-[265px] sm:w-[315px] aspect-[9/16] snap-center rounded-[26px] sm:rounded-[32px] overflow-hidden relative cursor-pointer transition-all duration-300 bg-slate-950 ${
                  isActive
                    ? "border-[3px] border-slate-900 ring-4 ring-slate-900/15 z-20 shadow-[0_20px_50px_rgba(15,23,42,0.28)] scale-[1.02]"
                    : "border-2 border-slate-200/80 opacity-80 hover:opacity-95 hover:border-slate-300 shadow-lg"
                }`}
              >
                {/* Native HTML5 HD Video Player */}
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={`${reel.videoSrc}#t=0.05`}
                  playsInline
                  muted={isActive ? isMuted : true}
                  preload="metadata"
                  onTimeUpdate={(e) => {
                    if (isActive) {
                      const vid = e.currentTarget;
                      if (vid.duration > 0) {
                        setReelProgress(
                          Math.min(100, (vid.currentTime / vid.duration) * 100)
                        );
                      }
                    }
                  }}
                  onEnded={() => {
                    if (isActive) {
                      handleNextReel();
                    }
                  }}
                  className="absolute inset-0 w-full h-full object-cover bg-slate-950"
                />

                {/* Subtle top & bottom gradient overlays for UI legibility */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/65 via-black/25 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none z-10" />

                {/* Top Bar: Clean @railquick profile badge + Attached Circular Mute Toggle */}
                <div className="absolute top-3.5 inset-x-3.5 z-30 flex items-center justify-between gap-2">
                  <a
                    href="https://www.instagram.com/railquick/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 hover:bg-black/75 backdrop-blur-md border border-white/15 text-white text-[11px] font-bold transition-all"
                  >
                    <span className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 flex items-center justify-center">
                      <Instagram className="w-2.5 h-2.5 text-white" />
                    </span>
                    <span>@railquick</span>
                  </a>

                  {/* Circular Floating Mute / Unmute Button: ONLY visible on the active video */}
                  {isActive && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleMute(e);
                      }}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center backdrop-blur-md border shadow-xl transition-all cursor-pointer active:scale-90 ${
                        !isMuted
                          ? "bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.45)]"
                          : "bg-black/60 hover:bg-black/80 text-white border-white/25"
                      }`}
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                      title={isMuted ? "Unmute Audio" : "Mute Audio"}
                    >
                      {!isMuted ? (
                        <Volume2 className="w-4 h-4 text-white animate-pulse" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-rose-400" />
                      )}
                    </button>
                  )}
                </div>

                {/* Play overlay icon on inactive cards or when paused */}
                {(!isActive || !isPlaying) && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-black/55 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-2xl">
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Bottom Caption & Controls on Active Reel */}
                <div className="absolute bottom-3.5 inset-x-3.5 z-30 flex flex-col gap-2">
                  <p className="text-white text-xs sm:text-[13px] font-bold leading-snug line-clamp-2 drop-shadow-xs text-left">
                    {reel.caption}
                  </p>

                  {isActive && (
                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
                      <span className="text-[10px] font-mono text-white/70">
                        {index + 1} / {REELS.length}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <a
                          href={`https://www.instagram.com/reel/${reel.shortcode}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/25 text-white flex items-center justify-center shadow-md transition-all active:scale-90 shrink-0"
                          title="View Reel on Instagram"
                        >
                          <Instagram className="w-3.5 h-3.5 text-pink-300" />
                        </a>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextReel();
                          }}
                          className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-950 flex items-center justify-center shadow-lg transition-all active:scale-90 cursor-pointer shrink-0"
                          aria-label="Next reel"
                          title="Next Video"
                        >
                          <ArrowRight className="w-4 h-4 text-slate-900" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Dot Indicators */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {REELS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectReel(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === activeReelIndex
                  ? "bg-slate-900 shadow-md w-7"
                  : "bg-slate-300 hover:bg-slate-400 w-2.5"
              }`}
              aria-label={`Go to reel ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
