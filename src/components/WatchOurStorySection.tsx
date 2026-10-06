"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Instagram } from "lucide-react";

interface ReelItem {
  id: number;
  shortcode: string;
}

const REELS: ReelItem[] = [
  { id: 1, shortcode: "DeHgLUGmEgr" },
  { id: 2, shortcode: "Dd_XK35iJ7p" },
  { id: 3, shortcode: "Dd4Dk1dCNk8" },
  { id: 4, shortcode: "Ddf39K9mBeU" },
  { id: 5, shortcode: "DdBSEesq5u_" },
  { id: 6, shortcode: "DbQrnvXiHwg" },
  { id: 7, shortcode: "DbCtWWozgw8" },
  { id: 8, shortcode: "Da2edDWCq3_" },
  { id: 9, shortcode: "Das6fpQT5VL" },
  { id: 10, shortcode: "DaVFShsCSK3" },
];

const REEL_DURATION_SECONDS = 15;

export default function WatchOurStorySection() {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isSectionInView, setIsSectionInView] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smooth scroll container to active reel
  const scrollToReel = (index: number) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const cards = container.children;
      if (cards[index]) {
        const card = cards[index] as HTMLElement;
        const scrollLeft =
          card.offsetLeft - container.offsetWidth / 2 + card.offsetWidth / 2;
        container.scrollTo({ left: Math.max(0, scrollLeft), behavior: "smooth" });
      }
    }
  };

  const handleNextReel = () => {
    setActiveReelIndex((prev) => {
      const next = (prev + 1) % REELS.length;
      scrollToReel(next);
      return next;
    });
  };

  const handlePrevReel = () => {
    setActiveReelIndex((prev) => {
      const next = prev === 0 ? REELS.length - 1 : prev - 1;
      scrollToReel(next);
      return next;
    });
  };

  const handleSelectReel = (index: number) => {
    setActiveReelIndex(index);
    scrollToReel(index);
  };

  // Background silent auto-advance after REEL_DURATION_SECONDS
  useEffect(() => {
    if (!isSectionInView) return;

    const timer = setInterval(() => {
      handleNextReel();
    }, REEL_DURATION_SECONDS * 1000);

    return () => clearInterval(timer);
  }, [isSectionInView, activeReelIndex]);

  return (
    <section
      ref={sectionRef}
      className="pt-14 pb-20 sm:pt-20 lg:pt-28 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 relative z-10 text-center">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 border border-emerald-200/80 rounded-full text-xs font-black text-emerald-800 uppercase tracking-widest mb-3 shadow-2xs">
          <Instagram className="w-3.5 h-3.5 text-emerald-600" /> WATCH OUR STORY
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mt-2 mb-3 leading-tight">
          Watch Our Story
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed font-medium">
          Real passenger deliveries, behind-the-scenes runner operations, and genuine customer smiles across Indian Railways.
        </p>
      </div>

      {/* Reels Carousel */}
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Left Arrow (Desktop) */}
        <button
          onClick={handlePrevReel}
          className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex w-12 h-12 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-full items-center justify-center text-slate-900 shadow-xl transition-all hover:scale-110 active:scale-95"
          aria-label="Previous reel"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow (Desktop) */}
        <button
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
                className={`flex-shrink-0 w-[260px] sm:w-[320px] aspect-[9/16] snap-center rounded-[24px] sm:rounded-[32px] overflow-hidden relative shadow-lg cursor-pointer transition-all duration-300 border-2 sm:border-3 ${
                  isActive
                    ? "border-emerald-500 ring-4 ring-emerald-500/20 z-20 shadow-2xl scale-[1.01]"
                    : "border-slate-200 opacity-90 hover:opacity-100 hover:border-slate-300"
                }`}
              >
                <iframe
                  src={`https://www.instagram.com/p/${reel.shortcode}/embed/?autoplay=${
                    isActive && isSectionInView ? "1" : "0"
                  }`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  className="absolute inset-0 w-full h-full bg-slate-950 pointer-events-auto"
                  allowTransparency={true}
                  allow="autoplay; encrypted-media"
                />
              </div>
            );
          })}
        </div>

        {/* Carousel Dot Indicators */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {REELS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectReel(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === activeReelIndex
                  ? "bg-emerald-600 shadow-md shadow-emerald-500/30 w-7"
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
