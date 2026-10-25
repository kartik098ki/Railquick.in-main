"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const STANDARD_CARDS = [
  {
    number: "01",
    title: "Right to Your Berth",
    subtitle: "Direct Coach Delivery",
    artWebp: "/images/rq-std-art-1.webp",
    artPng: "/images/rq-std-art-1.png",
    cardBorder:
      "border-[#3b82f6]/80 shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:shadow-[0_12px_32px_rgba(37,99,235,0.14)] hover:shadow-[0_18px_40px_rgba(37,99,235,0.22)]",
    footerBg: "bg-gradient-to-b from-[#2b4778] via-[#243d69] to-[#1d3258]",
    titleColor: "text-white",
    subtitleColor: "text-slate-200/95",
    dividerColor: "bg-white/15",
    badgeType: "dot" as const,
  },
  {
    number: "02",
    title: "100% Genuine MRP",
    subtitle: "Standard Retail Price",
    artWebp: "/images/rq-std-art-2.webp",
    artPng: "/images/rq-std-art-2.png",
    cardBorder:
      "border-[#34d399]/80 shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:shadow-[0_12px_32px_rgba(16,185,129,0.13)] hover:shadow-[0_18px_40px_rgba(16,185,129,0.20)]",
    footerBg: "bg-gradient-to-b from-[#8da89e] via-[#829e93] to-[#749186]",
    titleColor: "text-white",
    subtitleColor: "text-white/95",
    dividerColor: "bg-white/20",
    badgeType: "green-arrow" as const,
  },
  {
    number: "03",
    title: "Halt-Timed Handoff",
    subtitle: "2-Minute Station Halts",
    artWebp: "/images/rq-std-art-3.webp",
    artPng: "/images/rq-std-art-3.png",
    cardBorder:
      "border-[#f59e0b]/80 shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:shadow-[0_12px_32px_rgba(245,158,11,0.13)] hover:shadow-[0_18px_40px_rgba(245,158,11,0.20)]",
    footerBg: "bg-gradient-to-b from-[#555e6f] via-[#4c5464] to-[#414856]",
    titleColor: "text-white",
    subtitleColor: "text-slate-100/95",
    dividerColor: "bg-white/15",
    badgeType: "amber-arrow" as const,
    imagePosition: "object-bottom",
  },
  {
    number: "04",
    title: "Stress-Free Journey",
    subtitle: "Zero Platform Rush",
    artWebp: "/images/rq-std-art-4.webp",
    artPng: "/images/rq-std-art-4.png",
    cardBorder:
      "border-[#a855f7]/80 shadow-[0_8px_24px_rgba(15,23,42,0.08)] sm:shadow-[0_12px_32px_rgba(168,85,247,0.13)] hover:shadow-[0_18px_40px_rgba(168,85,247,0.20)]",
    footerBg: "bg-gradient-to-b from-[#d5dbe7] via-[#dfe4ee] to-[#eceff6]",
    titleColor: "text-[#111827]",
    subtitleColor: "text-slate-700",
    dividerColor: "bg-slate-900/10",
    badgeType: "light-green-arrow" as const,
  },
];

export default function RailQuickGuarantees() {
  return (
    <section className="py-10 sm:py-20 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header — Compact on mobile, balanced & authoritative on desktop */}
        <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#182238] border border-slate-700/80 shadow-xs mb-3 sm:mb-4">
            <svg
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#f5c469]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L14.6 9.4L22 12L14.6 14.6L12 22L9.4 14.6L2 12L9.4 9.4L12 2Z" />
            </svg>
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.14em] text-[#f6d58e]">
              THE RAILQUICK STANDARD
            </span>
          </div>

          <h2 className="text-[22px] sm:text-4xl lg:text-[46px] font-black tracking-tight text-[#111827] leading-[1.16] sm:leading-[1.12] mb-2 sm:mb-3.5">
            Built for{" "}
            <span className="bg-gradient-to-r from-[#2c3e5a] via-[#3f5375] to-[#52688f] bg-clip-text text-transparent">
              Your Journey.
            </span>
            <br />
            Delivered to Your Seat.
          </h2>

          <p className="text-slate-600 text-xs sm:text-base lg:text-lg leading-relaxed max-w-xl sm:max-w-2xl mx-auto font-medium px-2">
            Essential medicines, fresh snacks &amp; travel accessories delivered
            straight to your coach during scheduled station halts.
          </p>
        </div>

        {/* 4 Cards: Balanced 2x2 Grid with Comfortable Gap & Size on Mobile, 4-Column on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 w-full max-w-md sm:max-w-6xl mx-auto">
          {STANDARD_CARDS.map((card, index) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={`group rounded-[18px] sm:rounded-[24px] overflow-hidden border-[1.5px] sm:border-2 ${card.cardBorder} transition-all duration-300 hover:-translate-y-1 flex flex-col bg-white shadow-xs`}
            >
              {/* Top Visual Area — 1:1 square on all screens so full train & illustrations are clearly visible */}
              <div className="relative w-full aspect-square overflow-hidden bg-slate-50">
                <picture className="w-full h-full block">
                  <source srcSet={card.artWebp} type="image/webp" />
                  <img
                    src={card.artPng}
                    alt={`${card.number} ${card.title}`}
                    width={824}
                    height={824}
                    className={`w-full h-full object-cover ${(card as { imagePosition?: string }).imagePosition || "object-center"} block group-hover:scale-[1.02] transition-transform duration-500`}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>

              {/* Bottom Title, Divider & Subtitle Footer */}
              <div
                className={`${card.footerBg} px-3.5 pt-2.5 pb-3 sm:px-5 sm:pt-3.5 sm:pb-4.5 flex-1 flex flex-col justify-between text-left`}
              >
                <h3
                  className={`text-[13.5px] sm:text-lg lg:text-[20px] font-extrabold tracking-tight leading-snug mb-1.5 sm:mb-2.5 ${card.titleColor}`}
                >
                  {card.title}
                </h3>

                <div>
                  <div className={`w-full h-px ${card.dividerColor} mb-1.5 sm:mb-2.5`} />

                  <div className="flex items-center justify-between gap-1 sm:gap-2">
                    <span
                      className={`text-[10.5px] sm:text-[13px] font-medium tracking-tight leading-tight ${card.subtitleColor}`}
                    >
                      {card.subtitle}
                    </span>

                    {card.badgeType === "dot" && (
                      <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                      </span>
                    )}

                    {card.badgeType === "green-arrow" && (
                      <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-emerald-500/25 border border-emerald-300/30 flex items-center justify-center text-emerald-300 shrink-0">
                        <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                      </span>
                    )}

                    {card.badgeType === "amber-arrow" && (
                      <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-amber-500/25 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0">
                        <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                      </span>
                    )}

                    {card.badgeType === "light-green-arrow" && (
                      <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-600 shrink-0">
                        <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
